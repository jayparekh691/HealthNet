package com.example.project3.repo;

import com.example.project3.entities.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepo extends JpaRepository<Hospital,Integer> {
}
