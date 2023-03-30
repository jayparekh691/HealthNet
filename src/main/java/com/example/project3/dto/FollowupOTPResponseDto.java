package com.example.project3.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FollowupOTPResponseDto {


    private OtpStatus status;
    private String message;
    private String otp;
}
