package com.example.hr.dto.responses;

import com.example.hr.enums.Gender;
import com.example.hr.enums.GraduationStatus;
import com.example.hr.enums.Tasks;
import com.example.hr.enums.Units;

import java.time.LocalDateTime;
import java.util.Date;


public record EmployeeRes(
        String name,
        Long id,
        String surname,
        Gender gender,
        Date dateBirth,
        String maritalStatus,
        Long TCKN,
        Boolean isActive,
        Tasks task,
        GraduationStatus graduationStatus,
        LocalDateTime terminationDate,
        Units units,
        String profilePhoto
){


}
