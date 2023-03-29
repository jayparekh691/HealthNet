package com.example.project3.services;

import com.example.project3.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FieldWorkerServices {
    List<Patient> getPatientList(Integer id);

    List<Appointment> getPatientFollowups(Integer id);
    Appointment getVisitDetails(Integer id);

    void saveVisit(Visit visit, Integer f_id);
}
