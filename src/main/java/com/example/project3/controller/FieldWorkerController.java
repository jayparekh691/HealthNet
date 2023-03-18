package com.example.project3.controller;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Employee;
import com.example.project3.entities.Followup;
import com.example.project3.entities.Patient;
import com.example.project3.services.FieldWorkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fieldworker")
public class FieldWorkerController {

    @Autowired
    private FieldWorkerServices fieldWorkerServices;

    @GetMapping("/get-patient-list/{f_id}")
    public ResponseEntity<List<Patient>> getPatientListForFieldWorker(@PathVariable("f_id") Integer id){
        List<Patient> patients = this.fieldWorkerServices.getPatientList(id);
        return new ResponseEntity<>(patients, HttpStatus.ACCEPTED);
    }
    @GetMapping("/get-patient-followup/{p_id}")
    public ResponseEntity<List<Appointment>> getPatientFollowup(@PathVariable("p_id") Integer id){
        List<Appointment> followupList = this.fieldWorkerServices.getPatientFollowups(id);
        return new ResponseEntity<>(followupList,HttpStatus.ACCEPTED);
    }
}
