package com.example.project3.services;

import com.example.project3.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FieldWorkerServices {
    List<Appointment> getAppointmentListFW(Integer fid);
    Appointment getVisitDetails(Integer id);

    void saveVisit(Visit visit, Integer f_id);
}
