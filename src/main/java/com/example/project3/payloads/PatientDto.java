package com.example.project3.payloads;

import com.example.project3.entities.Appointment;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class PatientDto {
    private int p_id;

    private String name;
    private int age;
    private String mobile_number;
    private char gender;
    private String address;
    private String town;
    private String city;
    private String state;
    private int pincode;

    @OneToMany(fetch = FetchType.EAGER)
    List<AppointmentDto> appointmentsdto;
}
