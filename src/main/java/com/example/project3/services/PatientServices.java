package com.example.project3.services;

import com.example.project3.entities.Patient;
import com.example.project3.payloads.EmployeeDto;
import com.example.project3.payloads.PatientDto;

import java.util.List;

public interface PatientServices {


    PatientDto createPatient(PatientDto patientDto);
    PatientDto updatePatient(PatientDto patientDto, Integer id);
    PatientDto getPatientById(Integer id);
    List<PatientDto> getAllPatient();
}
