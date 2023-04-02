package com.example.project3.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class ReceiveVistDataModel {
    private int v_id;
    private String bp;
    private String sugar_level;
    private String temperature;
    private String photo;
    private String video;
    private boolean isVisited;
    private int f_id;
    private Date date;
    public boolean getIsVisited(){
        return this.isVisited;
    }
}
