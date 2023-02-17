package com.example.project3.repo;

import ch.qos.logback.core.model.INamedModel;
import com.example.project3.entities.Employee;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
}
