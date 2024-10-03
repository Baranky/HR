package com.example.hr.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "InventoryHistory")
public class InventoryHistory  extends BaseEntity{


        @Column(name = "date_given")
        private LocalDate dateGiven;

        @Column(name = "date_return")
        private Date dateReturn;

        @ManyToOne
        @JoinColumn(name = "receiver_employee_id")
        private Employee receiverEmployeeId;

        @ManyToOne
        @JoinColumn(name = "deliverer_employee_id")
        private Employee delivererEmployeeId;

        @ManyToOne
        @JoinColumn(name = "inventoryId")
        private Inventory inventoryId;
    }


