package com.example.project3.services;

import com.example.project3.config.Pair;
import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import com.example.project3.entities.Visit;
import org.springframework.stereotype.Service;

import java.util.List;

public interface SupervisorServices {
    Patient assignFieldWorker(Integer pid,Integer fid);
    List<Patient> reassignFieldWorker(Integer oid,Integer nid);

    List<Patient> getPatients();

    List<Employee> getFieldWorkerList();

    List<Patient> getPatientList(Integer id);

    List<Pair> getDueVisitList();

    List<Employee> searchFieldWorkerByName(String name);
}
