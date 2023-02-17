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
public class Tablet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int t_id;

    private String name;

    @OneToMany(fetch = FetchType.EAGER)
    List<Dose> doses;
}
