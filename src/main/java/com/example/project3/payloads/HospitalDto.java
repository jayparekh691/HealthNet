package com.example.project3.payloads;


import com.example.project3.entities.Employee;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class HospitalDto {
    private int h_id;

    String h_name;
    String h_address;
    String admin_name;
    String admin_address;
    String email;
    String password;
    String mobile_number;


    @OneToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<EmployeeDto> employeedtoList;

}
