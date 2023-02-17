package com.example.project3.payloads;

import com.example.project3.entities.Tablet;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

import java.util.List;

public class DiagnosticsDto {
    private int d_id;
    private String diagnosis;
    private String remarks;

    @OneToMany(fetch = FetchType.EAGER)
    List<TabletDto> prescription;
}
