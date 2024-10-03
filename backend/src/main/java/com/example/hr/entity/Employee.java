package com.example.hr.entity;

import com.example.hr.enums.*;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employee")
public class Employee  extends BaseEntity{

    @Column(name ="name")
    private String name;

    @Column(name ="surname")
    private String surname;


    @Column(name ="gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;


    @Column(name ="date_Birth")
    private Date dateBirth;


    @Column(name ="marital_Status")
    private String maritalStatus;

    @Column(unique = true,name ="TCKN" )
    private Long TCKN;

    @Column(name ="is_Active")
    private Boolean isActive;

    @Column(name ="task")
    @Enumerated(EnumType.STRING)
    private Tasks task;

    @Column(name ="graduation_Status")
    @Enumerated(EnumType.STRING)
    private GraduationStatus graduationStatus;

    @Column(name ="profile_Photo")
    private String profilePhoto;

    @Column(name ="unit")
    @Enumerated(EnumType.STRING)
    private Units units;

    @Column(name ="termination_date")
    private LocalDateTime terminationDate;

    @OneToMany(mappedBy = "receiverEmployee")
    private List<EmployeeInventory> receiverEmployee;

    @OneToMany(mappedBy = "delivererEmployee")
    private List<EmployeeInventory> employeeInventory;

    @OneToMany(mappedBy = "receiverEmployeeId")
    private List<InventoryHistory> receiverEmployeeId;

    @OneToMany(mappedBy = "delivererEmployeeId")
    private List<InventoryHistory> delivererEmployeeId;


}
