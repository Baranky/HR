package com.example.hr.services.impl;


import com.example.hr.dto.requests.InventoryReq;
import com.example.hr.dto.responses.InventoryRes;
import com.example.hr.entity.Inventory;
import com.example.hr.enums.Types;
import com.example.hr.repositories.InventoryRepository;
import com.example.hr.services.InventoryService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventoryServiceImpl  implements InventoryService {
    InventoryRepository inventoryRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    //listeleme
    @Override
    public List<InventoryRes> getAllInventory(){
        List<Inventory> inventoryList=inventoryRepository.findAll();
        List<InventoryRes> responseList=new ArrayList<>();
        for(Inventory inventory:inventoryList){
            responseList.add(mapToResponse(inventory));
        }
        return responseList;
    }

    //kaydetme
    @Override
    public InventoryRes createInventory(InventoryReq request) {
        Inventory inventory=mapToInventory(request);
        Inventory newInventory=inventoryRepository.save(inventory);
        return mapToResponse(newInventory);
    }

    //silme
    @Override
    public void deleteInventory(Long inventoryId) {
            inventoryRepository.deleteById(Math.toIntExact(inventoryId));

    }

    //id gore arama
    @Override
    public InventoryRes getInventoryById(Long inventoryId) throws Exception {
        Inventory inventory=inventoryRepository.findById(Math.toIntExact(inventoryId)).orElseThrow(()->
            new Exception("User not found id:"+inventoryId));
        InventoryRes inventoryRes =mapToResponse(inventory);
        return inventoryRes;

    }

    //zimmet işlemi icin arama
    @Override
    public Inventory getById(Long id) {
            return inventoryRepository.getReferenceById(Math.toIntExact(id));
    }

    //gunceleme
    @Override
    public InventoryRes updateInventory(Long id, InventoryReq inventoryReq) throws Exception {
        Inventory existingInventory = inventoryRepository.findById(Math.toIntExact(id)).orElseThrow(() ->
                new Exception("Employee not found with id: " + id));
        // Mevcut envanter   güncelleme
        Inventory updatedInventory = mapToInventory(inventoryReq);
        updatedInventory.setId(existingInventory.getId()); // Mevcut ID'yi koruyoruz
        Inventory savedInventory = inventoryRepository.save(updatedInventory);
        return mapToResponse(savedInventory);
    }

    //tipe gore arama
    @Override
    public List<InventoryRes> findByType(Types type) {
        return inventoryRepository.findByType(type);
    }


    private InventoryRes mapToResponse(Inventory inventory){
        InventoryRes response=new InventoryRes(
                inventory.getId(),
                inventory.getType(),
                inventory.getBrand(),
                inventory.getModel(),
                inventory.getStatus(),
                inventory.getIsIdle()

        );
        return response;
    }

    private Inventory mapToInventory(InventoryReq request){
        Inventory inventory=new Inventory();
        inventory.setType(request.type());
        inventory.setBrand(request.brand());
        inventory.setModel(request.model());
        inventory.setStatus(request.status());
        inventory.setIsIdle(request.isIdle());

        return inventory;
    }
}
