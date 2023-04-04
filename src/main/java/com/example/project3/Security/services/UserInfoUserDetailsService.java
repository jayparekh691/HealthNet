package com.example.project3.Security.services;

import com.example.project3.entities.Employee;
import com.example.project3.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {
    @Autowired
    private EmployeeRepo repo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Employee> userInfo=repo.findByEmail(username);
        System.out.println("HELLO               ");
        return userInfo.map(EmployeeToUserDetails::new).orElseThrow(()->new UsernameNotFoundException("User Not Found!!"+username));
    }
}
