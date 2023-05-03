package com.example.project3.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class ReceiveVisitDataModel {
    private int v_id;
    private String bloodPressure;
    private String sugarLevel;
    private String temperature;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo;
    private String spo2Level;
    private boolean isVisited;
    private int f_id;
    private Date date;
}
