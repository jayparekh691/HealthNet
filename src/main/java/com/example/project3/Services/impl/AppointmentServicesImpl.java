package com.example.project3.Services.impl;

import com.example.project3.Models.Appointment;
import com.example.project3.Models.Employee;
import com.example.project3.Models.Patient;
import com.example.project3.Repo.AppointmentRepo;
import com.example.project3.Repo.EmployeeRepo;
import com.example.project3.Repo.PatientRepo;
import com.example.project3.Services.AppointmentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    public Appointment createAppointment(Appointment appointment, Integer p_id, Integer d_id) throws ParseException {
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        Patient patient = this.patientRepo.findById(p_id).orElseThrow();
        Employee employee = this.employeeRepo.findById(d_id).orElseThrow();
        appointment.setPatient(patient);
        appointment.setDoctor(employee);
        Date date = new Date();
        String sdate = simpleDateFormat.format(date);
        Date d = simpleDateFormat.parse(sdate);
        appointment.setCurr_date(d);
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
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        List<Appointment> appointments = this.appointmentRepo.findAll();
        List<Appointment> appointments1 = new ArrayList<>();
        String today = simpleDateFormat.format(new Date());
        for(Appointment appointment :appointments){
            System.out.println(today);
            String tdate = simpleDateFormat.format(appointment.getCurr_date());
            System.out.println(tdate);
            if(tdate.equals(today) && appointment.isTreated()==false)
                appointments1.add(appointment);
        }
        return appointments1;
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
