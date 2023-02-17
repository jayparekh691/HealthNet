package com.example.project3.repo;

import com.example.project3.entities.Patient;
import com.example.project3.services.PatientServices;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepo extends JpaRepository<Patient,Integer> {
}
