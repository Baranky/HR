package com.example.hr.repositories;

import com.example.hr.entity.EmployeeInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeInventoryRepository extends JpaRepository<EmployeeInventory,Integer> {
    List<EmployeeInventory> findByReceiverEmployeeId(Long employeeId);

}
