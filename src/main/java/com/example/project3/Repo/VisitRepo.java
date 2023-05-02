package com.example.project3.Repo;

import com.example.project3.Models.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface VisitRepo extends JpaRepository<Visit,Integer> {
    List<Visit> findByDateBefore(Date date);
}
