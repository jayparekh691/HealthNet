package com.example.project3.repo;

import com.example.project3.entities.Diagnostics;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiagnosticsRepo extends JpaRepository<Diagnostics,Integer> {
}
