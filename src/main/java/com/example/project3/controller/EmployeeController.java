package com.example.project3.controller;

import com.example.project3.entities.Employee;
import com.example.project3.entities.UpdatePassword;
import com.example.project3.services.EmployeeServices;
import com.example.project3.utils.EmailUtils;
import com.fasterxml.jackson.annotation.JsonRawValue;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;

    @Autowired
    private EmailUtils emailUtils;

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
    @PostMapping("/forgot-password/{email}")
    public  ResponseEntity<?> forgotPassword(@PathVariable("email") String request){
        Employee emp = this.employeeServices.forgotPassword(request);
        return new ResponseEntity<>(emp,HttpStatus.ACCEPTED);
    }
    @PostMapping("/update-password/{e_id}")
    public  ResponseEntity<String> updatePassword(@PathVariable("e_id") Integer request, @RequestBody UpdatePassword password){

        String check = this.employeeServices.updatePassword(request,password.getOld_pass(),password.getNew_pass());
        return new ResponseEntity<>(check,HttpStatus.ACCEPTED);
    }
}
