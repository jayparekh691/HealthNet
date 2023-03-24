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
    public List<Patient> getPatientList(Integer id) {
        Employee employee = this.employeeRepo.findById(id).orElseThrow();
        List<Patient> patients = this.patientRepo.findPatientByFieldworker(employee);
        return patients;
    }


    @Override
    public List<Appointment> getPatientFollowups(Integer id) {
        Patient patient = this.patientRepo.findById(id).orElseThrow();
        List<Appointment> appointments = this.appointmentRepo.findByPatient(patient);
//        List<Appointment> appointmentList=new ArrayList<Appointment>();
        for(Appointment appointment : appointments){
            appointment.setDiagnostics(null);
            appointment.setDoctor(null);
            if(appointment.getFollowupRemaining()==false) {
                appointments.remove(appointment);
            }
        }
        return appointments;
    }

    @Override
    public Appointment getVisitDetails(Integer id) {
        Appointment appointment=this.appointmentRepo.findById(id).orElseThrow();
        return appointment;
    }
//    @Override
//    public  Visit saveVisit(MedicalData medicalData,Integer id) {
//        Followup followup=this.followupRepo.findById(id).orElseThrow();
//        Visit visit=new Visit();
//        visit.setMedicalData(medicalData);
//        List<Visit> visits=followup.getVisitList();
//        visits.add(visit);
//        followup.setVisitList(visits);
//        this.medicalRepo.save(medicalData);
//        return visit;
//    }
}
