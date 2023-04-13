package com.example.project3.controller;

import com.example.project3.config.Pair;
import com.example.project3.entities.Employee;
import com.example.project3.entities.Patient;
import com.example.project3.entities.Visit;
import com.example.project3.services.SupervisorServices;
import com.example.project3.services.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
//    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        Employee employee1 = this.employeeServices.createEmployee(employee);
        return new ResponseEntity<>(employee1, HttpStatus.CREATED);
    }

    @PostMapping("/update-employee/{e_id}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee,@PathVariable("e_id") Integer eid){
        Employee employee1=this.employeeServices.updateEmployee(employee,eid);
        return new ResponseEntity<>(employee1,HttpStatus.CREATED);
    }

    @GetMapping("/search-employee/{name}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<List<Employee>> findEmployeeByName(@PathVariable("name") String name) {
        List<Employee> employees=this.employeeServices.findEmployeeByName(name);
        return new ResponseEntity<>(employees,HttpStatus.CREATED);
    }

    @DeleteMapping("/delete-employee/{e_id}")
    @PreAuthorize("hasAuthority('Admin')")
    public void deactivateEmployee(@PathVariable("e_id") Integer id){
        employeeServices.deactivateEmployee(id);
    }

    @GetMapping("/assign-fieldworker/{p_id}/{f_id}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<Patient> assignFieldWorker(@PathVariable("p_id") Integer pid,@PathVariable("f_id") Integer fid){
        Patient patient1 = this.supervisorServices.assignFieldWorker(pid,fid);
        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
    }
    @GetMapping("/reassign-field-worker-pid/{p_id}/{f_id}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<Patient> reassignFieldWorkerPid(@PathVariable("p_id") Integer pid,@PathVariable("f_id") Integer fid){
        Patient patient1 = this.supervisorServices.assignFieldWorkerWithDate(pid,fid);
        return new ResponseEntity<>(patient1, HttpStatus.CREATED);
    }

    @GetMapping("/reassign-fieldworker/{old}/{new}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<List<Patient>> reassignFieldWorker(@PathVariable("old") Integer oid,@PathVariable("new") Integer nid){
        List<Patient> patients=this.supervisorServices.reassignFieldWorker(oid,nid);
        return new ResponseEntity<List<Patient>>(patients,HttpStatus.ACCEPTED);
    }

    @GetMapping("/get-valid-patients/")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<List<Patient>> getPatients(){
        List<Patient> patients=this.supervisorServices.getPatients();
        return new ResponseEntity<List<Patient>>(patients,HttpStatus.CREATED);
    }

    @GetMapping("/get-fieldworker-list/")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<List<Employee>> getFieldWorker(){
        List<Employee> employees=this.supervisorServices.getFieldWorkerList();
        return new ResponseEntity<List<Employee>>(employees,HttpStatus.CREATED);
    }
    @GetMapping("/get-patient-list/{f_id}")
    @PreAuthorize("hasAuthority('FieldWorker')")
    public ResponseEntity<List<Patient>> getPatientListForFieldWorker(@PathVariable("f_id") Integer id){
        List<Patient> patients = this.supervisorServices.getPatientList(id);
        return new ResponseEntity<>(patients, HttpStatus.ACCEPTED);
    }

    @GetMapping("/due-visits")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<List<Pair>> getDueVisitList(){
        List<Pair> list = this.supervisorServices.getDueVisitList();
        return new ResponseEntity<>(list,HttpStatus.ACCEPTED);
    }

    @GetMapping("/search-fieldworker/{name}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<List<Employee>> searchFieldWorkerByName(@PathVariable("name") String name){
        List<Employee> employees = this.supervisorServices.searchFieldWorkerByName(name);
        return new ResponseEntity<>(employees,HttpStatus.ACCEPTED);
    }


}
