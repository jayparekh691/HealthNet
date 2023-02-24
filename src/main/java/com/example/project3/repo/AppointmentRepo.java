package com.example.project3.repo;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepo extends JpaRepository<Appointment,Integer> {
    List<Appointment> findByDoctor(Employee e);
}
