package com.example.project3;

import com.example.project3.entities.Hospital;
import com.example.project3.entities.SuperAdmin;
import com.example.project3.repo.HospitalRepo;
import com.example.project3.repo.SuperAdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Project3Application {
    public static void main(String[] args) {

        SpringApplication.run(Project3Application.class, args);

    }

}
