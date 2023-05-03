package com.example.project3.Services;

import com.example.project3.Models.*;

import java.util.List;

public interface DoctorServices {
    List<Appointment> getAppointmentByDoctorId(Integer id);
    Appointment writeDiagnostics(Diagnostics diagnostics,Integer id);

    Appointment writeFollowup(Followup followup, Integer id);
    List<Appointment> viewPatientHistory(Integer did,Integer pid);

    List<Patient> searchPatientByNameORpid(Integer did,String id);
    List<Appointment> viewAppointments(Integer id);
    Followup getFollowupByAid(Integer id);

    List<Appointment> getUnseenListByDoctorId(Integer did);

    Visit setVisitSeen(Integer vid);

    Appointment deactivateFollowup(Integer id);
}
