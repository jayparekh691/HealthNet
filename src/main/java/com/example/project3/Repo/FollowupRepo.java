package com.example.project3.Repo;

import com.example.project3.Models.Followup;
import com.example.project3.Models.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowupRepo extends JpaRepository<Followup, Integer> {
    Followup findAllByVisitListContaining(Visit visit);
}
