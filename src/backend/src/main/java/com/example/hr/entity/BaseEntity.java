package com.example.hr.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseEntity {


    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
}
