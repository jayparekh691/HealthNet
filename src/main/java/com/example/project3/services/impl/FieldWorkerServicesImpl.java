package com.example.project3.services.impl;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Employee;
import com.example.project3.entities.Followup;
import com.example.project3.entities.Patient;
import com.example.project3.repo.AppointmentRepo;
import com.example.project3.repo.EmployeeRepo;
import com.example.project3.repo.FollowupRepo;
import com.example.project3.repo.PatientRepo;
import com.example.project3.services.FieldWorkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FieldWorkerServicesImpl implements FieldWorkerServices {
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private FollowupRepo followupRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;
    @Override
    public List<Patient> getPatientList(Integer id) {
        Employee employee = this.employeeRepo.findById(id).orElseThrow();
        List<Patient> patients = this.patientRepo.findPatientByFieldworker(employee);
        return patients;
    }


    @Override
    public List<Appointment> getPatientFollowups(Integer id) {
        Patient patient = this.patientRepo.findById(id).orElseThrow();
        List<Appointment> appointments = this.appointmentRepo.findByPatient(patient);
//        List<Appointment> appointmentList=new ArrayList<Appointment>();
        for(Appointment appointment : appointments){
            appointment.setDiagnostics(null);
            appointment.setDoctor(null);
            if(appointment.getFollowupRemaining()==false) {
                appointments.remove(appointment);
            }

        }
        return appointments;
    }

}
