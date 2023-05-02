package com.example.project3.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.project3.Models.FollowupInstructions;

public interface FollowupInstructionsRepo extends JpaRepository<FollowupInstructions,Integer> {
}
