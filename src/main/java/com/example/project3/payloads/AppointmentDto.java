package com.example.project3.payloads;

import com.example.project3.entities.Diagnostics;
import com.example.project3.entities.Doctor;
import com.example.project3.entities.Followup;
import com.example.project3.entities.Patient;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class AppointmentDto {
    private int a_id;
    private Date curr_date;
    private boolean isTreated;
    @OneToOne
    private PatientDto patient;
    @OneToOne
    private DoctorDto doctor;
    @OneToOne
    private DiagnosticsDto diagnostics;
    @OneToMany(fetch = FetchType.EAGER)
    private List<FollowupDto> followup;
}
