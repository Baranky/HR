package com.example.hr.entity;
import com.example.hr.enums.InventoryStatus;
import com.example.hr.enums.Types;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="inventory")
public class Inventory extends BaseEntity {

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private Types type;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private InventoryStatus status;

    @Setter
    @Getter
    @Column(name = "is_idle")
    private  Boolean isIdle;

    @OneToMany(mappedBy = "inventoryId")
    private List<InventoryHistory> inventoryHistory;

    @OneToOne(mappedBy = "inventory")
    private EmployeeInventory employeeInventory;



}