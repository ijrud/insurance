package com.insurances.insurance.mock.subsystem;

public class SubSystem {

	public String createClient(String firstName, String lastName, String email, String personalId) {
		return "123";
	}

	public String createAgreement(String clientId, String licencePlate, String Bonus) {
		return "456";
	}
	
	public String setAgreementStatus(String agreementId, String agreementStatus) {
		return agreementStatus;
	}

}
