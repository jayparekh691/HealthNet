package com.example.project3.services;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Employee;

import java.util.List;

public interface AppointmentServices {

    Appointment createAppointment(Appointment appointment,Integer p_id,Integer d_id);
    Appointment updateAppointment(Appointment employeeDto, Integer id);
    Appointment getAppointmentById(Integer id);
    List<Appointment> getAllAppointments();
    void deleteAppointment(Integer id);

//    List<Appointment> searchAppByPIDorName(String id);
}
