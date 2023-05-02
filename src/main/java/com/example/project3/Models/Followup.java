package com.example.project3.Models;

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
public class Followup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int f_id;
    @OneToOne(fetch = FetchType.EAGER)
    private FollowupInstructions instructions;
    private String remarks;
    private int gap;
    private int visitCount;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Visit> visitList;

}
