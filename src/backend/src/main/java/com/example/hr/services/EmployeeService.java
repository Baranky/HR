package com.example.hr.services;

import com.example.hr.dto.requests.EmployeeReq;
import com.example.hr.dto.responses.EmployeeRes;
import com.example.hr.dto.responses.FilterEmployeeRes;
import com.example.hr.entity.Employee;
import com.example.hr.entity.Inventory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public interface EmployeeService {
    List<EmployeeRes> getAllEmployee();
    EmployeeRes createEmployee(EmployeeReq request) ;
    //EmployeeRes createEmployee(EmployeeReq request,MultipartFile file);
    void deleteEmployee(Long EmployeId);
    EmployeeRes getEmployeeById(Long EmployeId) throws Exception;
    List<EmployeeRes> searchEmployee(Long TCKN, String name);
    Employee getById(Long id);
    EmployeeRes updateEmployee(Long id, EmployeeReq employeeReq) throws Exception;
    //String saveProfilePhoto(MultipartFile profilePhoto);
}