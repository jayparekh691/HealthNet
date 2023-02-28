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
public class Dose {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int d_id;

}