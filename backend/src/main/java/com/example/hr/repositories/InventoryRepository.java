package com.example.hr.repositories;

import com.example.hr.dto.responses.InventoryRes;
import com.example.hr.entity.Inventory;
import com.example.hr.enums.Types;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository  extends JpaRepository<Inventory,Integer> {
    List<InventoryRes> findByType(Types type);

  @Query("SELECT i FROM Inventory i WHERE i.id NOT IN (SELECT e.inventory.id FROM EmployeeInventory e)")
  //@Query("SELECT i FROM Inventory i WHERE i.status != 'ON_STAFF'")
    List<Inventory> findAvailableInventories();
}
