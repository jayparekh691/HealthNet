package com.example.project3.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import java.util.Date;

@Data
@Getter
@Setter
public class ReceiveVistDataModel {
    private int v_id;
    private String bp;
    private String sugar_level;
    private String temperature;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String photo;
    private String bloodoxygen;
    private boolean isVisited;
    private int f_id;
    private Date date;
    public boolean getIsVisited(){
        return this.isVisited;
    }
}
