package com.example.project3.controller;


import com.example.project3.entities.Appointment;
import com.example.project3.entities.Patient;
import com.example.project3.repo.AppointmentRepo;
import com.example.project3.services.AppointmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentServices appointmentServices;


    @PostMapping("/add-appointment/{p_id}/{d_id}")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment, @PathVariable("p_id") Integer p_id, @PathVariable("d_id") Integer d_id){
        Appointment appointment1 = this.appointmentServices.createAppointment(appointment,p_id,d_id);
        return new ResponseEntity<>(appointment1, HttpStatus.CREATED);
    }

    @PostMapping("/update-appointment/{id}")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment, @PathVariable("id") Integer id){
        Appointment appointment1 = this.appointmentServices.updateAppointment(appointment,id);
        return new ResponseEntity<>(appointment1, HttpStatus.CREATED);
    }

    @GetMapping("/search-appointment/{id}")
    public ResponseEntity<Appointment> searchAppointment(@PathVariable("id") Integer id){
        Appointment appointment = this.appointmentServices.getAppointmentById(id);
        return new ResponseEntity<>(appointment, HttpStatus.ACCEPTED);
    }

    @GetMapping("/get-all-appointments")
    public  ResponseEntity<List<Appointment>> getAllAppointments(){
        List<Appointment> appointments = this.appointmentServices.getAllAppointments();
        return new ResponseEntity<>(appointments,HttpStatus.ACCEPTED);
    }

    @GetMapping("/delete-appointment/{a_id}")
    public ResponseEntity deleteAppointment(@PathVariable("a_id") Integer a_id){
        this.appointmentServices.deleteAppointment(a_id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
