package com.example.project3.services;

import com.example.project3.entities.Employee;

import java.util.List;

public interface EmployeeServices {


    Employee login(Employee employee);
    Employee createEmployee(Employee employeeDto);
    Employee updateEmployee(Employee employeeDto, Integer id);
    Employee getEmployeeById(Integer id);
    List<Employee> getAllEmployees();
    void deactivateEmployee(Integer id);

}
