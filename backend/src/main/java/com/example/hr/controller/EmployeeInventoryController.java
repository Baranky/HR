package com.example.hr.controller;

import com.example.hr.dto.requests.EmployeeInventoryReq;
import com.example.hr.dto.responses.EmployeeInventoryRes;
import com.example.hr.dto.responses.IdleInventoryRes;
import com.example.hr.dto.responses.ReceiverEmployeeRes;
import com.example.hr.services.EmployeeInventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employeeInventories")
public class EmployeeInventoryController {
    private EmployeeInventoryService employeeInventoryService;

    public EmployeeInventoryController(EmployeeInventoryService employeeInventoryService) {
        this.employeeInventoryService = employeeInventoryService;

    }

    //kaydetme-zimmet ekleme
    @PostMapping()
    public ResponseEntity<EmployeeInventoryRes> saveEmployeeInventory(@RequestBody EmployeeInventoryReq employeeInventoryReq) throws Exception {
        return new  ResponseEntity<>(employeeInventoryService.createEmployeeInventory(employeeInventoryReq), HttpStatus.CREATED);
    }


    //silme-zimmeti geri alma islemi
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEmployeeInventory(@PathVariable Long id) {
        employeeInventoryService.returnInventory(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //personelde olan envanterler
    @GetMapping("/by-employee/{receiverEmployee}")
    public List<IdleInventoryRes> getInventoriesByEmployeeId(@PathVariable Long receiverEmployee) {
        return employeeInventoryService.getInventoryByEmployeeId(receiverEmployee);
    }

    //bosta olan envanterler
    @GetMapping("/available")
    public ResponseEntity<List<IdleInventoryRes>> getAvailableInventories() {
        List<IdleInventoryRes> availableInventories = employeeInventoryService.getAvailableInventories();
        return new ResponseEntity<>(availableInventories, HttpStatus.OK);
    }

}
