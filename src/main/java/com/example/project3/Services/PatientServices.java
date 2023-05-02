package com.example.project3.Services;

import com.example.project3.Models.Patient;

import java.util.List;

public interface PatientServices {


    Patient createPatient(Patient patient);
    Patient updatePatient(Patient patient, Integer id);
    Patient getPatientById(Integer id);
    List<Patient> getAllPatient();

    List<Patient> searchPatient(String id);
}
