package com.example.project3.controller;

import com.example.project3.entities.*;
import com.example.project3.services.FieldWorkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/fieldworker")
public class FieldWorkerController {

    @Autowired
    private FieldWorkerServices fieldWorkerServices;

    @GetMapping("/get-appointmentList-fieldWorker/{f_id}")
    public ResponseEntity<List<VisitModel>> getAppointmentListFW(@PathVariable("f_id") Integer fid){
        List<VisitModel> visitModelList = this.fieldWorkerServices.getAppointmentListFW(fid);
        return new ResponseEntity<>(visitModelList,HttpStatus.ACCEPTED);
    }
    @GetMapping("/get-visit-details/{p_id}")
    public ResponseEntity<Appointment> getVisitDetails(@PathVariable("p_id") Integer id) {
        Appointment appointment=this.fieldWorkerServices.getVisitDetails(id);
        return new ResponseEntity<>(appointment,HttpStatus.ACCEPTED);
    }
    @PostMapping("/save-visit")
    public ResponseEntity<Visit> saveVisit(@RequestBody ReceiveVistDataModel receiveVistDataModel) throws IOException {
        Visit visit=this.fieldWorkerServices.saveVisit(receiveVistDataModel);
        return new ResponseEntity<>(visit,HttpStatus.ACCEPTED);
    }
}
