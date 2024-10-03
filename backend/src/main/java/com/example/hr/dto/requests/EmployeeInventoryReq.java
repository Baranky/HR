package com.example.hr.dto.requests;

import com.example.hr.entity.Employee;
import com.example.hr.entity.Inventory;
import jakarta.validation.constraints.NotNull;


import java.time.LocalDate;

public record EmployeeInventoryReq(
        @NotNull(message = "dateGiven cannot be blank")LocalDate dateGiven,
        @NotNull(message = "receiverEmployee cannot be blank")Long receiverEmployeeId,
        @NotNull(message = "delivererEmployee cannot be blank")Long delivererEmployeeId,
        @NotNull(message = "inventory cannot be blank")Long inventoryId) {
}
