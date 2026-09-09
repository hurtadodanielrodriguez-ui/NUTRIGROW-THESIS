export type ViewMode = 'landing' | 'auth' | 'inicio' | 'perfil' | 'recetas' | 'proyectos' | 'ayuda_ia' | 'configuracion';

export type AuthMode = 'login' | 'register' | 'forgot';

export interface AiActionData {
  type: 'create_project' | 'add_recipe' | 'update_goals' | 'suggest_meal_plan';
  projectPayload?: {
    title: string;
    description: string;
    category: 'Cultivo' | 'Nutrición' | 'Hábitos' | 'Meal Prep';
    targetDays: number;
    tasks: string[];
  };
  recipePayload?: {
    title: string;
    category: 'desayunos' | 'almuerzos' | 'cenas' | 'snacks' | 'bebidas';
    categoryLabel: string;
    prepTimeMinutes: number;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
    image?: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    tags: string[];
  };
  goalPayload?: {
    dailyCalories?: number;
    targetProteinGrams?: number;
    targetCarbsGrams?: number;
    targetFatGrams?: number;
    targetWaterGlasses?: number;
    targetWeightKg?: number;
    goal?: 'perder_grasa' | 'ganar_musculo' | 'mantenimiento' | 'salud_integral';
    notes?: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  imageUrl?: string;
  fileName?: string;
  actions?: AiActionData[];
  actionApplied?: { [key: number]: boolean };
}

export interface PersonalizedPlan {
  age: number;
  birthDate: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  waterGlasses: number;
  waterLiters: number;
  recommendations: string[];
  calculatedAt: string;
}

export type AppLanguage = 'es' | 'en' | 'fr';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  bio: string;
  goal: 'perder_grasa' | 'ganar_musculo' | 'mantenimiento' | 'salud_integral';
  activityLevel: 'sedentario' | 'moderado' | 'activo' | 'muy_activo';
  gender?: 'femenino' | 'masculino' | 'otro';
  birthDate?: string;
  age?: number;
  hasCompletedBiometrics?: boolean;
  personalizedPlan?: PersonalizedPlan;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  dailyCalories: number;
  consumedCalories: number;
  proteinGrams: number;
  targetProteinGrams: number;
  carbsGrams: number;
  targetCarbsGrams: number;
  fatGrams: number;
  targetFatGrams: number;
  waterGlasses: number;
  targetWaterGlasses: number;
  streakDays: number;
  joinedDate: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
  language?: AppLanguage;
  dietaryPreferences?: string[];
  allergies?: string[];
  microgreensHarvestedCount?: number;
  chlorophyllGramsEstimated?: number;
}

export type RecipeCategory = 
  | 'todos'
  | 'desayunos'
  | 'almuerzos'
  | 'cenas'
  | 'snacks'
  | 'bebidas'
  | 'macro_calculator';

export interface Recipe {
  id: string;
  title: string;
  category: 'desayunos' | 'almuerzos' | 'cenas' | 'snacks' | 'bebidas';
  categoryLabel: string;
  prepTimeMinutes: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  isFavorite?: boolean;
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Cultivo' | 'Nutrición' | 'Hábitos' | 'Meal Prep';
  progress: number; // 0 to 100
  startDate: string;
  targetDate: string;
  tasks: ProjectTask[];
  status: 'en_progreso' | 'completado' | 'pausado';
  badgeIcon: string;
  colorTag: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  comment: string;
  rating: number;
  tag: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
