package com.example.project3.controller;

import com.example.project3.Security.services.JwtService;
import com.example.project3.dto.AuthRequest;
import com.example.project3.entities.Employee;
import com.example.project3.entities.LoginResponse;
import com.example.project3.repo.EmployeeRepo;
import com.example.project3.entities.UpdatePassword;
import com.example.project3.services.EmployeeServices;
import com.example.project3.utils.EmailUtils;
import com.fasterxml.jackson.annotation.JsonRawValue;
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
import java.util.Map;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmployeeRepo empRepo;

    @GetMapping("/welcome")
    public ResponseEntity<?> welcome(){
        return new ResponseEntity<>("Hello",HttpStatus.ACCEPTED);
    }

    @Autowired
    private EmailUtils emailUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest){
//        Employee employee1 = this.employeeServices.login(employee);
      Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
      if(authentication.isAuthenticated()) {
          String token=jwtService.generateToken(authRequest.getEmail());
          Employee emp=this.empRepo.findByEmail(authRequest.getEmail()).orElseThrow();
          LoginResponse loginResponse=new LoginResponse();
          loginResponse.setToken(token);
          loginResponse.setRoles(emp.getRoles());
          loginResponse.setName(emp.getName());
          loginResponse.setEmail(emp.getEmail());
          loginResponse.setE_id(emp.getE_id());
          return new ResponseEntity<>(loginResponse,HttpStatus.ACCEPTED);
      }
      else throw new UsernameNotFoundException("Invalid Username or password");
    }
    @GetMapping("/get-all-doctors")
    @PreAuthorize("hasAuthority('Receptionist')")
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
