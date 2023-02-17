package com.example.project3.controller;

import com.example.project3.payloads.HospitalDto;
import com.example.project3.services.HospitalServices;
import com.example.project3.services.impl.HospitalServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hospital")
public class HospitalController {

    @Autowired
    private HospitalServices hospitalServices;
    // POST to create Hospital
    @PostMapping("/")
    public ResponseEntity<HospitalDto> createHospital(@RequestBody HospitalDto hospitalDto){
        HospitalDto hospitalDto1 = this.hospitalServices.createHospital(hospitalDto);
        return new ResponseEntity<>(hospitalDto1, HttpStatus.CREATED);
    }
}
