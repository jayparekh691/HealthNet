package com.example.project3.services.impl;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Patient;
import com.example.project3.repo.AppointmentRepo;
import com.example.project3.repo.PatientRepo;
import com.example.project3.services.AppointmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServicesImpl implements AppointmentServices {

    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private PatientRepo patientRepo;
    @Override
    public Appointment createAppointment(Appointment appointment, Integer p_id) {
        Patient patient = this.patientRepo.getById(p_id);
        appointment.setPatient(patient);
        return appointment;
    }

    @Override
    public Appointment updateAppointment(Appointment employeeDto, Integer id) {
        return null;
    }

    @Override
    public Appointment getAppointmentById(Integer id) {
        return null;
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return null;
    }

    @Override
    public void deleteAppointment(Integer id) {

    }
}
