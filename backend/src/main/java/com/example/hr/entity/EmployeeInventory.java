package com.example.hr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "EmployeeInventory")
public class EmployeeInventory extends BaseEntity {

    @Column(name = "date_given")
    private LocalDate dateGiven;

    /*@Column(name = "date_return")
    private LocalDate dateReturn;


     */

    @ManyToOne
    @JoinColumn(name = "receiver_employee_id")
    private Employee receiverEmployee;

    @ManyToOne
    @JoinColumn(name = "deliverer_employee_id")
    private Employee delivererEmployee;

    @OneToOne
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;
}

