package com.example.hr.dto.requests;

import com.example.hr.enums.InventoryStatus;
import com.example.hr.enums.Types;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record InventoryReq(
        @NotNull(message = "type cannot be blank")Types type,
        @NotBlank(message = "brand cannot be blank")String brand,
        @NotBlank(message = "model cannot be blank")String model,
        @NotNull(message = "status cannot be blank")InventoryStatus status,
        @NotNull(message = "isIdle cannot be blank")Boolean isIdle){
}
