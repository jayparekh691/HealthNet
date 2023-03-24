package com.example.project3.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int v_id;
    private Date date;

    @OneToOne
    private Followup followup;

    @OneToOne
    private Employee fieldWorker;

    @OneToOne
    private MedicalData medicalData;
}
