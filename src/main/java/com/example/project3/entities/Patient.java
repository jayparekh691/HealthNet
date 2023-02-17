package com.example.project3.entities;

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
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int p_id;

    private String name;
    private int age;
    private String mobile_number;
    private char gender;
    private String address;
    private String town;
    private String city;
    private String state;
    private int pincode;

    @OneToMany(fetch = FetchType.EAGER)
    List<Appointment> appointments;
}
