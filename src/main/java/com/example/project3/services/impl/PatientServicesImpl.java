package com.example.project3.services.impl;
import com.example.project3.entities.Patient;
import com.example.project3.repo.AppointmentRepo;
import com.example.project3.repo.PatientRepo;
import com.example.project3.services.PatientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientServicesImpl implements PatientServices {

    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;

    @Override
    public Patient createPatient(Patient patient) {
        patient.setMobilenumber("+91 "+patient.getMobilenumber());
        this.patientRepo.save(patient);
        return patient;
    }

    @Override
    public Patient updatePatient(Patient patient, Integer id) {
        Patient patient1 = this.patientRepo.findById(id).orElseThrow();
        patient1.setAddress(patient.getAddress());
        patient1.setGender(patient.getGender());
        patient1.setCity(patient.getCity());
        patient1.setName(patient.getName());
        patient1.setAge(patient.getAge());
        patient1.setMobilenumber("+91 "+patient.getMobilenumber());
        patient1.setPincode(patient.getPincode());
        this.patientRepo.save(patient1);
        return patient1;
    }

    @Override
    public Patient getPatientById(Integer id) {
        Patient patient = this.patientRepo.findById(id).orElseThrow();
        return patient;
    }

    @Override
    public List<Patient> getAllPatient() {
        List<Patient> patients = this.patientRepo.findAll();
        return patients;
    }

    @Override
    public List<Patient> searchPatient(String id) {
        System.out.println(id);
        List<Patient> l1=this.patientRepo.findAllByNameContaining(id);
        List<Patient> l2=this.patientRepo.findPatientsByMobilenumberContaining(id);
        System.out.println("l1 size "+l1.size());
        System.out.println("l2 size "+l2.size());
        System.out.println("hello");
        for(Patient patient : l1){
            String s = patient.getMobilenumber();
            s = s.substring(4);
            patient.setMobilenumber(s);
        }
        for(Patient patient : l2){
            String s = patient.getMobilenumber();
            s = s.substring(4);
            patient.setMobilenumber(s);
        }
        l1.addAll(l2);
        System.out.println("hi");
        return l1;
    }
}
