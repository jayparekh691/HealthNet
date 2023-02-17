package com.example.project3.services;

import com.example.project3.payloads.EmployeeDto;

import java.util.List;

public interface EmployeeServices {

    EmployeeDto createEmployee(EmployeeDto employeeDto,Integer h_id);
    EmployeeDto updateEmployee(EmployeeDto employeeDto, Integer id);
    EmployeeDto getEmployeeById(Integer id);
    List<EmployeeDto> getAllEmployees();
    void deleteEmployee();

}
