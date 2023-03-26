package com.example.project3.repo;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepo extends JpaRepository<Appointment,Integer> {
    List<Appointment> findByDoctor(Employee e);
    List<Appointment> findByPatient(Patient p);

}
