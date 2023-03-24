package com.example.project3.repo;

import com.example.project3.entities.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepo extends JpaRepository<Visit,Integer> {
}
