package com.example.project3.services;

import com.example.project3.entities.Employee;

import java.util.List;

public interface EmployeeServices {


    Employee login(String email,String password);
    Employee createEmployee(Employee employeeDto, Integer h_id);
    Employee updateEmployee(Employee employeeDto, Integer id);
    Employee getEmployeeById(Integer id);
    List<Employee> getAllEmployees();
    void deleteEmployee();

}
