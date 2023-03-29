package com.example.project3.controller;

import com.example.project3.dto.FollowupOTPDto;
import com.example.project3.dto.FollowupOTPResponseDto;
import com.example.project3.services.TwilioOTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/router")
public class TwilioOTPHandler {
    @Autowired
    private TwilioOTPService twilioOTPService;

//    @PostMapping("/sendOTP")
//    public ResponseEntity<FollowupOTPResponseDto> sendOTP(@RequestBody FollowupOTPDto followupOTPDto){
//        FollowupOTPResponseDto passwordResetResponesDto =  this.twilioOTPService.sendOTPForPasswordReset(followupOTPDto);
//        return RpasswordResetResponesDto;
//    }
}
