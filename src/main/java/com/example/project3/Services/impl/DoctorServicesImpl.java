package com.example.project3.Services.impl;

import com.example.project3.Dto.FollowupOTPDto;
import com.example.project3.Dto.FollowupOTPResponseDto;
import com.example.project3.Dto.OtpStatus;
import com.example.project3.Models.*;
import com.example.project3.Repo.*;
import com.example.project3.Services.DoctorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class DoctorServicesImpl implements DoctorServices {

    @Autowired
    private TwilioOTPService twilioOTPService;
    @Autowired
    private FollowupInstructionsRepo followupInstructionsRepo;
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
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        List<Appointment> appointments1 = new ArrayList<>();
        String today = simpleDateFormat.format(new Date());
        for(Appointment appointment :appointments){
            System.out.println(today);
            String tdate = simpleDateFormat.format(appointment.getCurr_date());
            System.out.println(tdate);
            if(tdate.equals(today) && appointment.isTreated()==false)
                appointments1.add(appointment);
        }
        return appointments1;
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
        FollowupInstructions instructions = followup.getInstructions();
        this.followupInstructionsRepo.save(instructions);
        appointment.setFollowup(followup);
        appointment.setFollowupRemaining(true);
        int count=followup.getVisitCount();
        int gap=followup.getGap();
        Date date = new Date(123,04,28);
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
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            String strDate = formatter.format(date);
            FollowupOTPResponseDto followupOTPResponseDto = this.twilioOTPService.sendOTPForPasswordReset(followupOTPDto,counter,id,strDate);
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
        List<Patient> patients=this.patientRepo.findAll();
        List<Patient> finalPatients=new ArrayList<Patient>();
        try{
            int i=Integer.parseInt(id);
            Patient patient1=this.patientRepo.findById(i).orElseThrow();
            finalPatients.add(patient1);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        for(Patient p:patients)
        {
            if(p.getName().contains(id)) {
                List<Appointment> appointments = this.appointmentRepo.findByPatient(p);
                for (Appointment a : appointments) {
                    if (a.getDoctor().getE_id() == did) {
                        finalPatients.add(p);
                        break;
                    }
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
        Employee e = this.employeeRepo.findById(did).orElseThrow();
        List<Appointment> appointments=this.appointmentRepo.findByDoctor(e);
        List<Appointment> finalAppointments=new ArrayList<>();
        for(Appointment a:appointments)
        {
            if(a.getFollowup()==null)
                continue;
            List<Visit> visits=a.getFollowup().getVisitList();
            List<Visit> finalVisit = new ArrayList<>();
            for(Visit v:visits)
            {
                if(v.isVisited()==false || v.isSeenByDoctor()==true)
                    continue;
                else
                {
                    finalVisit.add(v);
                }
            }
            if(finalVisit.size()>0) {
                a.getFollowup().setVisitList(finalVisit);
                finalAppointments.add(a);
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
