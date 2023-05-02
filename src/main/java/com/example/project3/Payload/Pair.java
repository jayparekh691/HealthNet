package com.example.project3.Payload;

import com.example.project3.Models.Patient;
import com.example.project3.Models.Visit;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pair {
    private Patient patient;
    private List<Visit> visit;
}
