package com.example.project3.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int e_id;
    private String name;
    private Date DOB;
    private String email;
    private String password;
    private String mobile_number;
    private char gender;
    private String address;
    private String qualification;
    private String role;
    private String photo;
    private String license_number;
    private String specialization;


}
