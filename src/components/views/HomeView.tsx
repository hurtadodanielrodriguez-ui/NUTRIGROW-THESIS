import React, { useState } from 'react';
import { 
  Flame, Droplets, Target, Sprout, ArrowRight, 
  Sparkles, Plus, Minus, CheckCircle2, UtensilsCrossed, 
  Apple, TrendingUp, Calendar, Heart, ShieldCheck,
  Scale, Ruler, HeartPulse, Zap, Edit3, Activity, Info
} from 'lucide-react';
import { UserProfile, Recipe, Project, ViewMode, RecipeCategory } from '../../types';
import { generatePersonalizedPlan, calculateAgeFromBirthDate } from '../../utils/nutritionCalculations';
import confetti from 'canvas-confetti';

interface HomeViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  recipes: Recipe[];
  projects: Project[];
  onNavigate: (view: ViewMode, recipeCategory?: RecipeCategory) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  isDark: boolean;
  onOpenBiometrics?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  onUpdateUser,
  recipes,
  projects,
  onNavigate,
  onSelectRecipe,
  isDark,
  onOpenBiometrics
}) => {
  const [activeProject, setActiveProject] = useState<Project>(
    projects.find((p) => p.status === 'en_progreso') || projects[0]
  );

  // Compute or obtain personalized plan
  const plan = user.personalizedPlan || generatePersonalizedPlan({
    birthDate: user.birthDate || '1998-05-14',
    heightCm: user.heightCm || 168,
    weightKg: user.weightKg || 62.5,
    gender: user.gender || 'femenino',
    activityLevel: user.activityLevel || 'activo',
    goal: user.goal || 'salud_integral'
  });

  const displayAge = user.age || calculateAgeFromBirthDate(user.birthDate || '1998-05-14');

  const handleWaterAdd = () => {
    if (user.waterGlasses < 12) {
      const next = user.waterGlasses + 1;
      onUpdateUser({ waterGlasses: next });
      if (next === user.targetWaterGlasses) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#38BDF8', '#0E5C36', '#70B873']
          });
        } catch {}
      }
    }
  };

  const handleWaterSubtract = () => {
    if (user.waterGlasses > 0) {
      onUpdateUser({ waterGlasses: user.waterGlasses - 1 });
    }
  };

  const caloriePercentage = Math.min(100, Math.round((user.consumedCalories / user.dailyCalories) * 100));
  const proteinPercentage = Math.min(100, Math.round((user.proteinGrams / user.targetProteinGrams) * 100));
  const carbsPercentage = Math.min(100, Math.round((user.carbsGrams / user.targetCarbsGrams) * 100));
  const fatPercentage = Math.min(100, Math.round((user.fatGrams / user.targetFatGrams) * 100));

  const recommendedBreakfast = recipes.find((r) => r.category === 'desayunos') || recipes[0];
  const recommendedLunch = recipes.find((r) => r.category === 'almuerzos') || recipes[2];
  const recommendedDinner = recipes.find((r) => r.category === 'cenas') || recipes[4];

  return (
    <div id="view-inicio-dashboard" className="space-y-8 animate-in fade-in duration-300">
      {/* WELCOME BANNER */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-xl ${
          isDark
            ? 'bg-gradient-to-r from-[#16291E] via-[#0E5C36]/80 to-[#0D1912] border-[#70B873]/30 text-white'
            : 'bg-gradient-to-r from-[#0E5C36] via-[#16472D] to-[#2D8B55] text-white shadow-emerald-950/15'
        }`}
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-[#70B873]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-[#70B873]" />
              <span>Día {user.streakDays} de Nutrición Consciente</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
              ¡Hola de nuevo, {user?.name ? user.name.split(' ')[0] : 'Amigo'}! 🌱
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              Hoy has completado el <strong>{caloriePercentage}%</strong> de tu meta calórica. Tus brotes vivos de microgreens están listos para tu ensalada de hoy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('ayuda_ia')}
              className="px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 hover:brightness-105 transition-all shadow-md flex items-center gap-2 cursor-pointer ring-2 ring-white/40"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              <span>Ayuda por IA</span>
            </button>
            <button
              onClick={() => onNavigate('recetas')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white text-[#0E5C36] hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#0E5C36]" />
              <span>Ver Recetario</span>
            </button>
            <button
              onClick={() => onNavigate('proyectos')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sprout className="w-4 h-4 text-[#70B873]" />
              <span>Mis Proyectos</span>
            </button>
          </div>
        </div>
      </div>

      {/* TU PLAN NUTRICIONAL DETERMINADO (SEGÚN TUS DATOS BIOMÉTRICOS) */}
      <section 
        id="section-plan-determinado"
        className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-br from-[#16291E] via-[#102419] to-[#0D1912] border-[#70B873]/30 text-white'
            : 'bg-white border-[#0E5C36]/20 text-[#102417] shadow-emerald-950/5'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Plan Nutricional Calibrado</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#0E5C36] dark:text-[#70B873]">
              Tu Plan Determinado según tus Datos Personales 🌱
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-gray-300' : 'text-[#2D4536]'}`}>
              Parámetros y metas calculadas a partir de tu fecha de nacimiento, estatura y peso actual.
            </p>
          </div>

          {onOpenBiometrics && (
            <button
              onClick={onOpenBiometrics}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 self-start md:self-auto ${
                isDark
                  ? 'border-[#70B873]/40 bg-[#16291E] text-emerald-300 hover:bg-[#1C3826]'
                  : 'border-[#0E5C36]/25 bg-emerald-50 text-[#0E5C36] hover:bg-emerald-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modificar Biometría</span>
            </button>
          )}
        </div>

        {/* BIOMETRIC SUMMARY CHIPS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#122218] border-[#70B873]/20' : 'bg-[#F9F8F5] border-emerald-900/10'}`}>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />
              <span className="font-semibold">Edad Calculada</span>
            </div>
            <p className="text-lg font-black text-gray-900 dark:text-white">
              {displayAge} <span className="text-xs font-medium text-gray-500">años</span>
            </p>
            <p className="text-[10px] text-gray-400 truncate">
              {user.birthDate ? `F. Nac: ${user.birthDate}` : 'Nacimiento registrado'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#122218] border-[#70B873]/20' : 'bg-[#F9F8F5] border-emerald-900/10'}`}>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <Ruler className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />
              <span className="font-semibold">Estatura</span>
            </div>
            <p className="text-lg font-black text-gray-900 dark:text-white">
              {user.heightCm} <span className="text-xs font-medium text-gray-500">cm</span>
            </p>
            <p className="text-[10px] text-gray-400">
              {(user.heightCm / 100).toFixed(2)} m
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#122218] border-[#70B873]/20' : 'bg-[#F9F8F5] border-emerald-900/10'}`}>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <Scale className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />
              <span className="font-semibold">Peso Actual</span>
            </div>
            <p className="text-lg font-black text-gray-900 dark:text-white">
              {user.weightKg} <span className="text-xs font-medium text-gray-500">kg</span>
            </p>
            <p className="text-[10px] text-gray-400">
              Objetivo: {user.targetWeightKg} kg
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#122218] border-[#70B873]/20' : 'bg-[#F9F8F5] border-emerald-900/10'}`}>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <HeartPulse className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />
              <span className="font-semibold">IMC Estimado</span>
            </div>
            <p className="text-lg font-black text-[#0E5C36] dark:text-[#70B873]">
              {plan.bmi}
            </p>
            <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
              plan.bmi < 18.5 
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' 
                : plan.bmi <= 24.9 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
            }`}>
              {plan.bmiCategory}
            </span>
          </div>
        </div>

        {/* NUTRITIONAL TARGETS BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Target Calories */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#152B1E] border-[#70B873]/30' : 'bg-emerald-50/70 border-emerald-900/15'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Gasto Calórico Objetivo
              </span>
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                TDEE: {plan.tdee} kcal
              </span>
            </div>
            <p className="text-2xl font-black text-[#0E5C36] dark:text-[#70B873]">
              {plan.dailyCalories} <span className="text-xs font-bold text-gray-500">kcal/día</span>
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
              Tasa Metabólica Basal (TMB): {plan.bmr} kcal en reposo celular.
            </p>
          </div>

          {/* Target Macronutrients */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#152B1E] border-[#70B873]/30' : 'bg-emerald-50/70 border-emerald-900/15'}`}>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Macros Diarios Determinados
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-white/70 dark:bg-[#102419]">
                <p className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">Proteína</p>
                <p className="text-sm font-black">{plan.proteinGrams}g</p>
              </div>
              <div className="p-2 rounded-xl bg-white/70 dark:bg-[#102419]">
                <p className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400">Carbos</p>
                <p className="text-sm font-black">{plan.carbsGrams}g</p>
              </div>
              <div className="p-2 rounded-xl bg-white/70 dark:bg-[#102419]">
                <p className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400">Grasas</p>
                <p className="text-sm font-black">{plan.fatGrams}g</p>
              </div>
            </div>
          </div>

          {/* Hydration */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#152B1E] border-[#70B873]/30' : 'bg-emerald-50/70 border-emerald-900/15'}`}>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1.5 mb-1">
              <Droplets className="w-4 h-4 text-sky-500" />
              Hidratación Recomendada
            </span>
            <p className="text-2xl font-black text-sky-600 dark:text-sky-400">
              {plan.waterGlasses} <span className="text-xs font-bold text-gray-500">vasos (~{plan.waterLiters} Litros)</span>
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
              Calculado a razón de 35 ml de agua pura por kg de peso corporal.
            </p>
          </div>
        </div>

        {/* SPECIFIC RECOMMENDATIONS */}
        {plan.recommendations && plan.recommendations.length > 0 && (
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#0E5C36] dark:text-[#70B873] mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Pautas Botánicas Adaptadas a tu Edad y Perfil:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {plan.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-medium text-gray-700 dark:text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#70B873] shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Card */}
        <div
          className={`p-5 rounded-3xl border shadow-sm transition-all hover:scale-[1.01] ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Calorías Diarias
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display">
              {user.consumedCalories}
            </span>
            <span className="text-xs text-gray-400">/ {user.dailyCalories} kcal</span>
          </div>
          <div className="mt-3 w-full h-2 rounded-full bg-gray-100 dark:bg-[#0D1912] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#0E5C36] transition-all duration-500"
              style={{ width: `${caloriePercentage}%` }}
            />
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">{caloriePercentage}% alcanzado</span>
        </div>

        {/* Protein Card */}
        <div
          className={`p-5 rounded-3xl border shadow-sm transition-all hover:scale-[1.01] ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Proteína Magra
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-[#0E5C36] dark:text-[#70B873] flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display">
              {user.proteinGrams}g
            </span>
            <span className="text-xs text-gray-400">/ {user.targetProteinGrams}g</span>
          </div>
          <div className="mt-3 w-full h-2 rounded-full bg-gray-100 dark:bg-[#0D1912] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0E5C36] dark:bg-[#70B873] transition-all duration-500"
              style={{ width: `${proteinPercentage}%` }}
            />
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">{proteinPercentage}% meta alcanzada</span>
        </div>

        {/* Carbs & Fats Card */}
        <div
          className={`p-5 rounded-3xl border shadow-sm transition-all hover:scale-[1.01] ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Carbos & Grasas
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Apple className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span>Carbs: {user.carbsGrams}g / {user.targetCarbsGrams}g</span>
            <span className="text-emerald-600 dark:text-[#70B873]">{carbsPercentage}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-[#0D1912] overflow-hidden mb-2">
            <div className="h-full bg-blue-500" style={{ width: `${carbsPercentage}%` }} />
          </div>

          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span>Grasas: {user.fatGrams}g / {user.targetFatGrams}g</span>
            <span className="text-emerald-600 dark:text-[#70B873]">{fatPercentage}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-[#0D1912] overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: `${fatPercentage}%` }} />
          </div>
        </div>

        {/* Water Tracker Card */}
        <div
          className={`p-5 rounded-3xl border shadow-sm transition-all hover:scale-[1.01] ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Hidratación Diaria
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-cyan-600 dark:text-cyan-400">
              {user.waterGlasses}
            </span>
            <span className="text-xs text-gray-400">/ {user.targetWaterGlasses} vasos</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={handleWaterSubtract}
              className="w-8 h-8 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#0D1912] cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleWaterAdd}
              id="btn-add-water-glass"
              className="flex-1 py-1.5 px-3 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+1 Vaso</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2 COLUMNS: TODAY'S RECOMMENDED MEALS & ACTIVE PROJECT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Meals Showcase (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-[#0E5C36] dark:text-[#70B873]" />
              <h2 className="text-xl font-bold font-display">Planes y Recetas para Hoy</h2>
            </div>
            <button
              onClick={() => onNavigate('recetas')}
              className="text-xs font-bold text-[#0E5C36] dark:text-[#70B873] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { meal: 'Desayuno', recipe: recommendedBreakfast, time: '08:00 AM' },
              { meal: 'Almuerzo', recipe: recommendedLunch, time: '01:30 PM' },
              { meal: 'Cena', recipe: recommendedDinner, time: '08:00 PM' }
            ].map(({ meal, recipe, time }, i) => (
              <div
                key={i}
                onClick={() => {
                  onSelectRecipe(recipe);
                  onNavigate('recetas');
                }}
                className={`group rounded-2xl p-3.5 border transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-[#16291E] border-[#70B873]/20 text-white hover:border-[#70B873]'
                    : 'bg-white border-[#0E5C36]/15 text-gray-800 hover:border-[#0E5C36]'
                }`}
              >
                <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                    {meal} • {time}
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0E5C36] text-white">
                    {recipe.calories} kcal
                  </div>
                </div>

                <h4 className="font-bold text-xs sm:text-sm line-clamp-1 group-hover:text-[#0E5C36] dark:group-hover:text-[#70B873] transition-colors">
                  {recipe.title}
                </h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 flex items-center justify-between">
                  <span>⏱ {recipe.prepTimeMinutes} min</span>
                  <span className="font-semibold text-emerald-600 dark:text-[#70B873]">{recipe.protein}g proteína</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Project Card (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-[#0E5C36] dark:text-[#70B873]" />
              <h2 className="text-xl font-bold font-display">Proyecto Activo</h2>
            </div>
            <button
              onClick={() => onNavigate('proyectos')}
              className="text-xs font-bold text-[#0E5C36] dark:text-[#70B873] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeProject && (
            <div
              className={`rounded-3xl p-5 border shadow-sm space-y-4 ${
                isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
                  {activeProject.category}
                </span>
                <span className="text-xs font-bold text-[#0E5C36] dark:text-[#70B873]">
                  {activeProject.progress}% completado
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold font-display">{activeProject.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {activeProject.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-[#0D1912] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0E5C36] to-[#70B873]"
                  style={{ width: `${activeProject.progress}%` }}
                />
              </div>

              {/* Task list preview */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Próximas Tareas
                </p>
                {activeProject.tasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        task.completed ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                    <span className={task.completed ? 'line-through text-gray-400' : ''}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('proyectos')}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#0E5C36] text-white hover:bg-[#16472D] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Gestionar Proyecto Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DAILY WELLNESS & BOTANICAL WISDOM TIP */}
      <div
        className={`rounded-3xl p-5 sm:p-6 border flex flex-col sm:flex-row items-center gap-4 ${
          isDark
            ? 'bg-[#16291E]/60 border-[#70B873]/20 text-gray-200'
            : 'bg-emerald-50/70 border-[#0E5C36]/15 text-emerald-950'
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#0E5C36] text-white flex items-center justify-center shrink-0 shadow-md">
          <Sprout className="w-6 h-6 text-[#70B873]" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h4 className="font-bold text-sm font-display text-[#0E5C36] dark:text-[#70B873]">
            Consejo Botánico de Hoy: Microgreens de Brócoli
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
            Los brotes tiernos de brócoli contienen hasta <strong>50 veces más sulforafano</strong> que el brócoli maduro, un potente activador celular antioxidante. Añade 2 cucharadas a tu tazón de quinoa para maximizar tus defensas.
          </p>
        </div>
      </div>
    </div>
  );
};
