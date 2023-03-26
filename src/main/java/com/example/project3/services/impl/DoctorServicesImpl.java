package com.example.project3.services.impl;

import com.example.project3.entities.*;
import com.example.project3.repo.*;
import com.example.project3.services.DoctorServices;
import jdk.jshell.Diag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorServicesImpl implements DoctorServices {

    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private FollowupRepo followupRepo;
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
//        diagnostics.setAppointment(appointment);
        appointment.setFollowup(followup);
        appointment.setFollowupRemaining(true);
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
            if(doctor.getE_id()==did)
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
            patients=this.patientRepo.findPatientByNameContaining(id);
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
}
