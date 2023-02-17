package com.example.project3.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Bean;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class Doctor extends Employee {
    
}
