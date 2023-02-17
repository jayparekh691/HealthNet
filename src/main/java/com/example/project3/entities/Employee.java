package com.example.project3.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int e_id;
    String name;
    Date DOB;
    String email;
    String password;
    String mobile_number;
    char gender;
    String address;
    String qualification;
    String emp_type;
    String photo;
    String license_number;
    String specialization;

    @ManyToOne
    @JoinColumn(name = "hid", nullable = false)
    @JsonIgnore
    private Hospital hospital;
    // F.K Hospital id

    public int getHospital_id(){
        return this.hospital.getH_id();
    }
    public void setHospital_id(int id){
        this.hospital.setH_id(id);
    }

}
