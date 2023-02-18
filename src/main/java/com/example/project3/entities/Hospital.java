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

    private String h_name;
    private String h_address;
    private String admin_name;
    private String admin_address;
    private String email;
    private String password;
    private String mobile_number;

}
