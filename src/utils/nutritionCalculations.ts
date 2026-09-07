import { PersonalizedPlan } from '../types';

export function calculateAgeFromBirthDate(birthDateStr: string): number {
  if (!birthDateStr) return 0;
  const birth = new Date(birthDateStr);
  if (isNaN(birth.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return Math.max(0, age);
}

export interface CalculatePlanParams {
  birthDate: string;
  heightCm: number;
  weightKg: number;
  gender?: 'femenino' | 'masculino' | 'otro';
  activityLevel?: 'sedentario' | 'moderado' | 'activo' | 'muy_activo';
  goal?: 'perder_grasa' | 'ganar_musculo' | 'mantenimiento' | 'salud_integral';
}

export function generatePersonalizedPlan(params: CalculatePlanParams): PersonalizedPlan {
  const {
    birthDate,
    heightCm,
    weightKg,
    gender = 'femenino',
    activityLevel = 'activo',
    goal = 'salud_integral'
  } = params;

  const age = calculateAgeFromBirthDate(birthDate);

  // BMI Calculation: weight (kg) / (height (m) ^ 2)
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  let bmiCategory = 'Peso Saludable';
  if (bmi < 18.5) {
    bmiCategory = 'Bajo Peso';
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiCategory = 'Sobrepeso Leve';
  } else if (bmi >= 30) {
    bmiCategory = 'Obesidad';
  }

  // Basal Metabolic Rate (BMR) via Mifflin-St Jeor equation:
  // Men: 10*weight + 6.25*height - 5*age + 5
  // Women: 10*weight + 6.25*height - 5*age - 161
  let bmr = 0;
  if (gender === 'masculino') {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * (age || 25) + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * (age || 25) - 161;
  }
  bmr = Math.round(bmr);

  // Total Daily Energy Expenditure (TDEE) Multiplier
  const multipliers: Record<string, number> = {
    sedentario: 1.2,
    moderado: 1.45,
    activo: 1.65,
    muy_activo: 1.85
  };
  const tdee = Math.round(bmr * (multipliers[activityLevel] || 1.55));

  // Goal adjustment
  let dailyCalories = tdee;
  if (goal === 'perder_grasa') {
    dailyCalories = Math.max(1300, Math.round(tdee - 400));
  } else if (goal === 'ganar_musculo') {
    dailyCalories = Math.round(tdee + 350);
  } else {
    // Mantenimiento & salud_integral
    dailyCalories = tdee;
  }

  // Macronutrient distribution:
  // Protein: ~1.8g to 2.2g per kg (4 kcal/g)
  const proteinMultiplier = goal === 'ganar_musculo' ? 2.2 : goal === 'perder_grasa' ? 2.0 : 1.7;
  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = proteinGrams * 4;

  // Fat: 25% to 30% of total calories (9 kcal/g)
  const fatCalories = dailyCalories * 0.28;
  const fatGrams = Math.round(fatCalories / 9);

  // Carbs: Remaining calories (4 kcal/g)
  const remainingCalories = Math.max(0, dailyCalories - proteinCalories - (fatGrams * 9));
  const carbsGrams = Math.round(remainingCalories / 4);

  // Hydration calculation: 35ml per kg of weight
  const waterLiters = Number(((weightKg * 35) / 1000).toFixed(1));
  const waterGlasses = Math.round((waterLiters * 1000) / 250);

  // Specific botanical and nutrition recommendations based on age & BMI
  const recommendations: string[] = [];

  if (age < 25) {
    recommendations.push('Aporte óptimo de micronutrientes para regeneración celular y energía cognitiva.');
    recommendations.push('Incluye microgreens de brócoli y alfalfa para densidad vitamínica en tu desayuno.');
  } else if (age < 50) {
    recommendations.push('Enfoque en alimentos antiinflamatorios ricos en Omega-3 para proteger el sistema cardiovascular.');
    recommendations.push('Incorpora brotes de rábano y cúrcuma para combatir el estrés oxidativo laboral.');
  } else {
    recommendations.push('Prioriza la absorción de calcio vegetal, magnesio y antioxidantes para densidad ósea.');
    recommendations.push('Microgreens de col kale y semillas de chía para salud articular y digestión ligera.');
  }

  if (goal === 'perder_grasa') {
    recommendations.push('Déficit calórico moderado y controlado de 400 kcal para preservar masa muscular magra.');
    recommendations.push('Aumenta el consumo de agua a primera hora para activar el gasto energético metabólico.');
  } else if (goal === 'ganar_musculo') {
    recommendations.push('Superávit de 350 kcal con proteína de alto valor biológico repartida en 4 tomas diarias.');
    recommendations.push('Snacks energéticos de matcha, avena y frutos secos antes de tus entrenamientos.');
  } else {
    recommendations.push('Balance homeostático perfecto para longevidad celular y vitalidad sostenida.');
    recommendations.push('Mantén tu ingesta de fibra vegetal viva por encima de los 30 gramos diarios.');
  }

  return {
    age,
    birthDate,
    heightCm,
    weightKg,
    bmi,
    bmiCategory,
    bmr,
    tdee,
    dailyCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
    waterGlasses,
    waterLiters,
    recommendations,
    calculatedAt: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  };
}
