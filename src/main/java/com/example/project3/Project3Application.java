package com.example.project3;

import com.example.project3.Config.TwilioConfig;
import com.example.project3.Repo.EmployeeRepo;
import com.twilio.Twilio;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Project3Application {
    @Autowired
    private TwilioConfig twilioConfig;
    @Autowired
    private EmployeeRepo employeeRepo;

    @PostConstruct
    public void initTwilio(){

        Twilio.init(twilioConfig.getAccountSid(),twilioConfig.getAuthToken());
    }
    public static void main(String[] args) {

        SpringApplication.run(Project3Application.class, args);

    }

}
