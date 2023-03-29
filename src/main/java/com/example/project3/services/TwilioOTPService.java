package com.example.project3.services;

import com.example.project3.config.TwilioConfig;
import com.example.project3.dto.OtpStatus;
import com.example.project3.dto.FollowupOTPDto;
import com.example.project3.dto.FollowupOTPResponseDto;
import com.example.project3.entities.Visit;
import com.example.project3.repo.VisitRepo;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.text.DecimalFormat;
import java.util.Random;

@Service
public class TwilioOTPService {
    @Autowired
    private TwilioConfig twilioConfig;
    @Autowired
    private VisitRepo visitRepo;

    public FollowupOTPResponseDto sendOTPForPasswordReset(FollowupOTPDto followupOTPDto,Integer x) {

        FollowupOTPResponseDto followupOTPResponseDto = null;
        try {
            PhoneNumber to = new PhoneNumber(followupOTPDto.getPhonenumber());
            PhoneNumber from = new PhoneNumber(twilioConfig.getTrialNumber());
            String otp = generateOTP();
            String otpMessage = "Dear Customer, your OTP for Visit No. "+x+" is ##" + otp + "##. ";
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


    //6 digit otp
    private String generateOTP() {
        return new DecimalFormat("000000")
                .format(new Random().nextInt(999999));
    }

}
