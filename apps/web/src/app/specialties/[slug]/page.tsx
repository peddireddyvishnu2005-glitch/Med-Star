"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { INITIAL_DEPARTMENTS, INITIAL_HOSPITALS, INITIAL_DOCTORS } from "@/lib/mockData";
import HospitalCard from "@/components/hospital/HospitalCard";
import {
  AlertTriangle,
  HeartPulse,
  Baby,
  Brain,
  Activity,
  ShieldAlert,
  Building2,
  PhoneCall,
  Bed,
  Stethoscope,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export default function SpecialtyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const department = useMemo(() => {
    return (
      INITIAL_DEPARTMENTS.find((d) => d.slug === slug || d.id === slug) ||
      INITIAL_DEPARTMENTS[0]
    );
  }, [slug]);

  const matchingHospitals = useMemo(() => {
    return INITIAL_HOSPITALS.filter((hosp) =>
      hosp.departments.some(
        (dept) =>
          dept.toLowerCase().includes(department.name.toLowerCase()) ||
          department.name.toLowerCase().includes(dept.toLowerCase())
      )
    );
  }, [department]);

  const matchingDoctors = useMemo(() => {
    return INITIAL_DOCTORS.filter(
      (doc) =>
        doc.department.toLowerCase().includes(department.name.toLowerCase()) ||
        department.name.toLowerCase().includes(doc.department.toLowerCase())
    );
  }, [department]);

  const totalBeds = useMemo(() => {
    return matchingHospitals.reduce(
      (acc, h) => acc + h.availableEmergencyBeds,
      0
    );
  }, [matchingHospitals]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "AlertTriangle":
        return <AlertTriangle className="w-8 h-8 text-amber-400" />;
      case "HeartPulse":
        return <HeartPulse className="w-8 h-8 text-red-400" />;
      case "Baby":
        return <Baby className="w-8 h-8 text-pink-400" />;
      case "Brain":
        return <Brain className="w-8 h-8 text-purple-400" />;
      case "Activity":
        return <Activity className="w-8 h-8 text-emerald-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-8 h-8 text-cyan-400" />;
      default:
        return <Stethoscope className="w-8 h-8 text-sky-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link
          href="/"
          className="hover:text-sky-400 transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Home Directory
        </Link>
        <span>/</span>
        <Link
          href="/specialties"
          className="hover:text-sky-400 transition-colors"
        >
          Specialty Departments
        </Link>
        <span>/</span>
        <span className="text-sky-300 font-bold">{department.name}</span>
      </div>

      {/* Hero Specialty Banner */}
      <div className="relative bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl overflow-hidden glow-sky">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl shrink-0">
                {renderIcon(department.icon)}
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-extrabold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  Verified Medical Specialty
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  {department.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                  {department.longDescription || department.description}
                </p>
              </div>
            </div>

            <a
              href="tel:911"
              className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 shrink-0 glow-red border border-red-500/40"
              suppressHydrationWarning
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              Emergency SOS (911)
            </a>
          </div>

          {/* Department Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Verified Hospitals
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-4 h-4 text-sky-400" />
                {matchingHospitals.length} Centers
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Available ICU Beds
              </p>
              <p className="text-lg sm:text-xl font-extrabold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <Bed className="w-4 h-4 text-emerald-400" />
                {totalBeds} Live Beds
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Specialty Lead
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-amber-300 truncate mt-0.5">
                {department.headDoctor || "Dr. Sarah Lawson"}
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Emergency Status
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-sky-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" /> 24/7 Priority Care
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Procedures & Common Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-sky-400" />
            Key Clinical Procedures
          </h3>
          <ul className="space-y-2.5">
            {(department.procedures || [
              "Advanced Diagnostic Imaging & Triaging",
              "Minimally Invasive Interventions",
              "24/7 Critical Intensive Care Management",
              "Post-Operative Specialized Rehabilitation",
            ]).map((proc, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs text-slate-300 font-medium bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{proc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            Conditions Treated
          </h3>
          <ul className="space-y-2.5">
            {(department.commonConditions || [
              "Acute Trauma & Emergency Admissions",
              "Chronic Specialist Management",
              "Complex Diagnostic Pathologies",
              "Critical ICU Monitoring Conditions",
            ]).map((cond, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs text-slate-300 font-medium bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{cond}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hospitals Offering Specialty */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-sky-400" />
              Hospitals with {department.name} ({matchingHospitals.length})
            </h2>
            <p className="text-xs text-slate-400">
              Verified medical centers with dedicated {department.name} units
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
          >
            View All Hospitals →
          </Link>
        </div>

        {matchingHospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingHospitals.map((hosp) => (
              <HospitalCard
                key={hosp.id}
                hospital={hosp}
                onNavigate={() => router.push("/navigation")}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center text-slate-400">
            No specific hospitals listed for this department yet.
          </div>
        )}
      </div>

      {/* Verified Doctors Roster */}
      {matchingDoctors.length > 0 && (
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-emerald-400" />
              Specialist Physicians & Surgeons ({matchingDoctors.length})
            </h2>
            <p className="text-xs text-slate-400">
              Board-certified specialists available for consultation and emergency surgery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 hover:border-sky-500/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 font-bold shrink-0">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h4 className="font-bold text-white truncate text-sm">
                    {doc.name}
                  </h4>
                  <p className="text-sky-400 font-semibold">{doc.specialty}</p>
                  <p className="text-slate-400 mt-0.5">
                    {doc.experienceYears} Years Experience
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
