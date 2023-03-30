package com.example.project3.repo;

import com.example.project3.entities.Followup;
import com.example.project3.entities.Visit;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowupRepo extends JpaRepository<Followup, Integer> {
    Followup findAllByVisitListContaining(Visit visit);
}
