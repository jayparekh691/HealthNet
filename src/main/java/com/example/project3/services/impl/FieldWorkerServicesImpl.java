package com.example.project3.services.impl;

import com.example.project3.entities.*;
import com.example.project3.repo.*;
import com.example.project3.services.FieldWorkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FieldWorkerServicesImpl implements FieldWorkerServices {
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private FollowupRepo followupRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private VisitRepo visitRepo;
    @Autowired
    private MedicalRepo medicalRepo;
    @Override
    public List<Appointment> getPatientFollowups(Integer fid) {
        Employee employee = this.employeeRepo.findById(fid).orElseThrow();
        List<Patient> patients = this.patientRepo.findPatientByFieldworker(employee);
        List<Appointment> finalAppointments=new ArrayList<Appointment>();
        for(Patient p:patients)
        {
            List<Appointment> appointments = this.appointmentRepo.findByPatient(p);
            for (Appointment appointment : appointments) {
                appointment.setDiagnostics(null);
                appointment.setDoctor(null);
                if (appointment.getFollowupRemaining() == false) {
                    appointments.remove(appointment);
                }
            }
            for(Appointment appointment:appointments)
                finalAppointments.add(appointment);
        }
        return finalAppointments;
    }

    @Override
    public Appointment getVisitDetails(Integer id) {
        Appointment appointment=this.appointmentRepo.findById(id).orElseThrow();
        return appointment;
    }
    @Override
    public  Visit saveVisit(MedicalData medicalData,Integer id) {
        Followup followup=this.followupRepo.findById(id).orElseThrow();
        Visit visit=new Visit();
        this.medicalRepo.save(medicalData);
        visit.setMedicalData(medicalData);
        this.visitRepo.save(visit);
        List<Visit> visits=followup.getVisitList();
        visits.add(visit);
        followup.setVisitList(visits);
        int t = followup.getNumberOfFollowup();
        t--;
        if(t==0){
            Appointment appointment = this.appointmentRepo.findByFollowup(followup);
            appointment.setFollowupRemaining(false);
        }
        followup.setNumberOfFollowup(t);
        this.followupRepo.save(followup);
        return visit;
    }
}
