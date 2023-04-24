package com.example.project3.config;

import com.example.project3.entities.Employee;
import com.example.project3.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader  implements ApplicationRunner {
    @Autowired
    private EmployeeRepo employeeRepo;
    public void run(ApplicationArguments args) {
        employeeRepo.save(new Employee(1, "default","default@gmail.com" ,"$2a$10$n.cEy1x7jSEW7aw2PcfRWev6I8Iry6p6GOcp8CPr7XzofII4gB7z2", "default","+91 123456789",'M',"Admin" ));
    }
}
