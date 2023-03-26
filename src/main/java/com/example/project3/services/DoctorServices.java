package com.example.project3.services;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Diagnostics;
import com.example.project3.entities.Followup;
import com.example.project3.entities.Patient;

import java.util.List;

public interface DoctorServices {
    List<Appointment> getAppointmentByDoctorId(Integer id);
    Appointment writeDiagnostics(Diagnostics diagnostics,Integer id);

    Appointment writeFollowup(Followup followup, Integer id);
    List<Appointment> viewPatientHistory(Integer id);

    List<Patient> searchPatientByNameORpid(String id);
    List<Appointment> viewAppointments(Integer id);
    Followup getFollowupByAid(Integer id);
}
