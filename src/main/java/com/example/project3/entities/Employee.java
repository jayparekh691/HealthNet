package com.example.project3.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.List;

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
    private String email;
    private String password;
    private char gender;
    private String role;
    private String specialization;

    @OneToMany
    private List<Visit> visitList;
}
