package com.example.project3.services.impl;

import com.example.project3.entities.Employee;
import com.example.project3.payloads.EmployeeDto;
import com.example.project3.repo.EmployeeRepo;
import com.example.project3.services.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServicesImpl implements EmployeeServices {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto,Integer h_id) {
        Employee employee = dtoToEmployee(employeeDto);

        this.employeeRepo.save(employee);
        EmployeeDto employeeDto1 = EmployeeTodto(employee);
        return employeeDto1;
    }

    @Override
    public EmployeeDto updateEmployee(EmployeeDto employeeDto, Integer id) {
        return null;
    }

    @Override
    public EmployeeDto getEmployeeById(Integer id) {
        return null;
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        return null;
    }

    @Override
    public void deleteEmployee() {

    }


    private Employee dtoToEmployee(EmployeeDto employeeDto){
        Employee employee = new Employee();
        employee.setAddress(employeeDto.getAddress());
        employee.setDOB(employeeDto.getDOB());
        employee.setE_id(employeeDto.getE_id());
        employee.setEmail(employeeDto.getEmail());
        employee.setGender(employeeDto.getGender());
        employee.setPassword(employeeDto.getPassword());
        employee.setMobile_number(employeeDto.getMobile_number());
        employee.setName(employeeDto.getName());
        employee.setQualification(employeeDto.getQualification());
        employee.setEmp_type(employeeDto.getEmp_type());
        employee.setPhoto(employeeDto.getPhoto());
        employee.setLicense_number(employeeDto.getLicense_number());
        employee.setSpecialization(employeeDto.getSpecialization());
        employee.setHospital(employeeDto.getHospitalDto());
        return employee;
    }
    private EmployeeDto EmployeeTodto(Employee employee){
        EmployeeDto employeeDto  = new EmployeeDto();
        employeeDto.setAddress(employee.getAddress());
        employeeDto.setDOB(employee.getDOB());
        employeeDto.setE_id(employee.getE_id());
        employeeDto.setEmail(employee.getEmail());
        employeeDto.setGender(employee.getGender());
        employeeDto.setPassword(employee.getPassword());
        employeeDto.setMobile_number(employee.getMobile_number());
        employeeDto.setName(employee.getName());
        employeeDto.setQualification(employee.getQualification());
        employeeDto.setEmp_type(employee.getEmp_type());
        employeeDto.setPhoto(employee.getPhoto());
        employeeDto.setLicense_number(employee.getLicense_number());
        employeeDto.setSpecialization(employee.getSpecialization());
        employeeDto.setHospitalDto(employee.getHospital());
        return employeeDto;
    }

}
