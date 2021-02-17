package com.insurances.insurance.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


import lombok.Data;

@Entity
@Data
public class Insurance {
	
	@Id
	@Column
    public long id;

    @Column
    @NotNull(message="{NotNull.Insurance.firstName}")
    public String firstName;
    
    @Column
    @NotNull(message="{NotNull.Insurance.lastName}")
    public String lastName;
    
    @Column
    @NotNull(message="{NotNull.Insurance.email}")
    public String email;

    @Column
    @NotNull(message="{NotNull.Insurance.bonus}")
    public String bonus;
    
    @Column
    @NotNull(message="{NotNull.Insurance.personalId}")
    public String personalId;
    
    @Column
    @NotNull(message="{NotNull.Insurance.licencePlate}")
    public String licencePlate;
    
}