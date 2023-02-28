package com.example.project3.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class Followup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int f_id;
    private String instructions;
    private int numberOfFollowup;
    private int secheduleCount;
    private String scheduleType;

}