package com.example.project3.repo;

import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import com.example.project3.services.PatientServices;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepo extends JpaRepository<Patient,Integer> {

//    Patient findPatientByNameOrMobilenumber(String name,String mobilenumber);
    List<Patient> findPatientByFieldworker(Employee employee);

//    Patient findPatientByNameAndMobilenumber(String name, String mobilenumber);
    List<Patient> findPatientByName(String name);

    List<Patient> findPatientByNameContaining(String name);

    List<Patient> findPatientByMobilenumber(String mobilenumber);
}
