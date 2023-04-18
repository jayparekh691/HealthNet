package com.example.project3.entities;

import lombok.Data;

import java.util.Date;

@Data
public class VisitModel {
    private int v_id;
    private int followup_id;
    private boolean temperature;
    private boolean sugarLevel;
    private boolean bloodPressure;
    private boolean spo2Level;
    private String prescription;
    private String name;
    private int age;
    private String address;
    private String city;
    private char gender;
    private String state;
    private int pincode;
    private String mobilenumber;
    private String town;
    private boolean isvisited;
    private Date date;
    private String otp;
}
