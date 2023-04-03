package com.example.project3.config;

import com.example.project3.entities.Patient;
import com.example.project3.entities.Visit;
import com.example.project3.repo.VisitRepo;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Pair {
    private Patient patient;
    private List<Visit> visit;
}
