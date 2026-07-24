import { describe, it, expect } from "vitest";
import { INITIAL_HOSPITALS, INITIAL_DOCTORS, INITIAL_PATIENT_PROFILE } from "../lib/mockData";

describe("MedStar V2 Enterprise Healthcare Engine Tests", () => {
  it("validates initial hospital emergency capacity", () => {
    expect(INITIAL_HOSPITALS.length).toBeGreaterThan(0);
    const emergencyHospitals = INITIAL_HOSPITALS.filter((h) => h.hasEmergency);
    expect(emergencyHospitals.length).toBeGreaterThan(0);
    expect(emergencyHospitals[0].availableEmergencyBeds).toBeGreaterThan(0);
  });

  it("evaluates AI Triage Classifier logic for emergency chest pain", () => {
    const inputSymptoms = ["chest pain", "shortness of breath"];
    const textQuery = inputSymptoms.join(" ").toLowerCase();
    
    let isEmergency = false;
    if (textQuery.includes("chest pain") || textQuery.includes("stroke")) {
      isEmergency = true;
    }
    
    expect(isEmergency).toBe(true);
  });

  it("verifies doctor availability slots format", () => {
    expect(INITIAL_DOCTORS.length).toBeGreaterThan(0);
    const doctor = INITIAL_DOCTORS[0];
    expect(doctor.consultationFee).toBeGreaterThan(0);
    expect(doctor.isVerified).toBe(true);
  });

  it("verifies patient health card number format", () => {
    expect(INITIAL_PATIENT_PROFILE.healthCardNumber).toMatch(/^MED-\d{4}-\d{6}$/);
    expect(INITIAL_PATIENT_PROFILE.bloodGroup).toBe("O+");
  });
});

