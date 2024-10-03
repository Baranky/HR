package com.example.hr.dto.responses;

import com.example.hr.enums.Types;

public record ReceiverEmployeeRes(
        Long id,
        Types type,
        String brand,
        String model) {
}
