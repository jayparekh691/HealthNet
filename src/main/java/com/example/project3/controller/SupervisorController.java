package com.example.project3.controller;

import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import com.example.project3.services.SupervisorServices;
import com.example.project3.services.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supervisor")
public class SupervisorController {

    @Autowired
    private SupervisorServices supervisorServices;

    @Autowired
    private EmployeeServices employeeServices;

    @PostMapping("/create-employee/")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        Employee employee1 = this.employeeServices.createEmployee(employee);
        return new ResponseEntity<>(employee1, HttpStatus.CREATED);
    }

    @PostMapping("/update-employee/{e_id}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee,@PathVariable("e_id") Integer eid){
        Employee employee1=this.employeeServices.updateEmployee(employee,eid);
        return new ResponseEntity<>(employee1,HttpStatus.CREATED);
    }

    @GetMapping("/search-employee/{name}")
    public ResponseEntity<List<Employee>> findEmployeeByName(@PathVariable("name") String name) {
        List<Employee> employees=this.employeeServices.findEmployeeByName(name);
        return new ResponseEntity<>(employees,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-employee/{e_id}")
    public void deactivateEmployee(@PathVariable("e_id") Integer id){
        employeeServices.deactivateEmployee(id);
    }

    @PostMapping("/assign-fieldworker/{p_id}/{f_id}")
    public ResponseEntity<Patient> assignFieldWorker(@PathVariable("p_id") Integer pid,@PathVariable("f_id") Integer fid){
        Patient patient1 = this.supervisorServices.assignFieldWorker(pid,fid);
        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
    }

    @GetMapping("/reassign-fieldworker/{old}/{new}")
    public ResponseEntity<List<Patient>> reassignFieldWorker(@PathVariable("old") Integer oid,@PathVariable("new") Integer nid){
        List<Patient> patients=this.supervisorServices.reassignFieldWorker(oid,nid);
        return new ResponseEntity<List<Patient>>(patients,HttpStatus.ACCEPTED);
    }
}
