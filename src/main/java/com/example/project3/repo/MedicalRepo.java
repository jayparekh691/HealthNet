package com.example.project3.repo;

import com.example.project3.entities.MedicalData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalRepo extends JpaRepository<MedicalData,Integer> {
}
