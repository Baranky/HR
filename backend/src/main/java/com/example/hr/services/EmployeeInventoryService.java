package com.example.hr.services;

import com.example.hr.dto.requests.EmployeeInventoryReq;
import com.example.hr.dto.responses.*;
import com.example.hr.entity.Employee;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface EmployeeInventoryService {
    EmployeeInventoryRes createEmployeeInventory(EmployeeInventoryReq request) throws Exception;
    List<IdleInventoryRes> getAvailableInventories();
    List<IdleInventoryRes> getInventoryByEmployeeId(Long employeeId) ;
    void returnInventory(Long employeeInventoryId);
}
