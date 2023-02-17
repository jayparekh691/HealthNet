package com.example.project3.controller;

import com.example.project3.entities.Employee;
import com.example.project3.services.EmployeeServices;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;

    @PostMapping("/{id}")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee, @PathVariable("id") Integer h_id){
            Employee employee1 = this.employeeServices.createEmployee(employee,h_id);
            return new ResponseEntity<>(employee1, HttpStatus.CREATED);
    }

    @PostMapping("/login/{email}/{password}")
    public ResponseEntity<Employee> login(@PathVariable("email") String email, @PathVariable("password") String password){
        Employee employee = this.employeeServices.login(email,password);
        return new ResponseEntity<Employee>(employee,HttpStatus.ACCEPTED);
    }
}
