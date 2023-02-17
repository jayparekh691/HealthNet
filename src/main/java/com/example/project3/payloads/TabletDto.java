package com.example.project3.payloads;

import com.example.project3.entities.Dose;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

public class TabletDto {
    private int t_id;

    private String name;

    @OneToMany(fetch = FetchType.EAGER)
    List<DoseDto> doses;
}
