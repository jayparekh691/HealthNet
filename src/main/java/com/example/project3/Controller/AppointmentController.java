package com.example.project3.Controller;


import com.example.project3.Models.Appointment;
import com.example.project3.Services.AppointmentServices;
import com.example.project3.Services.pdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentServices appointmentServices;

    //
    @Autowired
    private pdfService pdfservice;

    @GetMapping("/pdf/{aid}")
    public ResponseEntity<InputStreamResource> createPDF(@PathVariable("aid") Integer id){
        ByteArrayInputStream pdf=pdfservice.createPdf(id);
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.add("Content_Disposition","inline;file=prescription.pdf");
        return ResponseEntity.ok().headers(httpHeaders).contentType(MediaType.APPLICATION_PDF).body(new InputStreamResource(pdf));
    }

    @PostMapping("/add-appointment/{p_id}/{d_id}")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment, @PathVariable("p_id") Integer p_id, @PathVariable("d_id") Integer d_id) throws ParseException {
        Appointment appointment1 = this.appointmentServices.createAppointment(appointment,p_id,d_id);
        return new ResponseEntity<>(appointment1, HttpStatus.CREATED);
    }



    //this api has not yet been used...
    @PostMapping("/update-appointment/{id}")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment, @PathVariable("id") Integer id){
        Appointment appointment1 = this.appointmentServices.updateAppointment(appointment,id);
        return new ResponseEntity<>(appointment1, HttpStatus.CREATED);
    }


    @GetMapping("/search-appointment/{id}")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity<Appointment> searchAppointment(@PathVariable("id") Integer id){
        Appointment appointment = this.appointmentServices.getAppointmentById(id);
        return new ResponseEntity<>(appointment, HttpStatus.ACCEPTED);
    }

    @GetMapping("/get-all-appointments")
    @PreAuthorize("hasAuthority('Receptionist')")
    public  ResponseEntity<List<Appointment>> getAllAppointments(){
        List<Appointment> appointments = this.appointmentServices.getAllAppointments();
        return new ResponseEntity<>(appointments,HttpStatus.ACCEPTED);
    }

    @GetMapping("/delete-appointment/{a_id}")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity deleteAppointment(@PathVariable("a_id") Integer a_id){
        this.appointmentServices.deleteAppointment(a_id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
