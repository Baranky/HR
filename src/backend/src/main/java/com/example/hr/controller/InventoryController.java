package com.example.hr.controller;

import com.example.hr.dto.requests.InventoryReq;
import com.example.hr.dto.responses.InventoryRes;
import com.example.hr.enums.Types;
import com.example.hr.services.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {
        private InventoryService inventoryService;

        public InventoryController(InventoryService inventoryService){
            this.inventoryService=inventoryService;

        }

        //envanter kaydetme
        @PostMapping()
        public ResponseEntity<InventoryRes> saveInventory(@RequestBody InventoryReq inventoryReq){
            return new  ResponseEntity<>(inventoryService.createInventory(inventoryReq), HttpStatus.CREATED);
        }

        //tipine gore arama
        @GetMapping("/1/{type}")
        public ResponseEntity<List<InventoryRes>> findByType(@PathVariable Types type) {
            List<InventoryRes> inventories = inventoryService.findByType(type);
            return inventories.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(inventories);
        }

        //tum envanterleri listeleme
        @GetMapping()
        public ResponseEntity<List<InventoryRes>> getAllInventory() {
            return new ResponseEntity<>(inventoryService.getAllInventory(), HttpStatus.OK);
        }

        //id gore sorgulama
        @GetMapping("{id}")
        public InventoryRes getInventoryById(@PathVariable Long id) throws Exception {
            return  inventoryService.getInventoryById(id);
        }

        //silme
        @DeleteMapping("{id}")
        public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
            inventoryService.deleteInventory(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        //update
        @PutMapping("{id}")
        public ResponseEntity<InventoryRes> updateInventory(@PathVariable Long id,@RequestBody InventoryReq inventoryReq) throws Exception {
            return new ResponseEntity<>(inventoryService.updateInventory(id,inventoryReq),HttpStatus.OK);
        }


}
