package com.example.project3.payloads;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class SuperAdminDto {
    private int s_id;

    private String email;

    private String password;
}
