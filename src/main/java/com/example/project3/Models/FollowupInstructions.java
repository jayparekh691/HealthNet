package com.example.project3.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class FollowupInstructions {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int fi_id;

    private boolean temperature;
    private boolean sugarLevel;
    private boolean bloodPressure;
    private boolean spo2Level;
}
