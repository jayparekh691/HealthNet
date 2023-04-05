package com.example.project3.services.impl;

import com.example.project3.entities.Employee;
import com.example.project3.repo.EmployeeRepo;
import com.example.project3.services.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServicesImpl implements EmployeeServices {

    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
//    @Override
//    public Employee login(Employee employee) {
//        String pass=passwordEncoder.encode(employee.getPassword());
//        Employee employee1 = this.employeeRepo.findEmployeeByEmailAndPassword(employee.getEmail(), pass);
//        return employee1;
//    }
    @Override
    public Employee createEmployee(Employee employee) {
        String pass=employee.getPassword();
        employee.setPassword(passwordEncoder.encode(pass));
        this.employeeRepo.save(employee);
        employee.setPassword(pass);
        return employee;
    }
    @Override
    public Employee updateEmployee(Employee employee, Integer id) {
        String pass=employee.getPassword();
        Employee employee1 =this.employeeRepo.findById(id).orElseThrow();
        employee1.setEmail(employee.getEmail());
        employee1.setName(employee.getName());
        employee1.setSpecialization(employee.getSpecialization());
        employee1.setName(employee.getName());
        employee1.setGender(employee.getGender());
        employee1.setPassword(passwordEncoder.encode(pass));
        employee1.setRoles(employee.getRoles());
        this.employeeRepo.save(employee1);
        employee1.setPassword(pass);
        return employee1;
    }

    @Override
    public Employee getEmployeeById(Integer id) {
        Employee employee = this.employeeRepo.findById(id).orElseThrow();
        return employee;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> employees = this.employeeRepo.findAll();
        return employees;
    }

    @Override
    public  List<Employee> getAllDoctors(){
        String role="doctor";
        List<Employee> employees = this.employeeRepo.findEmployeeByRoles(role);
        return employees;
    }

    @Override
    public List<Employee> findEmployeeByName(String name){
        List<Employee> employees=this.employeeRepo.findEmployeeByNameContaining(name);
        return employees;
    }
    @Override
    public void deactivateEmployee(Integer id) {
        employeeRepo.deleteById(id);
    }
}
