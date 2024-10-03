package com.example.hr.dto.responses;

import com.example.hr.enums.Tasks;
import com.example.hr.enums.Units;



public record FilterEmployeeRes(
        Long id,
        String name,
        String surname,
        Tasks task,
        Units units){
}
