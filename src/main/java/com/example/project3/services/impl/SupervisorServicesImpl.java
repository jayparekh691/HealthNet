package com.example.project3.services.impl;

import com.example.project3.config.Pair;
import com.example.project3.entities.*;
import com.example.project3.repo.*;
import com.example.project3.services.EmployeeServices;
import com.example.project3.services.SupervisorServices;
import com.twilio.rest.microvisor.v1.App;
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
    public Patient assignFieldWorkerWithDate(Integer pid, Integer fid) {
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
                    Date d=v.getDate();
                    Calendar c = Calendar.getInstance();
                    c.setTime(d);
                    c.add(Calendar.DATE, 1);
                    Date date = c.getTime();
                    v.setFieldWorker(employee);
                    v.setDate(date);
                    System.out.println(date);
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
    public List<Pair> getDueVisitList() {
        Date  date = new Date();
        List<Visit> visits = this.visitRepo.findByDateBefore(date);
        for(Visit visit:visits){
            if(visit.isVisited()==true)
                visits.remove(visit);
        }
        List<Pair> list = new ArrayList<Pair>();
        Map<Patient,List<Visit>> mp=new HashMap<>();
        for(Visit visit:visits){
            Followup followup = this.followupRepo.findAllByVisitListContaining(visit);
            Appointment appointment = this.appointmentRepo.findByFollowup(followup);
            List<Visit> v=new ArrayList<Visit>();
            v=mp.getOrDefault(appointment.getPatient(),null);
            if(v==null)
                v=new ArrayList<>();
            v.add(visit);
            mp.put(appointment.getPatient(),v);
        }
        for(Patient p:mp.keySet())
        {
            List<Visit> v=new ArrayList<Visit>();
            v=mp.getOrDefault(p,null);
            if(v==null) continue;
            Pair pair = new Pair(p, v);
            list.add(pair);
        }
        return list;
    }

    @Override
    public List<Employee> searchFieldWorkerByName(String name) {
        List<Employee> employees = this.employeeRepo.findEmployeeByNameContaining(name);
        for(Employee e:employees)
        {
            if(e.getRole()!="FieldWorker")
                employees.remove(e);
        }
        return employees;
    }
}
