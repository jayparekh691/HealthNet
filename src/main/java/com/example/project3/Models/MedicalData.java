package com.example.project3.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class MedicalData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int m_id;

    private String bloodPressure;
    private String sugarLevel;
    private String temperature;
    private String spo2Level;
    @Lob
    @Column(columnDefinition ="LONGTEXT")
    private String photo;



}
