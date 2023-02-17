package com.example.project3.services.impl;

import com.example.project3.entities.Hospital;
import com.example.project3.exceptions.ResourceNotFoundException;
import com.example.project3.payloads.HospitalDto;
import com.example.project3.repo.HospitalRepo;
import com.example.project3.services.HospitalServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalServicesImpl implements HospitalServices {

    @Autowired
    private HospitalRepo hospitalRepo;

    @Override
    public HospitalDto createHospital(HospitalDto hospitalDto) {
        Hospital hospital = this.dtoToHospital(hospitalDto);
        Hospital hospital1 = this.hospitalRepo.save(hospital);
        return this.HospitalTodto(hospital1);
    }

    @Override
    public HospitalDto updateHospital(HospitalDto hospitalDto, Integer id) {
//        Hospital hospital = this.hospitalRepo.findBy(id).orElseThrow((e-> new ResourceNotFoundException("Hospital","id",id)));
        return null;
    }

    @Override
    public HospitalDto getHospitalById(Integer id) {

        return null;
    }

    @Override
    public List<HospitalDto> getAllHospitals() {
        return null;
    }

    @Override
    public void deleteHospital() {

    }

    private Hospital dtoToHospital(HospitalDto hospitalDto){
        Hospital hospital = new Hospital();
        hospital.setH_id(hospitalDto.getH_id());
        hospital.setAdmin_name(hospitalDto.getAdmin_name());
        hospital.setAdmin_address(hospitalDto.getAdmin_address());
        hospital.setEmail(hospitalDto.getEmail());
        hospital.setH_name(hospitalDto.getH_name());
        hospital.setPassword(hospitalDto.getPassword());
        hospital.setMobile_number(hospitalDto.getMobile_number());
        hospital.setH_address(hospitalDto.getH_address());
        return hospital;
    }

    private HospitalDto HospitalTodto(Hospital hospital){
        HospitalDto hospitalDto = new HospitalDto();
        hospitalDto.setH_id(hospital.getH_id());
        hospitalDto.setAdmin_name(hospital.getAdmin_name());
        hospitalDto.setAdmin_address(hospital.getAdmin_address());
        hospitalDto.setEmail(hospital.getEmail());
        hospitalDto.setH_name(hospital.getH_name());
        hospitalDto.setPassword(hospital.getPassword());
        hospitalDto.setMobile_number(hospital.getMobile_number());
        hospitalDto.setH_address(hospital.getH_address());
        return hospitalDto;
    }
}
