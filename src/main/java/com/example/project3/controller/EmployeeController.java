package com.example.project3.controller;


import com.example.project3.payloads.EmployeeDto;
import com.example.project3.payloads.HospitalDto;
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
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto, @PathVariable("id") Integer h_id){
            EmployeeDto employeeDto1 = this.employeeServices.createEmployee(employeeDto,h_id);
            return new ResponseEntity<>(employeeDto1, HttpStatus.CREATED);
    }
}
