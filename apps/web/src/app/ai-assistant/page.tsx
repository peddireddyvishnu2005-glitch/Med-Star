'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Stethoscope, 
  Mic, 
  Send, 
  HeartPulse, 
  Bell, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { SymptomCheckResult } from '@/types';
import Link from 'next/link';

export default function AIAssistantPage() {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [triageResult, setTriageResult] = useState<SymptomCheckResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleRunTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomsInput.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/v1/ai/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: [symptomsInput] }),
      });

      const json = await res.json();
      if (json.success) {
        setTriageResult(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInputSimulate = () => {
    setIsRecording(true);
    setSymptomsInput("Listening for symptoms...");
    setTimeout(() => {
      setSymptomsInput("I have sharp chest pain, shortness of breath, and left arm numbness.");
      setIsRecording(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 border-b border-purple-900/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> AI CLINICAL TRIAGE ENGINE V2
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">AI Health & Symptom Assistant</h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Type or speak your symptoms for immediate clinical triage level analysis, condition probabilities, and recommended specialist guidance.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Symptom Input Form */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-4">
          <label className="text-xs font-bold text-slate-300 block">Describe Your Symptoms or Health Concerns:</label>
          <form onSubmit={handleRunTriage} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={symptomsInput}
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="e.g. Sharp chest tightness, high fever, or severe headache..."
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={handleVoiceInputSimulate}
                className={`absolute right-3 top-2.5 p-1.5 rounded-xl border transition-all ${
                  isRecording
                    ? 'bg-red-600 text-white border-red-500 animate-pulse'
                    : 'bg-slate-900 text-purple-400 border-purple-500/30 hover:bg-purple-950/60'
                }`}
                title="Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all shrink-0"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Analyze</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-[11px] text-slate-500 font-semibold self-center">Try presets:</span>
            {[
              "Chest pain and shortness of breath",
              "High fever and persistent cough",
              "Severe migraine with light sensitivity",
            ].map((preset, i) => (
              <button
                key={i}
                onClick={() => setSymptomsInput(preset)}
                className="text-xs px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-all"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* AI Triage Results Display */}
        {triageResult && (
          <div className="bg-slate-900/90 border border-purple-900/50 p-6 rounded-3xl shadow-2xl space-y-6 animate-in fade-in">
            {/* Triage Level Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                triageResult.triageLevel === 'EMERGENCY'
                  ? 'bg-red-950/80 border-red-500 text-red-200'
                  : triageResult.triageLevel === 'URGENT'
                  ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                  : 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {triageResult.triageLevel === 'EMERGENCY' ? (
                  <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
                ) : triageResult.triageLevel === 'URGENT' ? (
                  <HeartPulse className="w-8 h-8 text-amber-400" />
                ) : (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                )}
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight">
                    TRIAGE LEVEL: {triageResult.triageLevel}
                  </h2>
                  <p className="text-xs opacity-90 mt-0.5">{triageResult.urgentAdvice}</p>
                </div>
              </div>

              {triageResult.triageLevel === 'EMERGENCY' && (
                <Link
                  href="/emergency"
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-extrabold text-xs shadow-lg hover:bg-red-500 flex items-center gap-1.5 shrink-0"
                >
                  Trigger SOS <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* Possible Conditions */}
            <div>
              <h3 className="font-extrabold text-white text-base mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" /> Diagnostic Probabilities
              </h3>
              <div className="space-y-3">
                {triageResult.possibleConditions.map((cond, index) => (
                  <div key={index} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{cond.name}</h4>
                      <span className="text-xs font-mono font-extrabold text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded-lg border border-purple-800">
                        {cond.probability} Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{cond.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Specialists */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <div>
                <span className="text-xs text-slate-400">Recommended Specialties:</span>
                <div className="flex gap-2 mt-1">
                  {triageResult.recommendedSpecialties.map((spec, i) => (
                    <span key={i} className="text-xs font-bold px-2.5 py-1 rounded-xl bg-sky-950 text-sky-300 border border-sky-800">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/doctors"
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Stethoscope className="w-4 h-4" /> Book Specialist
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
