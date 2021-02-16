package com.insurances.insurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurances.insurance.entity.Insurance;
import com.insurances.insurance.links.InsuranceLinks;
import com.insurances.insurance.service.InsurancesService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class InsurancesController {
	
	@Autowired
	InsurancesService insurancesService;
	
	@GetMapping(path = InsuranceLinks.LIST_INSURANCES)
    public ResponseEntity<?> listInsurances() {
        //log.info("InsurancesController:  list insurances");
        List<Insurance> resource = insurancesService.getInsurances();
        return ResponseEntity.ok(resource);
    }
	
	@PostMapping(path = InsuranceLinks.ADD_INSURANCES)
	public ResponseEntity<?> saveInsurance(@RequestBody Insurance insurance) {
        //log.info("InsurancesController:  list insurances");
        Insurance resource = insurancesService.saveInsurance(insurance);
        return ResponseEntity.ok(resource);
    }
}