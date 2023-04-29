package com.example.project3.entities;
import com.example.project3.config.AesEncryptor;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.cfg.annotations.reflection.internal.XMLContext;

import java.util.List;

@Entity
@Table
@NoArgsConstructor
@Getter
@Setter
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Convert(converter = AesEncryptor.class)
    private Integer pid;
//    @Convert(converter = AesEncryptor.class)
    private String name;
    private int age;
//    @Convert(converter = AesEncryptor.class)
    private String mobilenumber;
    private char gender;
//    @Convert(converter = AesEncryptor.class)
    private String address;
//    @Convert(converter = AesEncryptor.class)
    private String town;
//    @Convert(converter = AesEncryptor.class)
    private String city;
//    @Convert(converter = AesEncryptor.class)
    private String state;
    private int pincode;

    @OneToMany(fetch = FetchType.EAGER)
    List<Appointment> appointments;

    @ManyToOne(fetch = FetchType.EAGER)
    private Employee fieldworker;
}
