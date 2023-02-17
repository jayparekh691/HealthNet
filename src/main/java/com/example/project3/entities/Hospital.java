package com.example.project3.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    private List<Employee> employeeList;


}
