package com.insurances.insurance.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurances.insurance.entity.Insurance;
import com.insurances.insurance.links.InsuranceLinks;
import com.insurances.insurance.service.InsurancesService;

import lombok.extern.slf4j.Slf4j;

// MOCK LAYER
import com.insurances.insurance.mock.mailingService.MailingService;
import com.insurances.insurance.mock.subsystem.SubSystem;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/")
public class InsurancesController {

	@Autowired
	InsurancesService insurancesService;
	
	long key = 0;
	
	
	@PostMapping(path = InsuranceLinks.ADD_INSURANCES)
	public ResponseEntity<?> saveInsurance(@RequestBody Insurance insurance) {
		SubSystem subSystem = new SubSystem();
		MailingService mailingService = new MailingService();
		
		String clientId = subSystem.createClient(insurance.firstName, insurance.lastName, insurance.email, insurance.personalId);
		String agreementId = subSystem.createAgreement(clientId, insurance.licencePlate, insurance.bonus);
		String agreementStatus = mailingService.sendAgreement(clientId, agreementId);
		agreementStatus = subSystem.setAgreementStatus(agreementId, agreementStatus);
		
		// For fun, lets keep the DB. (Mocking a key for ID)
		insurance.id = key;
		key += 1;
		
        InsuranceReply reply = new InsuranceReply();

        //MOCK Error every 3rd time
		if (key %3 == 0) {
			reply.agreementStatus = "IKKE SENDT";
		} else {
	        Insurance resource = insurancesService.saveInsurance(insurance);
	        reply.agreementStatus = agreementStatus;
	        reply.agreementId = agreementId;
		}
		
        return ResponseEntity.ok(reply);
    }
}