package com.example.project3.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table
@NoArgsConstructor
@Setter
@Getter
public class Diagnostics {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int d_id;
    private String diagnosis;
    private String remarks;
    public String prescription;


}
