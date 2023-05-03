package com.example.project3.Repo;

import com.example.project3.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
    Employee findEmployeeByEmailAndPassword(String email,String password);
    List<Employee> findEmployeeByRoles(String role);
    List<Employee> findEmployeeByNameContaining(String name);
    void deleteById(Integer id);

    Optional<Employee> findByEmail(String email);
    Employee findEmployeeByEmail(String s);
    @Query(value = "select * from employee where email=?1 and deleted is TRUE ",nativeQuery = true)
    Employee findEmployeeByEmailAndDeletedIsTrue(String s);
}
