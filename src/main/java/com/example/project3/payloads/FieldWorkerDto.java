package com.example.project3.payloads;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class FieldWorkerDto extends EmployeeDto{
    String license_number;
}
