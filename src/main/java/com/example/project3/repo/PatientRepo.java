package com.example.project3.repo;

import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import com.example.project3.services.PatientServices;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepo extends JpaRepository<Patient,Integer> {

    List<Patient> findPatientByFieldworker(Employee employee);
    List<Patient> findAllByNameContaining(String name);
    List<Patient> findPatientsByMobilenumberContaining(String mobilenumber);


}
