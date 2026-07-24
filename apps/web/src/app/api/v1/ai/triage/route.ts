import { NextRequest, NextResponse } from "next/server";
import { SymptomCheckResult } from "@/types";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { symptoms } = await req.json();
    const inputSymptoms: string[] = symptoms || [];
    const textQuery = inputSymptoms.join(" ").toLowerCase();

    let triageResult: SymptomCheckResult;

    if (
      textQuery.includes("chest pain") ||
      textQuery.includes("heart attack") ||
      textQuery.includes("stroke") ||
      textQuery.includes("cannot breathe") ||
      textQuery.includes("unconscious")
    ) {
      triageResult = {
        triageLevel: "EMERGENCY",
        possibleConditions: [
          {
            name: "Acute Coronary Syndrome / Ischemia",
            probability: "88%",
            description: "Critical impairment of myocardial perfusion requiring immediate 911 dispatch.",
          },
          {
            name: "Acute Pulmonary Embolism",
            probability: "72%",
            description: "Occlusion of pulmonary artery vasculature causing severe respiratory distress.",
          },
        ],
        recommendedSpecialties: ["Emergency & Trauma", "Cardiology"],
        urgentAdvice: "CRITICAL: Trigger Emergency SOS immediately or call 911. Do not drive yourself.",
      };
    } else if (
      textQuery.includes("fever") ||
      textQuery.includes("cough") ||
      textQuery.includes("fracture") ||
      textQuery.includes("abdominal pain") ||
      textQuery.includes("migraine")
    ) {
      triageResult = {
        triageLevel: "URGENT",
        possibleConditions: [
          {
            name: "Acute Viral Upper Respiratory Infection",
            probability: "81%",
            description: "Inflammation of bronchial airways accompanied by systemic febrile response.",
          },
          {
            name: "Gastroenteritis / Acute Abdominal Distress",
            probability: "65%",
            description: "Mucosal inflammation requiring clinical evaluation and hydration monitoring.",
          },
        ],
        recommendedSpecialties: ["General Medicine", "Pediatrics", "Gastroenterology"],
        urgentAdvice: "Book a same-day urgent consultation with a doctor or visit an urgent care center.",
      };
    } else {
      triageResult = {
        triageLevel: "NON_URGENT",
        possibleConditions: [
          {
            name: "General Physical Fatigue / Stress Syndrome",
            probability: "70%",
            description: "Mild physiological fatigue. Rest and hydration recommended.",
          },
        ],
        recommendedSpecialties: ["General Physician", "Preventive Care"],
        urgentAdvice: "Schedule a routine consultation and maintain adequate fluid intake.",
      };
    }

    return NextResponse.json({
      success: true,
      data: triageResult,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "AI Symptom Triage failed" },
      { status: 400 }
    );
  }
}
