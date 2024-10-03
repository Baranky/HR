package com.example.hr.dto.responses;

import com.example.hr.enums.InventoryStatus;
import com.example.hr.enums.Types;

public record InventoryRes(
        Long id,
        Types type,
        String brand,
        String model,
        InventoryStatus status,
        Boolean isIdle){

}
