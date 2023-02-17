package com.example.project3.services;

import com.example.project3.entities.Employee;
import com.example.project3.payloads.EmployeeDto;
import com.example.project3.payloads.HospitalDto;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;



public interface HospitalServices {

    HospitalDto createHospital(HospitalDto hospitalDto);
    HospitalDto updateHospital(HospitalDto hospitalDto,Integer id);
    HospitalDto getHospitalById(Integer id);
    List<HospitalDto> getAllHospitals();
    void deleteHospital();

}
