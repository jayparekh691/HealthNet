package com.example.project3.payloads;

import com.example.project3.entities.Hospital;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Setter
@Getter
public class EmployeeDto {
    private int e_id;
    String name;
    Date DOB;
    String email;
    String password;
    String mobile_number;
    char gender;
    String address;
    String qualification;
    String emp_type;
    String photo;
    String license_number;
    String specialization;


    @ManyToOne
    @JoinColumn
    private Hospital hospitalDto;

}
