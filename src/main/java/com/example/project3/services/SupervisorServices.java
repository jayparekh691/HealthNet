package com.example.project3.services;

import com.example.project3.entities.Patient;
import org.springframework.stereotype.Service;

import java.util.List;

public interface SupervisorServices {
    Patient assignFieldWorker(Integer pid,Integer fid);
    List<Patient> reassignFieldWorker(Integer oid,Integer nid);

    List<Patient> getPatients();
}
