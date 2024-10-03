package com.example.hr.services.impl;

import com.example.hr.dto.requests.EmployeeInventoryReq;
import com.example.hr.dto.responses.EmployeeInventoryRes;
import com.example.hr.dto.responses.IdleInventoryRes;
import com.example.hr.entity.Employee;
import com.example.hr.entity.EmployeeInventory;
import com.example.hr.entity.Inventory;
import com.example.hr.entity.InventoryHistory;
import com.example.hr.repositories.EmployeeInventoryRepository;
import com.example.hr.repositories.InventoryHistoryRepository;
import com.example.hr.repositories.InventoryRepository;
import com.example.hr.services.EmployeeInventoryService;
import com.example.hr.services.EmployeeService;
import com.example.hr.services.InventoryService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class EmployeeInventoryServiceImpl implements EmployeeInventoryService {
        private final EmployeeInventoryRepository employeeInventoryRepository;
        private final EmployeeService employeeService;
        private final InventoryService inventoryService;
        private final InventoryRepository inventoryRepository;
        private  InventoryHistoryRepository inventoryHistoryRepository;

    public EmployeeInventoryServiceImpl(EmployeeInventoryRepository employeeInventoryRepository, EmployeeService employeeService, InventoryService inventoryService,InventoryRepository inventoryRepository,InventoryHistoryRepository inventoryHistoryRepository) {
        this.employeeInventoryRepository = employeeInventoryRepository;
        this.employeeService = employeeService;
        this.inventoryService = inventoryService;
        this.inventoryRepository=inventoryRepository;
        this.inventoryHistoryRepository=inventoryHistoryRepository;

    }


    //kaydetme zimmet ekleme
    @Override
    public EmployeeInventoryRes createEmployeeInventory(EmployeeInventoryReq request) throws Exception {
        EmployeeInventory employeeInventory=mapToEmployeeInventory(request);
        EmployeeInventory newEmployeeInventory=employeeInventoryRepository.save(employeeInventory);
        return mapToResponse(newEmployeeInventory);

    }

    //personelde olan envanterler
    @Override
    public List<IdleInventoryRes> getInventoryByEmployeeId(Long employeeId) {
        List<EmployeeInventory> employeeInventoryList = employeeInventoryRepository.findByReceiverEmployeeId(employeeId);
        List<IdleInventoryRes> responseList =new ArrayList<>();
        for(EmployeeInventory employeeInventory:employeeInventoryList){
            responseList.add(mapToReceiver(employeeInventory));
        }
        return responseList;
    }

    //bosta olan envanterleri donen metod
    @Override
    public List<IdleInventoryRes>getAvailableInventories() {
        List<Inventory> availableInventories = inventoryRepository.findAvailableInventories();
        List<IdleInventoryRes> responseList=new ArrayList<>();
        for(Inventory inventory:availableInventories){
            responseList.add(mapToInventoryRes(inventory));
        }
        return responseList;
    }

    //zimmeti geri alma
    @Transactional
    public void returnInventory(Long employeeInventoryId) {
        EmployeeInventory employeeInventory = null;
        try {
            employeeInventory = employeeInventoryRepository.findById(Math.toIntExact(employeeInventoryId))
                    .orElseThrow(() -> new Exception("EmployeeInventory not found"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        // InventoryHistory tablosuna bir kayıt ekliyoruz
        InventoryHistory inventoryHistory = new InventoryHistory();
        inventoryHistory.setInventoryId(employeeInventory.getInventory());
        inventoryHistory.setReceiverEmployeeId(employeeInventory.getReceiverEmployee());
        inventoryHistory.setDelivererEmployeeId(employeeInventory.getDelivererEmployee());
        inventoryHistory.setDateGiven(employeeInventory.getDateGiven());
        inventoryHistory.setDateReturn(new Date());

        inventoryHistoryRepository.save(inventoryHistory);
        employeeInventoryRepository.delete(employeeInventory);
    }

    private IdleInventoryRes mapToInventoryRes(Inventory inventory) {
        return new IdleInventoryRes(
                inventory.getId(),
                inventory.getType(),
                inventory.getBrand(),
                inventory.getModel()

        );
    }

    private EmployeeInventoryRes mapToResponse(EmployeeInventory employeeInventory){
        EmployeeInventoryRes response=new EmployeeInventoryRes(
                employeeInventory.getId(),
                employeeInventory.getDateGiven(),
                employeeInventory.getReceiverEmployee().getId(),
                employeeInventory.getDelivererEmployee().getId(),
                employeeInventory.getInventory().getId()

        );
        return response;
    }


    private EmployeeInventory mapToEmployeeInventory(EmployeeInventoryReq request) throws Exception {
        EmployeeInventory employeeInventory=new EmployeeInventory();
        employeeInventory.setDateGiven(request.dateGiven());

        Inventory inventory=inventoryService.getById(request.inventoryId());
        employeeInventory.setInventory(inventory);

        Employee employee=employeeService.getById(request.delivererEmployeeId());
        employeeInventory.setReceiverEmployee(employee);

        Employee employee1=employeeService.getById(request.delivererEmployeeId());
        employeeInventory.setDelivererEmployee(employee);

        return employeeInventory;
    }

    private IdleInventoryRes mapToReceiver(EmployeeInventory employeeInventory) {
        IdleInventoryRes response = new IdleInventoryRes(
                employeeInventory.getId(),
                employeeInventory.getInventory().getType(),
                employeeInventory.getInventory().getBrand(),
                employeeInventory.getInventory().getModel()
        );
        return response;

    }

}

