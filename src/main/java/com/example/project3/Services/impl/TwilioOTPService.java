package com.example.project3.Services.impl;

import com.example.project3.Config.TwilioConfig;
import com.example.project3.Dto.OtpStatus;
import com.example.project3.Dto.FollowupOTPDto;
import com.example.project3.Dto.FollowupOTPResponseDto;
import com.example.project3.Repo.VisitRepo;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.Random;

@Service
public class TwilioOTPService {
    @Autowired
    private TwilioConfig twilioConfig;
    @Autowired
    private VisitRepo visitRepo;

    public FollowupOTPResponseDto sendOTPForPasswordReset(FollowupOTPDto followupOTPDto, Integer x, Integer id, String date) {

        FollowupOTPResponseDto followupOTPResponseDto = null;
        try {
            PhoneNumber to = new PhoneNumber(followupOTPDto.getPhonenumber());
            PhoneNumber from = new PhoneNumber(twilioConfig.getTrialNumber());
            String otp = generateOTP();
            String otpMessage = "Dear Customer, your OTP for Appointment No. "+id+" and Visit No. "+x+" is ## " + otp + " ##. For follow up on date "+date+".";
            Message message = Message
                    .creator(to, from,
                            otpMessage)
                    .create();
            followupOTPResponseDto = new FollowupOTPResponseDto(OtpStatus.DELIVERED, otpMessage, otp);

        }
        catch (Exception ex) {
            followupOTPResponseDto = new FollowupOTPResponseDto(OtpStatus.FAILED, ex.getMessage(),"000000");
        }
        return (followupOTPResponseDto);
    }


    //4 digit otp
    private String generateOTP() {
        return new DecimalFormat("0000")
                .format(new Random().nextInt(9999));
    }

}
