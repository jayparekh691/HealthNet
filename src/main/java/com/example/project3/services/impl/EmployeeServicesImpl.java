package com.example.project3.services.impl;

import com.example.project3.entities.Employee;
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
    public Employee login(String email, String password, String role) {
        Employee employee = this.employeeRepo.findEmployeeByEmailAndPasswordOrRole(email,password,role);
//        System.out.println(employee.getEmail());
        return employee;
    }

    @Override
    public Employee createEmployee(Employee employee) {
        this.employeeRepo.save(employee);
        return employee;
    }



    @Override
    public Employee updateEmployee(Employee employeeDto, Integer id) {
        return null;
    }

    @Override
    public Employee getEmployeeById(Integer id) {
        return null;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return null;
    }

    @Override
    public void deleteEmployee() {

    }



}
