package com.example.project3.Services.impl;
import com.example.project3.Config.AesEncryptor;
import com.example.project3.Models.Patient;
import com.example.project3.Repo.AppointmentRepo;
import com.example.project3.Repo.PatientRepo;
import com.example.project3.Services.PatientServices;
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

    @Autowired
    private AesEncryptor aesEncryptor;

    @Override
    public Patient createPatient(Patient patient) {
        //
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
        List<Patient> l1=this.patientRepo.findAll();
        List<Patient> l2 = new ArrayList<>();
        System.out.println("l1 size "+l1.size());
        for(Patient patient : l1) {
            if (patient.getName().contains(id) || patient.getMobilenumber().contains(id)) {
                System.out.println(patient.getName());
                String s = patient.getMobilenumber();
                s = s.substring(4);
                patient.setMobilenumber(s);
                l2.add(patient);
            }
        }
        return l2;
    }
}
