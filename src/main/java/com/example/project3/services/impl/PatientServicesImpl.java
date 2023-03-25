package com.example.project3.services.impl;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Patient;
import com.example.project3.repo.AppointmentRepo;
import com.example.project3.repo.PatientRepo;
import com.example.project3.services.PatientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServicesImpl implements PatientServices {

    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;

    @Override
    public Patient createPatient(Patient patient) {
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
        patient1.setMobilenumber(patient.getMobilenumber());
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
        List<Patient> l1=this.patientRepo.findPatientByName(id);
        List<Patient> l2=this.patientRepo.findPatientByMobilenumber(id);
        l1.addAll(l2);
        return l1;
    }
}
