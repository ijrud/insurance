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
    private long id;

    @Column
    @NotNull(message="{NotNull.Insurance.firstName}")
    private String firstName;
    
    @Column
    @NotNull(message="{NotNull.Insurance.lastName}")
    private String lastName;
    
    @Column
    @NotNull(message="{NotNull.Insurance.email}")
    private String email;

}