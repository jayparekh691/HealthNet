package com.example.project3.Repo;

import com.example.project3.Models.Employee;
import com.example.project3.Models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepo extends JpaRepository<Patient,Integer> {

    List<Patient> findPatientByFieldworker(Employee employee);
    List<Patient> findAllByNameContaining(String name);
    List<Patient> findPatientsByMobilenumberContaining(String mobilenumber);


}
