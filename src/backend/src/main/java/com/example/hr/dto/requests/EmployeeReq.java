package com.example.hr.dto.requests;

import com.example.hr.enums.Gender;
import com.example.hr.enums.GraduationStatus;
import com.example.hr.enums.Tasks;
import com.example.hr.enums.Units;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Date;

public record EmployeeReq(
        @NotBlank(message = "name cannot be blank")String name,
        @NotBlank(message = "surname cannot be blank")String surname,
        @NotNull(message = "Gender cannot be blank")Gender gender,
        @NotNull(message = "dateBirth cannot be blank")Date dateBirth,
        @NotBlank(message = "maritalStatus cannot be blank")String maritalStatus,
        @NotNull(message = "TCKN cannot be blank")Long TCKN,
        @NotNull(message = "isActive cannot be blank")Boolean isActive,
        @NotNull(message = "task cannot be blank")Tasks task,
        @NotNull(message = "graduationStatus cannot be blank")GraduationStatus graduationStatus,
        @NotNull(message = "unit cannot be blank") Units units,
        @NotNull(message = "terminationDate cannot be blank")LocalDateTime terminationDate,
        @NotBlank(message = "profilePhoto cannot be blank")String profilePhoto){



}
