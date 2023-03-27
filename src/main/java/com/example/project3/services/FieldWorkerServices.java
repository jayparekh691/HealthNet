package com.example.project3.services;

import com.example.project3.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FieldWorkerServices {
    List<Patient> getPatientList(Integer id);

    List<Appointment> getPatientFollowups(Integer id);
    Appointment getVisitDetails(Integer id);

    Visit saveVisit(MedicalData medicalData, Integer f_id);
}
