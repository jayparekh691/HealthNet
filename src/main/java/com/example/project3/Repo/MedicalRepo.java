package com.example.project3.Repo;

import com.example.project3.Models.MedicalData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalRepo extends JpaRepository<MedicalData,Integer> {
}
