package com.example.project3.repo;

import com.example.project3.entities.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface VisitRepo extends JpaRepository<Visit,Integer> {
    List<Visit> findByDateBefore(Date date);
}
