package com.example.project3.controller;

import com.example.project3.entities.*;
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
    @GetMapping("/get-visit-details/{p_id}")
    public ResponseEntity<Appointment> getVisitDetails(@PathVariable("p_id") Integer id) {
        Appointment appointment=this.fieldWorkerServices.getVisitDetails(id);
        return new ResponseEntity<>(appointment,HttpStatus.ACCEPTED);
    }
//    @PostMapping("/save-visit/{f_id}")
//    public ResponseEntity<Visit> saveVisit(@RequestBody MedicalData medicalData, @PathVariable("f_id") Integer id) {
//        Visit visit=this.fieldWorkerServices.saveVisit(medicalData,id);
//        return new ResponseEntity<>(visit,HttpStatus.ACCEPTED);
//    }
}
