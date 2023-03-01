package com.example.project3.services.impl;

import com.example.project3.entities.Appointment;
import com.example.project3.entities.Employee;
import com.example.project3.repo.AppointmentRepo;
import com.example.project3.repo.EmployeeRepo;
import com.example.project3.services.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServicesImpl implements EmployeeServices {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public Employee login(Employee employee) {
        Employee employee1 = this.employeeRepo.findEmployeeByEmailAndPasswordAndRole(employee.getEmail(), employee.getPassword(), employee.getRole());
        return employee1;
    }

    @Override
    public Employee createEmployee(Employee employee) {
        this.employeeRepo.save(employee);
        return employee;
    }



    @Override
    public Employee updateEmployee(Employee employee, Integer id) {
        Employee employee1 = new Employee();
        employee1.setEmail(employee.getEmail());
        employee1.setName(employee.getName());
        employee1.setSpecialization(employee.getSpecialization());
        employee1.setName(employee.getName());
        employee1.setGender(employee.getGender());
        employee1.setPassword(employee.getPassword());
        employee1.setRole(employee.getRole());
        return employee1;
    }

    @Override
    public Employee getEmployeeById(Integer id) {
        Employee employee = this.employeeRepo.findById(id).orElseThrow();
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> employees = this.employeeRepo.findAll();
        return employees;
    }

    @Override
    public  List<Employee> getAllDoctors(){
        String role="doctor";
        List<Employee> employees = this.employeeRepo.findEmployeeByRole(role);
        return employees;
    }

    @Override
    public void deactivateEmployee(Integer id) {

    }
}
