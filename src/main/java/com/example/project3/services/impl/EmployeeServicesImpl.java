package com.example.project3.services.impl;

import com.example.project3.entities.Employee;
import com.example.project3.repo.EmployeeRepo;
import com.example.project3.services.EmployeeServices;
import com.example.project3.utils.EmailUtils;
import io.jsonwebtoken.lang.Strings;
//import org.apache.logging.log4j.util.Strings;
import org.apache.naming.factory.SendMailFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

@Service
public class EmployeeServicesImpl implements EmployeeServices {

    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private EmailUtils emailUtils;
    @Override
    public Employee login(Employee employee) {
        Employee employee1 = this.employeeRepo.findEmployeeByEmailAndPassword(employee.getEmail(), employee.getPassword());
        return employee1;
    }
    @Override
    public Employee createEmployee(Employee employee) {
        this.employeeRepo.save(employee);
        return employee;
    }

    @Override
    public Employee updateEmployee(Employee employee, Integer id) {
        Employee employee1 =this.employeeRepo.findById(id).orElseThrow();
        employee1.setEmail(employee.getEmail());
        employee1.setName(employee.getName());
        employee1.setSpecialization(employee.getSpecialization());
        employee1.setName(employee.getName());
        employee1.setGender(employee.getGender());
        employee1.setPassword(employee.getPassword());
        employee1.setRole(employee.getRole());
        employee1.setMobilenumber(employee.getMobilenumber());
        employee1.setAddress(employee.getAddress());
        this.employeeRepo.save(employee1);
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
        List<Employee> employees = this.employeeRepo.findEmployeeByRole(role);
        return employees;
    }

    @Override
    public Employee forgotPassword(String request) {
        try{
            System.out.println(request);
            Employee employee = this.employeeRepo.findEmployeeByEmail(request);
            String newPassword = new DecimalFormat("000000")
                    .format(new Random().nextInt(999999));
            employee.setPassword(newPassword);
            this.emailUtils.forgotMail(employee.getEmail(),"New Credentials",newPassword);
            System.out.println(employee.getEmail());
            System.out.println(employee.getPassword());
            this.employeeRepo.save(employee);
            return employee;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public String updatePassword(Integer request, String old_pass, String new_pass) {
        Employee employee = this.employeeRepo.findById(request).orElseThrow();
        if(employee!=null){
            if(employee.getPassword().equals(old_pass)) {
                employee.setPassword(new_pass);
                this.employeeRepo.save(employee);
                return "Success";
            }
            else
                return "Old Password not match";
        }
        return "Employee Doesn't Exist";
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
