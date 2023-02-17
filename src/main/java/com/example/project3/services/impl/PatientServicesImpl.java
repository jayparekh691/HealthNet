package com.example.project3.services.impl;

import com.example.project3.entities.Patient;
import com.example.project3.payloads.PatientDto;
import com.example.project3.services.PatientServices;

import java.util.List;

public class PatientServicesImpl implements PatientServices {

    @Override
    public PatientDto createPatient(PatientDto patientDto) {
        return null;
    }

    @Override
    public PatientDto updatePatient(PatientDto patientDto, Integer id) {
        return null;
    }

    @Override
    public PatientDto getPatientById(Integer id) {
        return null;
    }

    @Override
    public List<PatientDto> getAllPatient() {
        return null;
    }

    private PatientDto patientToDto(Patient patient){
        PatientDto patientDto = new PatientDto();
        patientDto.setCity(patient.getCity());
        patientDto.setAge(patient.getAge());
        patientDto.setGender(patient.getGender());
        patientDto.setName(patient.getName());
        patientDto.setAddress(patient.getAddress());
        patientDto.setMobile_number(patient.getMobile_number());
        patientDto.setTown(patient.getTown());
        patientDto.setPincode(patient.getPincode());
        patientDto.setState(patient.getState());
        patientDto.setAppointmentsdto(patient.getAppointments());
    }
}
