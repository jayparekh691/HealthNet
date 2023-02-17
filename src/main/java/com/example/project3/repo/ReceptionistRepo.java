package com.example.project3.repo;

import com.example.project3.entities.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceptionistRepo extends JpaRepository<Receptionist,Integer> {
}
