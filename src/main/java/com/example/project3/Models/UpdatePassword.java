package com.example.project3.Models;

import lombok.Data;

@Data
public class UpdatePassword {
    private String old_pass;
    private String new_pass;
}
