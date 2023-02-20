package com.example.project3.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int a_id;
    private Date curr_date;
    private boolean isTreated;
    @OneToOne
    private Patient patient;
    @OneToOne
    private Employee doctor;
    @OneToOne
    private Diagnostics diagnostics;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Followup> followup;

}
