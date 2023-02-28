package com.example.project3.controller;

import com.example.project3.entities.Employee;
import com.example.project3.services.EmployeeServices;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;

    @PostMapping("/create-employee/")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
            Employee employee1 = this.employeeServices.createEmployee(employee);
            return new ResponseEntity<>(employee1, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Employee> login(@RequestBody Employee employee){
        Employee employee1 = this.employeeServices.login(employee);
        return new ResponseEntity<Employee>(employee1,HttpStatus.ACCEPTED);
    }
    @GetMapping("/get-all-doctors")
    public ResponseEntity<List<Employee>> getAllDoctors(){
        List<Employee> employees = this.employeeServices.getAllDoctors();
        return new ResponseEntity<>(employees,HttpStatus.ACCEPTED);
    }
}