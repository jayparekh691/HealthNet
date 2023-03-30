package com.example.project3.services.impl;

import com.example.project3.dto.FollowupOTPDto;
import com.example.project3.dto.FollowupOTPResponseDto;
import com.example.project3.dto.OtpStatus;
import com.example.project3.entities.*;
import com.example.project3.repo.*;
import com.example.project3.services.DoctorServices;
import com.example.project3.services.TwilioOTPService;
import jdk.jshell.Diag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class DoctorServicesImpl implements DoctorServices {

    @Autowired
    private TwilioOTPService twilioOTPService;
    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private FollowupRepo followupRepo;
    @Autowired
    private VisitRepo visitRepo;
    @Autowired
    private DiagnosticsRepo diagnosticsRepo;
    @Override
    public List<Appointment> getAppointmentByDoctorId(Integer id) {
        Employee employee = this.employeeRepo.findById(id).orElseThrow();
        List<Appointment> appointments = this.appointmentRepo.findByDoctor(employee);
        return appointments;
    }

    @Override
    public Appointment writeDiagnostics(Diagnostics diagnostics,Integer id) {
        Appointment appointment = this.appointmentRepo.findById(id).orElseThrow();
//        diagnostics.setAppointment(appointment);
        appointment.setDiagnostics(diagnostics);
        appointment.setTreated(true);
        this.diagnosticsRepo.save(diagnostics);
        return appointment;
    }

    @Override
    public Appointment writeFollowup(Followup followup, Integer id) {
        Appointment appointment = this.appointmentRepo.findById(id).orElseThrow();
        appointment.setFollowup(followup);
        appointment.setFollowupRemaining(true);
        int count=followup.getVisitCount();
        int gap=followup.getGap();
        Date date = new Date();
        this.followupRepo.save(followup);
        List<Visit> visits=new ArrayList<Visit>();
        int counter=1;
        while(count!=0){
            count--;
            Visit visit = new Visit();
            Calendar c = Calendar.getInstance();
            c.setTime(date);
            c.add(Calendar.DATE, gap);
            date = c.getTime();
            visit.setDate(date);
            Appointment appointment1 = this.appointmentRepo.findByFollowup(followup);
            String mobilenumber = appointment1.getPatient().getMobilenumber();
            FollowupOTPDto followupOTPDto = new FollowupOTPDto();
            followupOTPDto.setPhonenumber(mobilenumber);
            FollowupOTPResponseDto followupOTPResponseDto = this.twilioOTPService.sendOTPForPasswordReset(followupOTPDto,counter,id);
            counter++;
            if(followupOTPResponseDto.getStatus()!= OtpStatus.DELIVERED){
                System.out.println(followupOTPResponseDto.getMessage());
                return null;
            }
            visit.setOtp(followupOTPResponseDto.getOtp());
            this.visitRepo.save(visit);
            visits.add(visit);
        }
        followup.setVisitList(visits);
        this.followupRepo.save(followup);
        return appointment;
    }

    @Override
    public List<Appointment> viewPatientHistory(Integer did,Integer pid) {
        Patient patient = this.patientRepo.findById(pid).orElseThrow();
        List<Appointment> appointments = this.appointmentRepo.findByPatient(patient);
        List<Appointment> finalAppointments=new ArrayList<Appointment>();
        for(Appointment i:appointments)
        {
            Employee doctor=i.getDoctor();
            if(doctor.getE_id()==did && i.getDiagnostics()!=null)
                finalAppointments.add(i);
        }
        return finalAppointments;
    }

    @Override
    public List<Patient> searchPatientByNameORpid(Integer did,String id) {
        List<Patient> patients=new ArrayList<Patient>();
        try{
            int i=Integer.parseInt(id);
            Patient patient=this.patientRepo.findById(i).orElseThrow();
            patients.add(patient);
        }
        catch (Exception e){
            patients=this.patientRepo.findAllByNameContaining(id);
        }
        List<Patient> finalPatients=new ArrayList<Patient>();
        for(Patient p:patients)
        {
            List<Appointment> appointments=this.appointmentRepo.findByPatient(p);
            for(Appointment a:appointments)
            {
                if(a.getDoctor().getE_id()==did)
                {
                    finalPatients.add(p);
                    break;
                }
            }
        }
        return finalPatients;
    }

    @Override
    public List<Appointment> viewAppointments(Integer id) {
        Patient patient=this.patientRepo.findById(id).orElseThrow();
        List<Appointment> appointments=this.appointmentRepo.findByPatient(patient);
        return appointments;
    }
    @Override
    public Followup getFollowupByAid(Integer id) {
        Appointment appointment=this.appointmentRepo.findById(id).orElseThrow();
        Followup followup=appointment.getFollowup();
        return followup;
    }

    @Override
    public List<Appointment> getUnseenListByDoctorId(Integer did) {
        List<Appointment> appointments=getAppointmentByDoctorId(did);
        List<Appointment> finalAppointments=new ArrayList<>();
        for(Appointment a:appointments)
        {
            List<Visit> visits=a.getFollowup().getVisitList();
            for(Visit v:visits)
            {
                if(v.isVisited()==true)  //false
                    break;
                if(v.isSeenByDoctor()==true)
                    continue;
                else
                {
                    finalAppointments.add(a);
                    break;
                }
            }
        }
        return finalAppointments;
    }

    @Override
    public Visit setVisitSeen(Integer vid) {
        Visit visit=this.visitRepo.findById(vid).orElseThrow();
        visit.setSeenByDoctor(true);
        this.visitRepo.save(visit);
        return visit;
    }

    @Override
    public Appointment deactivateFollowup(Integer id) {
        Appointment appointment = this.appointmentRepo.findById(id).orElseThrow();
        appointment.setFollowupRemaining(false);
        this.appointmentRepo.save(appointment);
        return appointment;
    }
}
