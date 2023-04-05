package com.example.project3.controller;

import com.example.project3.Security.services.JwtService;
import com.example.project3.dto.AuthRequest;
import com.example.project3.entities.Employee;
import com.example.project3.services.EmployeeServices;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public ResponseEntity<?> welcome(){
        return new ResponseEntity<>("Hello",HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest){
//        Employee employee1 = this.employeeServices.login(employee);
      Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
      if(authentication.isAuthenticated())
        return jwtService.generateToken(authRequest.getEmail());
      else throw new UsernameNotFoundException("Invalid Username or password");
    }
    @GetMapping("/get-all-doctors")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity<List<Employee>> getAllDoctors(){
        List<Employee> employees = this.employeeServices.getAllDoctors();
        return new ResponseEntity<>(employees,HttpStatus.ACCEPTED);
    }
}
