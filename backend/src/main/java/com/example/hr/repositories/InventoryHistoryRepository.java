package com.example.hr.repositories;

import com.example.hr.entity.InventoryHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryHistoryRepository extends JpaRepository<InventoryHistory,Integer> {
}
