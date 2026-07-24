"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_DEPARTMENTS, INITIAL_HOSPITALS } from "@/lib/mockData";
import {
  AlertTriangle,
  HeartPulse,
  Baby,
  Brain,
  Activity,
  ShieldAlert,
  Building2,
  Sparkles,
  Search,
  ChevronRight,
  Stethoscope,
  ShieldCheck,
  Bed,
} from "lucide-react";

export default function SpecialtiesIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepartments = INITIAL_DEPARTMENTS.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "AlertTriangle":
        return <AlertTriangle className="w-6 h-6 text-amber-400" />;
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6 text-red-400" />;
      case "Baby":
        return <Baby className="w-6 h-6 text-pink-400" />;
      case "Brain":
        return <Brain className="w-6 h-6 text-purple-400" />;
      case "Activity":
        return <Activity className="w-6 h-6 text-emerald-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-cyan-400" />;
      default:
        return <Stethoscope className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-sky-950/80 via-slate-900 to-slate-950 border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden glow-sky">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Comprehensive Medical Disciplines & Clinical Specialties
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Medical Specialty Departments ({INITIAL_DEPARTMENTS.length})
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Explore specialized medical units, verified doctor rosters,
                clinical procedures, and emergency trauma care centers across
                our network.
              </p>
            </div>

            <Link
              href="/"
              className="self-start sm:self-auto px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg shadow-sky-600/20 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              All Hospitals Directory
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medical specialties (e.g. Cardiology, Surgery, Pediatrics)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>

      {/* Specialty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => {
          const hospitalCount = INITIAL_HOSPITALS.filter((h) =>
            h.departments.some(
              (d) =>
                d.toLowerCase().includes(dept.name.toLowerCase()) ||
                dept.name.toLowerCase().includes(d.toLowerCase())
            )
          ).length;

          return (
            <Link
              key={dept.id}
              href={`/specialties/${dept.slug}`}
              className="bg-slate-900/90 border border-slate-800/90 p-6 rounded-3xl hover:border-sky-500/50 hover:-translate-y-1.5 transition-all duration-300 shadow-xl group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                    {renderIcon(dept.icon)}
                  </div>
                  <span className="text-[11px] font-bold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-800/50 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-sky-400" />
                    {hospitalCount} Centers
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors flex items-center justify-between">
                    <span>{dept.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {dept.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
                  <Stethoscope className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{dept.headDoctor || "Chief Specialist"}</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-slate-400 text-[11px]">Clinical Unit</span>
                  <span className="text-sky-400 group-hover:text-sky-300 font-extrabold flex items-center gap-1 text-[11px] whitespace-nowrap">
                    Explore Department
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
