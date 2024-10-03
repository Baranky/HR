package com.example.hr.services;

import com.example.hr.dto.requests.InventoryReq;
import com.example.hr.dto.responses.InventoryRes;
import com.example.hr.entity.Inventory;
import com.example.hr.enums.Types;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface InventoryService {
    List<InventoryRes> getAllInventory();
    InventoryRes createInventory(InventoryReq request) ;
    void deleteInventory(Long InventoryId);
    InventoryRes getInventoryById(Long InventoryId) throws Exception;
    Inventory getById(Long id);
    InventoryRes updateInventory(Long InventoryId, InventoryReq inventoryReq) throws Exception;
    List<InventoryRes> findByType(Types type);
}
