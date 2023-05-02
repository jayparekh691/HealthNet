package com.example.project3.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;

@Service
public class EmailUtils {

    @Autowired
    private JavaMailSender emailSender;

    public void SendSimpleMessage(String to, String subject, String text){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("jayparekh98765@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
    public void forgotMail(String to,String subject,String password) throws MessagingException{
        SimpleMailMessage helper = new SimpleMailMessage();
        helper.setFrom("jayparekh98765@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        String htmlMsg = "Your new Password is "+password;
        helper.setText(htmlMsg);
        emailSender.send(helper);
    }
}
