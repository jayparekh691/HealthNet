package com.example.project3.Controller;

import com.example.project3.Security.services.JwtService;
import com.example.project3.Dto.AuthRequest;
import com.example.project3.Models.Employee;
import com.example.project3.Models.LoginResponse;
import com.example.project3.Repo.EmployeeRepo;
import com.example.project3.Models.UpdatePassword;
import com.example.project3.Services.EmployeeServices;
import com.example.project3.Utils.EmailUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
      else return new ResponseEntity<>("Invalid Username or password",HttpStatus.CONFLICT);
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
