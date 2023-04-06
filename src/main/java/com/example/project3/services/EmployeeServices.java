package com.example.project3.services;

import com.example.project3.entities.Employee;

import java.util.List;
import java.util.Map;

public interface EmployeeServices {


    Employee login(Employee employee);
    Employee createEmployee(Employee employeeDto);
    Employee updateEmployee(Employee employeeDto, Integer id);
    Employee getEmployeeById(Integer id);
    void deactivateEmployee(Integer id);
    List<Employee> getAllEmployees();
    List<Employee> findEmployeeByName(String name);
    List<Employee> getAllDoctors();
    Employee forgotPassword(String request);
    String updatePassword(Integer request, String old_mail, String new_mail);
}
