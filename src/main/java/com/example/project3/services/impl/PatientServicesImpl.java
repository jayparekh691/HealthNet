package com.example.project3.services.impl;

import com.example.project3.entities.Patient;
import com.example.project3.repo.PatientRepo;
import com.example.project3.services.PatientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServicesImpl implements PatientServices {

    @Autowired
    private PatientRepo patientRepo;
    @Override
    public Patient createPatient(Patient patient) {
        this.patientRepo.save(patient);
        return null;
    }

    @Override
    public Patient updatePatient(Patient patient, Integer id) {
        Patient patient1 = this.patientRepo.findById(id).orElseThrow();
        patient1.setAddress(patient.getAddress());
        patient1.setGender(patient.getGender());
        patient1.setCity(patient.getCity());
        patient1.setName(patient.getName());
        patient1.setAge(patient.getAge());
        patient1.setMobile_number(patient.getMobile_number());
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
}
