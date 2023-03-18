package com.example.project3.services;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Followup;
import com.example.project3.entities.Patient;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FieldWorkerServices {
    List<Patient> getPatientList(Integer id);

    List<Appointment> getPatientFollowups(Integer id);
}
