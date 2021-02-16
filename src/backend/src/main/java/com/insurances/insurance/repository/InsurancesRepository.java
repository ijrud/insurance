package com.insurances.insurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.insurances.insurance.entity.Insurance;

@RepositoryRestResource()
public interface InsurancesRepository extends JpaRepository<Insurance, Integer>, JpaSpecificationExecutor<Insurance>, QuerydslPredicateExecutor<Insurance> {}