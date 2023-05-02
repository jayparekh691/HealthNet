package com.example.project3.Services;

import com.example.project3.Payload.Pair;
import com.example.project3.Models.Employee;
import com.example.project3.Models.Patient;

import java.util.List;

public interface SupervisorServices {
    Patient assignFieldWorker(Integer pid,Integer fid);
    List<Patient> reassignFieldWorker(Integer oid,Integer nid);

    List<Patient> getPatients();

    List<Employee> getFieldWorkerList();

    List<Patient> getPatientList(Integer id);

    List<Pair> getDueVisitList();

    List<Employee> searchFieldWorkerByName(String name);

    Patient assignFieldWorkerWithDate(Integer pid, Integer fid);
}
