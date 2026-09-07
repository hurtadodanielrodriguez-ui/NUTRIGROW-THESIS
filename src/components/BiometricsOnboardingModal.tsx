import React, { useState, useEffect } from 'react';
import { 
  Calendar, Scale, Ruler, Sparkles, CheckCircle2, 
  AlertCircle, ArrowRight, ShieldCheck, HeartPulse, 
  Activity, Target, Zap, ChevronRight
} from 'lucide-react';
import { UserProfile, PersonalizedPlan } from '../types';
import { calculateAgeFromBirthDate, generatePersonalizedPlan } from '../utils/nutritionCalculations';
import confetti from 'canvas-confetti';

interface BiometricsOnboardingModalProps {
  isOpen: boolean;
  user: UserProfile;
  onComplete: (data: {
    birthDate: string;
    age: number;
    heightCm: number;
    weightKg: number;
    gender: 'femenino' | 'masculino' | 'otro';
    personalizedPlan: PersonalizedPlan;
  }) => void;
  isDark: boolean;
}

export const BiometricsOnboardingModal: React.FC<BiometricsOnboardingModalProps> = ({
  isOpen,
  user,
  onComplete,
  isDark
}) => {
  const [birthDate, setBirthDate] = useState<string>(user.birthDate || '1998-05-14');
  const [heightCm, setHeightCm] = useState<string>(user.heightCm ? String(user.heightCm) : '168');
  const [weightKg, setWeightKg] = useState<string>(user.weightKg ? String(user.weightKg) : '62.5');
  const [gender, setGender] = useState<'femenino' | 'masculino' | 'otro'>(user.gender || 'femenino');
  const [goal, setGoal] = useState<'salud_integral' | 'perder_grasa' | 'ganar_musculo' | 'mantenimiento'>(user.goal || 'salud_integral');
  const [activityLevel, setActivityLevel] = useState<'sedentario' | 'moderado' | 'activo' | 'muy_activo'>(user.activityLevel || 'activo');
  
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculated age derived in real-time from birth date
  const calculatedAge = calculateAgeFromBirthDate(birthDate);

  // Calculate live BMI preview
  const numHeight = parseFloat(heightCm);
  const numWeight = parseFloat(weightKg);
  const liveBmi = numHeight > 0 && numWeight > 0 
    ? (numWeight / Math.pow(numHeight / 100, 2)).toFixed(1)
    : null;

  // Validate fields
  const isValid = Boolean(
    birthDate && 
    calculatedAge > 0 && 
    calculatedAge < 120 && 
    numHeight >= 90 && 
    numHeight <= 250 && 
    numWeight >= 30 && 
    numWeight <= 260
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) {
      setError('Por favor selecciona tu fecha de nacimiento (obligatorio).');
      return;
    }
    if (!calculatedAge || calculatedAge <= 0) {
      setError('La fecha de nacimiento ingresada no es válida.');
      return;
    }
    if (!numHeight || numHeight < 90 || numHeight > 250) {
      setError('Por favor ingresa una estatura válida en centímetros (obligatorio).');
      return;
    }
    if (!numWeight || numWeight < 30 || numWeight > 260) {
      setError('Por favor ingresa un peso válido en kilogramos (obligatorio).');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const plan = generatePersonalizedPlan({
      birthDate,
      heightCm: numHeight,
      weightKg: numWeight,
      gender,
      activityLevel,
      goal
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#0E5C36', '#70B873', '#F4D06F', '#38BDF8']
      });
    } catch {}

    setTimeout(() => {
      setIsSubmitting(false);
      onComplete({
        birthDate,
        age: calculatedAge,
        heightCm: numHeight,
        weightKg: numWeight,
        gender,
        personalizedPlan: plan
      });
    }, 450);
  };

  // Maximum allowed date is today
  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div 
      id="biometrics-onboarding-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div 
        id="biometrics-onboarding-card"
        className={`w-full max-w-xl my-auto rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all animate-in zoom-in-95 duration-200 ${
          isDark 
            ? 'bg-[#122218] border-[#70B873]/30 text-white' 
            : 'bg-white border-[#0E5C36]/20 text-[#102417] shadow-emerald-950/20'
        }`}
      >
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-60 h-60 bg-gradient-to-br from-[#70B873]/30 to-[#0E5C36]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100/80 dark:bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />
            <span>Configuración Inicial Obligatoria</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#0E5C36] dark:text-[#70B873]">
            Personaliza tu Plan NutriGrow 🌱
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 font-medium max-w-md mx-auto ${isDark ? 'text-gray-300' : 'text-[#2D4536]'}`}>
            Para calcular con precisión científica tus calorías diarias, distribución de macronutrientes y recomendaciones botánicas, ingresa tus datos obligatorios.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          {error && (
            <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* OBLIGATORIO 1: FECHA DE NACIMIENTO */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label 
                htmlFor="input-birth-date" 
                className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5 text-gray-800 dark:text-gray-100"
              >
                <Calendar className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                <span>Fecha de Nacimiento <strong className="text-red-500">*</strong></span>
              </label>

              {calculatedAge > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
                  <Sparkles className="w-3 h-3" />
                  Edad: {calculatedAge} años
                </span>
              )}
            </div>

            <input
              id="input-birth-date"
              type="date"
              max={maxDate}
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 cursor-pointer ${
                isDark
                  ? 'bg-[#1A2E22] border-[#70B873]/30 text-white focus:ring-[#70B873] focus:border-[#70B873]'
                  : 'bg-[#F9F8F5] border-[#0E5C36]/25 text-[#102417] focus:ring-[#0E5C36] focus:border-[#0E5C36]'
              }`}
            />
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              * A partir de tu fecha de nacimiento se calcula de forma exacta tu edad para calibrar tu tasa metabólica.
            </p>
          </div>

          {/* OBLIGATORIO 2 Y 3: ESTATURA Y PESO (EN GRID) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ESTATURA */}
            <div className="space-y-1.5">
              <label 
                htmlFor="input-height" 
                className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5 text-gray-800 dark:text-gray-100"
              >
                <Ruler className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                <span>Estatura (cm) <strong className="text-red-500">*</strong></span>
              </label>

              <div className="relative">
                <input
                  id="input-height"
                  type="number"
                  min="90"
                  max="250"
                  step="1"
                  required
                  placeholder="Ej: 168"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className={`w-full pl-4 pr-12 py-3 rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-[#1A2E22] border-[#70B873]/30 text-white focus:ring-[#70B873] focus:border-[#70B873]'
                      : 'bg-[#F9F8F5] border-[#0E5C36]/25 text-[#102417] focus:ring-[#0E5C36] focus:border-[#0E5C36]'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  cm
                </span>
              </div>
            </div>

            {/* PESO ACTUAL */}
            <div className="space-y-1.5">
              <label 
                htmlFor="input-weight" 
                className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5 text-gray-800 dark:text-gray-100"
              >
                <Scale className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                <span>Peso Actual (kg) <strong className="text-red-500">*</strong></span>
              </label>

              <div className="relative">
                <input
                  id="input-weight"
                  type="number"
                  min="30"
                  max="260"
                  step="0.1"
                  required
                  placeholder="Ej: 62.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className={`w-full pl-4 pr-12 py-3 rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-[#1A2E22] border-[#70B873]/30 text-white focus:ring-[#70B873] focus:border-[#70B873]'
                      : 'bg-[#F9F8F5] border-[#0E5C36]/25 text-[#102417] focus:ring-[#0E5C36] focus:border-[#0E5C36]'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  kg
                </span>
              </div>
            </div>
          </div>

          {/* LIVE BMI PREVIEW CHIP */}
          {liveBmi && (
            <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-all ${
              isDark ? 'bg-[#152B1E] border-[#70B873]/30' : 'bg-emerald-50/70 border-emerald-900/10'
            }`}>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                <span className="font-bold text-gray-700 dark:text-gray-200">
                  Índice de Masa Corporal (IMC) estimado:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#0E5C36] dark:text-[#70B873] text-sm">
                  {liveBmi}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  parseFloat(liveBmi) < 18.5 
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' 
                    : parseFloat(liveBmi) <= 24.9 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
                }`}>
                  {parseFloat(liveBmi) < 18.5 ? 'Bajo peso' : parseFloat(liveBmi) <= 24.9 ? 'Peso saludable' : 'Sobrepeso leve'}
                </span>
              </div>
            </div>
          )}

          {/* COMPLEMENTARIO: OBJETIVO & GÉNERO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* GÉNERO BIOLÓGICO */}
            <div className="space-y-1.5">
              <label htmlFor="select-gender" className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <span>Género (Para calibrar BMR)</span>
              </label>
              <select
                id="select-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className={`w-full px-3 py-2.5 rounded-2xl border text-xs font-medium transition-all ${
                  isDark
                    ? 'bg-[#1A2E22] border-[#70B873]/30 text-white'
                    : 'bg-[#F9F8F5] border-[#0E5C36]/25 text-[#102417]'
                }`}
              >
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="otro">Personalizado / Otro</option>
              </select>
            </div>

            {/* OBJETIVO PRINCIPAL */}
            <div className="space-y-1.5">
              <label htmlFor="select-goal" className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />
                <span>Objetivo Principal</span>
              </label>
              <select
                id="select-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className={`w-full px-3 py-2.5 rounded-2xl border text-xs font-medium transition-all ${
                  isDark
                    ? 'bg-[#1A2E22] border-[#70B873]/30 text-white'
                    : 'bg-[#F9F8F5] border-[#0E5C36]/25 text-[#102417]'
                }`}
              >
                <option value="salud_integral">Salud Integral & Longevidad</option>
                <option value="perder_grasa">Pérdida de Grasa Saludable</option>
                <option value="ganar_musculo">Aumento de Masa Muscular</option>
                <option value="mantenimiento">Mantenimiento & Energía Viva</option>
              </select>
            </div>
          </div>

          {/* SUBMIT BUTTON (MANDATORY FIELDS ENFORCED) */}
          <div className="pt-3">
            <button
              id="btn-submit-biometrics"
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                isValid && !isSubmitting
                  ? 'bg-gradient-to-r from-[#0E5C36] via-[#1A774A] to-[#0E5C36] hover:brightness-110 text-white shadow-emerald-950/20 active:scale-[0.99]'
                  : 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Calculando tu Plan Nutricional...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Guardar Datos & Ver Mi Plan Determinado</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {!isValid && (
              <p className="text-[11px] text-center text-amber-600 dark:text-amber-400 mt-2 font-semibold">
                * La fecha de nacimiento, estatura y peso son campos obligatorios para continuar.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
