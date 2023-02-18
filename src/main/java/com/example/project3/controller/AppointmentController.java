package com.example.project3.controller;


import com.example.project3.entities.Appointment;
import com.example.project3.entities.Patient;
import com.example.project3.repo.AppointmentRepo;
import com.example.project3.services.AppointmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentServices appointmentServices;

    @PostMapping("/add-appointment/{p_id}")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment, @PathVariable("p_id") Integer p_id){
        Appointment appointment1 = this.appointmentServices.createAppointment(appointment,p_id);
        return new ResponseEntity<>(appointment1, HttpStatus.CREATED);
    }

//    @PostMapping("/update-patient/{id}")
//    public ResponseEntity<Patient> updatePatient(@RequestBody Patient patient, @PathVariable("id") Integer id){
//        Patient patient1 = this.patientServices.updatePatient(patient,id);
//        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
//    }
//
//    @GetMapping("/search-patient/{id}")
//    public ResponseEntity<Patient> searchPatient(@PathVariable("id") Integer id){
//        Patient patient1 = this.patientServices.getPatientById(id);
//        return new ResponseEntity<>(patient1, HttpStatus.ACCEPTED);
//    }
}
