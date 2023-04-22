package com.example.project3.controller;


import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import com.example.project3.services.PatientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    @Autowired
    private PatientServices patientServices;

    @PostMapping("/add-patient")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient){
        Patient patient1 = this.patientServices.createPatient(patient);
        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
    }

    @PostMapping("/update-patient/{id}")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity<Patient> updatePatient(@RequestBody Patient patient, @PathVariable("id") Integer id){
        Patient patient1 = this.patientServices.updatePatient(patient,id);
        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
    }

    @GetMapping("/search-patient/{id}")
    public ResponseEntity<Patient> searchPatient(@PathVariable("id") Integer id){
        Patient patient1 = this.patientServices.getPatientById(id);
        return new ResponseEntity<>(patient1, HttpStatus.ACCEPTED);
    }

    @GetMapping("/get-all-patients")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity<List<Patient>> allPatient(){
        List<Patient> patients = this.patientServices.getAllPatient();
        return new ResponseEntity<>(patients,HttpStatus.ACCEPTED);
    }

    @GetMapping("/search-patient-receptionist/{nORm}")
    @PreAuthorize("hasAnyAuthority('Receptionist','Admin')")
    public ResponseEntity<List<Patient>> allPatientByNameOrMob(@PathVariable("nORm") String id){
        List<Patient> patient1 = this.patientServices.searchPatient(id);
        return new ResponseEntity<List<Patient>>(patient1,HttpStatus.ACCEPTED);
    }
}
