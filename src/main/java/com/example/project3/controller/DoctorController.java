package com.example.project3.controller;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Diagnostics;
import com.example.project3.entities.Followup;
import com.example.project3.entities.Patient;
import com.example.project3.services.AppointmentServices;
import com.example.project3.services.DoctorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {
    @Autowired
    private DoctorServices doctorServices;

    @GetMapping("/get-all-appointments-of-doctor/{d_id}")
    public ResponseEntity<List<Appointment>> getAllAppointmentsOfDoctorId(@PathVariable("d_id") Integer id){
        List<Appointment> appointments = this.doctorServices.getAppointmentByDoctorId(id);
        return new ResponseEntity<List<Appointment>>(appointments, HttpStatus.ACCEPTED);
    }

    @PostMapping("/write-diagnostics/{a_id}")
    public ResponseEntity<Appointment> writeDiagnostics(@RequestBody Diagnostics diagnostics, @PathVariable("a_id") Integer id){
        Appointment diagnostics1 = this.doctorServices.writeDiagnostics(diagnostics,id);
        return new ResponseEntity<Appointment>(diagnostics1, HttpStatus.ACCEPTED);
    }
    @PostMapping("/write-follow-up/{a_id}")
    public ResponseEntity<Appointment> writeFollowup(@RequestBody Followup followup, @PathVariable("a_id") Integer id){
        Appointment followup1 = this.doctorServices.writeFollowup(followup,id);
        return new ResponseEntity<Appointment>(followup1, HttpStatus.ACCEPTED);
    }

    @GetMapping("/view-patient-history/{p_id}")
    public ResponseEntity<List<Appointment>> viewPatientHistory(@PathVariable("p_id") Integer id){
        List<Appointment> appointments = this.doctorServices.viewPatientHistory(id);
        return new ResponseEntity<List<Appointment>>(appointments,HttpStatus.ACCEPTED);
    }

}
