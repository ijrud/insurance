package com.insurances.insurance.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.insurances.insurance.entity.Insurance;
import com.insurances.insurance.repository.InsurancesRepository;

@Component
public class InsurancesService {
	
	private InsurancesRepository insurancesRepository;

  public InsurancesService(InsurancesRepository insurancesRepository) {
      this.insurancesRepository = insurancesRepository;
  }

  public List<Insurance> getInsurances() {
      return insurancesRepository.findAll();
  }
  
  public Insurance saveInsurance (Insurance insurances) {
  	return insurancesRepository.save(insurances);
  }

}