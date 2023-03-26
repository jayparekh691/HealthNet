package com.example.project3.services.impl;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import com.example.project3.repo.AppointmentRepo;
import com.example.project3.repo.EmployeeRepo;
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
    @Autowired
    private EmployeeRepo employeeRepo;
    @Override
    public Appointment createAppointment(Appointment appointment, Integer p_id, Integer d_id) {
        Patient patient = this.patientRepo.findById(p_id).orElseThrow();
        Employee employee = this.employeeRepo.findById(d_id).orElseThrow();
        appointment.setPatient(patient);
        appointment.setDoctor(employee);
//        patient.getAppointments().add(appointment);
//        this.patientRepo.save(patient);
        this.appointmentRepo.save(appointment);
        return appointment;
    }

    @Override
    public Appointment updateAppointment(Appointment appointment, Integer id) {
        Appointment appointment1 = this.appointmentRepo.findById(id).orElseThrow();
        appointment1.setDiagnostics(appointment.getDiagnostics());
        appointment1.setPatient(appointment.getPatient());
        appointment1.setDoctor(appointment.getDoctor());
        appointment1.setFollowup(appointment.getFollowup());
        appointment1.setCurr_date(appointment.getCurr_date());
        return appointment1;
    }

    @Override
    public Appointment getAppointmentById(Integer id) {
        Appointment appointment = this.appointmentRepo.findById(id).orElseThrow();
        return appointment;
    }

    @Override
    public List<Appointment> getAllAppointments() {
        List<Appointment> appointments = this.appointmentRepo.findAll();
        return appointments;
    }

    @Override
    public void deleteAppointment(Integer id) {
        this.appointmentRepo.deleteById(id);
    }

//    @Override
//    public List<Appointment> searchAppByPIDorName(String id) {
//        List<Appointment> appointments;
//        try{
//            int i=Integer.parseInt(id);
//            Patient patient=this.patientRepo.findById(i).orElseThrow();
//            appointments=this.appointmentRepo.findByPatient(patient);
//        }
//        catch(Exception e){
//
//
//        }
//
//    }
}
