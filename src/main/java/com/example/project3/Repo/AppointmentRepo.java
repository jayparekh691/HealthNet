package com.example.project3.Repo;

import com.example.project3.Models.Appointment;
import com.example.project3.Models.Employee;
import com.example.project3.Models.Followup;
import com.example.project3.Models.Patient;
import com.twilio.rest.microvisor.v1.App;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepo extends JpaRepository<Appointment,Integer> {
    List<Appointment> findByDoctor(Employee e);
    List<Appointment> findByPatient(Patient p);
    Appointment findByFollowup(Followup followup);

}
