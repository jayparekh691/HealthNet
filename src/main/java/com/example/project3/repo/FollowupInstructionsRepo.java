package com.example.project3.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.project3.entities.FollowupInstructions;

public interface FollowupInstructionsRepo extends JpaRepository<FollowupInstructions,Integer> {
}
