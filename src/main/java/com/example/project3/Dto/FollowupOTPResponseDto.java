package com.example.project3.Dto;

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
