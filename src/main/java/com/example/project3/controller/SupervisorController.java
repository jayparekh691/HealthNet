package com.example.project3.controller;

import com.example.project3.entities.Patient;
import com.example.project3.services.SupervisorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/supervisor")
public class SupervisorController {

    @Autowired
    private SupervisorServices supervisorServices;
    @PostMapping("/assign-fieldworker/{p_id}/{f_id}")
    public ResponseEntity<Patient> assignFieldWorker(@PathVariable("p_id") Integer pid,@PathVariable("f_id") Integer fid){
        Patient patient1 = this.supervisorServices.assignFieldWorker(pid,fid);
        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
    }
}
