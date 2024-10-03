package com.example.hr.dto.responses;

import java.time.LocalDate;

public record EmployeeInventoryRes(
        Long id,
        LocalDate dateGiven,
        Long employeeId,
        Long userId,
        Long inventoryId) {
}
