package com.example.project3.repo;

import com.example.project3.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepo extends JpaRepository<Appointment,Integer> {
}
