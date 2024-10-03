package com.example.hr.repositories;

import com.example.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EmployeeRepository  extends JpaRepository<Employee,Integer> {
    @Query("SELECT e FROM Employee e WHERE (:TCKN IS NULL OR e.TCKN = :TCKN) AND (:name IS NULL OR e.name LIKE %:name%)")
    List<Employee> searchByTcAndName(@Param("TCKN") Long TCKN, @Param("name") String name);
    }

