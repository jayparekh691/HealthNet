package com.example.project3.services.impl;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import com.example.project3.entities.Visit;
import com.example.project3.repo.*;
import com.example.project3.services.EmployeeServices;
import com.example.project3.services.SupervisorServices;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SupervisorServicesImpl implements SupervisorServices {

    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private VisitRepo visitRepo;

    @Autowired
    private FollowupRepo followupRepo;
    @Override
    public Patient assignFieldWorker(Integer pid, Integer fid) {
        Patient patient = this.patientRepo.findById(pid).orElseThrow();
        Employee employee = this.employeeRepo.findById(fid).orElseThrow();
        patient.setFieldworker(employee);
        this.patientRepo.save(patient);
        List<Appointment> appointments=this.appointmentRepo.findByPatient(patient);
        for(Appointment appointment:appointments)
        {
            List<Visit> visits=appointment.getFollowup().getVisitList();
            for(Visit v:visits)
            {
                if(v.isVisited()==false)
                {
                    v.setFieldWorker(employee);
                    this.visitRepo.save(v);
                }
            }
        }
        return patient;
    }

    @Override
    public List<Patient> reassignFieldWorker(Integer oid, Integer nid) {
        Employee employee = this.employeeRepo.findById(oid).orElseThrow();
        List<Patient> patients = this.patientRepo.findPatientByFieldworker(employee);
        List<Patient> newPatients = new ArrayList<Patient>();
        for(Patient i:patients)
        {
            int id=i.getPid();
            assignFieldWorker(id,nid);
            newPatients.add(patientRepo.findById(id).orElseThrow());
        }
        return newPatients;
    }

    @Override
    public List<Patient> getPatients() {
        List<Appointment> appointments=this.appointmentRepo.findAll();
        Set<Patient> patients=new HashSet<Patient>();
        List<Patient> validPatients=new ArrayList<Patient>();
        for(Appointment i:appointments)
        {
            Patient p=i.getPatient();
            if(i.getFollowup()!=null && p.getFieldworker()==null)
            {
                patients.add(p);
            }
        }
        for(Patient p:patients)
        {
            validPatients.add(p);
        }
        return validPatients;
    }

    @Override
    public List<Employee> getFieldWorkerList() {
        String role="FieldWorker";
        List<Employee> employees = this.employeeRepo.findEmployeeByRole(role);
        return employees;
    }
    @Override
    public List<Patient> getPatientList(Integer id) {
        Employee employee = this.employeeRepo.findById(id).orElseThrow();
        List<Patient> patients = this.patientRepo.findPatientByFieldworker(employee);
        return patients;
    }

    @Override
    public List<Visit> getDueVisitList() {
        Date  date = new Date();
        List<Visit> visits = this.visitRepo.findByDateBefore(date);
        for(Visit visit:visits){
            if(visit.isVisited()==true)
                visits.remove(visit);
        }
        return visits;
    }
}
