package com.example.project3.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class DoctorDto extends EmployeeDto{

    String license_number;
    String specilization;

}
