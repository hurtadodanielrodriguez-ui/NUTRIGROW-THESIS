import React, { useState } from 'react';
import { 
  UtensilsCrossed, Coffee, Salad, MoonStar, Apple, 
  GlassWater, Calculator, Search, Clock, Flame, 
  Target, Heart, Star, Check, Plus, X, Play, RotateCcw, 
  Sparkles, CheckCircle2, ChevronRight, Bookmark
} from 'lucide-react';
import { Recipe, RecipeCategory, UserProfile } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';

interface RecipesViewProps {
  recipes: Recipe[];
  onToggleFavorite: (recipeId: string) => void;
  selectedCategory: RecipeCategory;
  onSelectCategory: (cat: RecipeCategory) => void;
  selectedRecipe: Recipe | null;
  onSelectRecipe: (recipe: Recipe | null) => void;
  user: UserProfile;
  isDark: boolean;
}

export const RecipesView: React.FC<RecipesViewProps> = ({
  recipes,
  onToggleFavorite,
  selectedCategory,
  onSelectCategory,
  selectedRecipe,
  onSelectRecipe,
  user,
  isDark
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterTag, setActiveFilterTag] = useState('Todos');
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  // Macro Calculator state
  const [calcWeight, setCalcWeight] = useState(user.weightKg || 65);
  const [calcHeight, setCalcHeight] = useState(user.heightCm || 170);
  const [calcAge, setCalcAge] = useState(28);
  const [calcGender, setCalcGender] = useState<'female' | 'male'>('female');
  const [calcActivity, setCalcActivity] = useState(1.4); // 1.2, 1.375, 1.55, 1.725
  const [calcGoal, setCalcGoal] = useState<'perder' | 'mantener' | 'ganar'>('mantener');
  const [calcResult, setCalcResult] = useState<{
    tdee: number;
    targetCalories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatsGrams: number;
  } | null>(null);

  const categoryButtons: { id: RecipeCategory; label: string; icon: any }[] = [
    { id: 'todos', label: t.recipes.allDishes, icon: UtensilsCrossed },
    { id: 'desayunos', label: t.recipes.breakfasts, icon: Coffee },
    { id: 'almuerzos', label: t.recipes.lunches, icon: Salad },
    { id: 'cenas', label: t.recipes.dinners, icon: MoonStar },
    { id: 'snacks', label: t.recipes.snacks, icon: Apple },
    { id: 'bebidas', label: t.recipes.drinks, icon: GlassWater },
    { id: 'macro_calculator', label: t.recipes.calculator, icon: Calculator }
  ];

  const allTags = ['Todos', 'Vegano', 'Alto en Proteína', 'Antiinflamatorio', 'Sin Gluten', 'Microgreens', 'Detox'];

  const filteredRecipes = recipes.filter((r) => {
    const matchesCategory =
      selectedCategory === 'todos' ||
      selectedCategory === 'macro_calculator' ||
      r.category === selectedCategory;

    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      activeFilterTag === 'Todos' || r.tags.includes(activeFilterTag);

    return matchesCategory && matchesSearch && matchesTag;
  });

  const handleCalculateMacros = (e: React.FormEvent) => {
    e.preventDefault();
    // Mifflin-St Jeor formula
    let bmr = 10 * calcWeight + 6.25 * calcHeight - 5 * calcAge;
    bmr += calcGender === 'female' ? -161 : 5;

    const tdee = Math.round(bmr * calcActivity);
    let targetCalories = tdee;
    if (calcGoal === 'perder') targetCalories = Math.round(tdee * 0.82);
    if (calcGoal === 'ganar') targetCalories = Math.round(tdee * 1.15);

    // Split: 30% Protein, 45% Carbs, 25% Fat
    const proteinGrams = Math.round((targetCalories * 0.3) / 4);
    const carbsGrams = Math.round((targetCalories * 0.45) / 4);
    const fatsGrams = Math.round((targetCalories * 0.25) / 9);

    setCalcResult({
      tdee,
      targetCalories,
      proteinGrams,
      carbsGrams,
      fatsGrams
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0E5C36', '#70B873', '#F4D06F']
      });
    } catch {}
  };

  const toggleStep = (idx: number) => {
    if (completedSteps.includes(idx)) {
      setCompletedSteps(completedSteps.filter((s) => s !== idx));
    } else {
      setCompletedSteps([...completedSteps, idx]);
    }
  };

  return (
    <div id="view-recetas-section" className="space-y-8 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
            <UtensilsCrossed className="w-3.5 h-3.5" /> {t.recipes.badge}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            {t.recipes.title} <span className="text-[#0E5C36] dark:text-[#70B873]">{t.recipes.subtitle}</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            {t.recipes.desc}
          </p>
        </div>

        {/* SEARCH BAR */}
        {selectedCategory !== 'macro_calculator' && (
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.recipes.searchPlaceholder}
              className={`w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border outline-none transition-all ${
                isDark
                  ? 'bg-[#16291E] border-[#70B873]/30 text-white focus:border-[#70B873]'
                  : 'bg-white border-[#0E5C36]/20 text-gray-900 focus:border-[#0E5C36]'
              }`}
            />
          </div>
        )}
      </div>

      {/* CATEGORY SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryButtons.map((cat) => {
          const IconComp = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#0E5C36] text-white shadow-md'
                  : isDark
                  ? 'bg-[#16291E] text-gray-300 hover:bg-[#70B873]/20 hover:text-white border border-[#70B873]/20'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-[#0E5C36]/15'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* MACRO CALCULATOR VIEW */}
      {selectedCategory === 'macro_calculator' ? (
        <div
          id="macro-calculator-card"
          className={`rounded-3xl p-6 sm:p-10 border shadow-xl ${
            isDark ? 'bg-[#16291E] border-[#70B873]/30 text-white' : 'bg-white border-[#0E5C36]/20 text-gray-800'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display">Calculadora de Macronutrientes</h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Ajusta tu ingesta calórica y distribución de proteínas, carbohidratos y grasas con precisión clínica.
              </p>
            </div>
          </div>

          <form onSubmit={handleCalculateMacros} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Peso Actual (kg)
                </label>
                <input
                  type="number"
                  min={30}
                  max={250}
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  min={100}
                  max={230}
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Edad
                </label>
                <input
                  type="number"
                  min={15}
                  max={100}
                  value={calcAge}
                  onChange={(e) => setCalcAge(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Sexo Biológico
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcGender('female')}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      calcGender === 'female'
                        ? 'bg-[#0E5C36] text-white border-[#0E5C36]'
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    Femenino
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcGender('male')}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      calcGender === 'male'
                        ? 'bg-[#0E5C36] text-white border-[#0E5C36]'
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    Masculino
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Nivel de Actividad
                </label>
                <select
                  value={calcActivity}
                  onChange={(e) => setCalcActivity(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-[#16291E] outline-none"
                >
                  <option value={1.2}>Sedentario (Poco o nada)</option>
                  <option value={1.375}>Ligero (1-3 días/semana)</option>
                  <option value={1.55}>Moderado (3-5 días/semana)</option>
                  <option value={1.725}>Muy Activo (6-7 días/semana)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Meta
                </label>
                <select
                  value={calcGoal}
                  onChange={(e) => setCalcGoal(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-[#16291E] outline-none"
                >
                  <option value="perder">🔥 Pérdida de Grasa (Déficit -18%)</option>
                  <option value="mantener">⚖️ Mantenimiento Saludable</option>
                  <option value="ganar">💪 Ganancia Muscular (+15%)</option>
                </select>
              </div>
            </div>

            {/* Results Display */}
            <div className="flex flex-col justify-between p-5 rounded-2xl bg-emerald-50/70 dark:bg-[#0D1912]/80 border border-emerald-500/20">
              {calcResult ? (
                <div className="space-y-4 animate-in fade-in">
                  <div className="text-center pb-3 border-b border-emerald-500/20">
                    <span className="text-xs uppercase font-bold text-gray-500">Objetivo Calórico</span>
                    <h3 className="text-3xl font-extrabold text-[#0E5C36] dark:text-[#70B873]">
                      {calcResult.targetCalories} <span className="text-sm font-normal text-gray-500">kcal/día</span>
                    </h3>
                    <p className="text-[11px] text-gray-400">Gasto metabólico estimado (TDEE): {calcResult.tdee} kcal</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-emerald-700 dark:text-[#70B873]">🥩 Proteínas (30%):</span>
                      <span>{calcResult.proteinGrams}g</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-blue-600 dark:text-blue-400">🌾 Carbohidratos (45%):</span>
                      <span>{calcResult.carbsGrams}g</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-amber-600 dark:text-amber-400">🥑 Grasas Saludables (25%):</span>
                      <span>{calcResult.fatsGrams}g</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center h-full text-gray-400 py-6">
                  <Target className="w-10 h-10 mb-2 opacity-50 text-[#70B873]" />
                  <p className="text-xs">Presiona el botón para calcular tus macros personalizados.</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl font-bold text-xs bg-[#0E5C36] text-white hover:bg-[#16472D] transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#70B873]" />
                <span>Calcular Mis Macros</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* TAG FILTER CHIPS */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilterTag(tag)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                  activeFilterTag === tag
                    ? 'bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] border border-[#70B873]/40'
                    : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* RECIPES CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className={`group rounded-3xl border overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#16291E] border-[#70B873]/20 text-white hover:border-[#70B873]'
                    : 'bg-white border-[#0E5C36]/15 text-gray-800 hover:border-[#0E5C36]'
                }`}
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category pill */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0E5C36]/90 text-white backdrop-blur-md">
                      {recipe.categoryLabel}
                    </span>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(recipe.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-md"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          recipe.isFavorite
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5" /> {recipe.prepTimeMinutes} min
                      </span>
                      <span className="font-bold px-2 py-0.5 rounded-md bg-[#70B873]/90 text-black">
                        {recipe.calories} kcal
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{recipe.rating}</span>
                      <span className="text-gray-400 font-normal">({recipe.reviewsCount})</span>
                    </div>

                    <h3 className="font-bold text-base font-display line-clamp-1 group-hover:text-[#0E5C36] dark:group-hover:text-[#70B873] transition-colors">
                      {recipe.title}
                    </h3>

                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {recipe.description}
                    </p>

                    {/* Macros Bar */}
                    <div className="pt-2 flex items-center justify-between text-[11px] font-bold border-t border-gray-100 dark:border-gray-800">
                      <span className="text-emerald-700 dark:text-[#70B873]">P: {recipe.protein}g</span>
                      <span className="text-blue-600 dark:text-blue-400">C: {recipe.carbs}g</span>
                      <span className="text-amber-600 dark:text-amber-400">G: {recipe.fats}g</span>
                    </div>
                  </div>
                </div>

                {/* Open detail button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => {
                      onSelectRecipe(recipe);
                      setServingsMultiplier(1);
                      setCompletedSteps([]);
                    }}
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-50 dark:bg-[#0D1912] text-[#0E5C36] dark:text-[#70B873] border border-emerald-600/20 hover:bg-[#0E5C36] hover:text-white dark:hover:bg-[#70B873] dark:hover:text-[#0D1912] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.recipes.viewDetails}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* DETAILED RECIPE MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div
            className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
              isDark ? 'bg-[#16291E] border-[#70B873]/30 text-white' : 'bg-white border-[#0E5C36]/20 text-gray-800'
            }`}
          >
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <button
                onClick={() => onSelectRecipe(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0E5C36] text-white inline-block mb-2">
                  {selectedRecipe.categoryLabel}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold font-display">
                  {selectedRecipe.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Quick Info & Serving multiplier */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#0D1912] border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">{t.recipes.prepTime}</span>
                    <span className="font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#70B873]" /> {selectedRecipe.prepTimeMinutes} min
                    </span>
                  </div>
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">{t.recipes.calories}</span>
                    <span className="font-bold text-[#0E5C36] dark:text-[#70B873]">
                      {selectedRecipe.calories * servingsMultiplier} kcal
                    </span>
                  </div>
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">{t.recipes.difficulty}</span>
                    <span className="font-bold">{selectedRecipe.difficulty}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">Porciones:</span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setServingsMultiplier(Math.max(1, servingsMultiplier - 1))}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold">{servingsMultiplier}</span>
                    <button
                      onClick={() => setServingsMultiplier(servingsMultiplier + 1)}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Ingredients section */}
              <div>
                <h3 className="text-lg font-bold font-display mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                  <span>{t.recipes.ingredients} ({selectedRecipe.ingredients.length})</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="p-2.5 rounded-xl text-xs sm:text-sm bg-emerald-50/50 dark:bg-[#0D1912]/50 border border-emerald-900/10 dark:border-emerald-500/10 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#70B873] shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-step instructions checklist */}
              <div>
                <h3 className="text-lg font-bold font-display mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                  <span>{t.recipes.instructions}</span>
                </h3>
                <div className="space-y-3">
                  {selectedRecipe.instructions.map((step, idx) => {
                    const isDone = completedSteps.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleStep(idx)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isDone
                            ? 'bg-emerald-100/60 dark:bg-emerald-950/40 border-emerald-500 text-gray-500'
                            : 'bg-transparent border-gray-200 dark:border-gray-800'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#0E5C36]/20 text-[#0E5C36] dark:text-[#70B873]'
                          }`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'line-through' : ''}`}>
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Close / Action footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => onSelectRecipe(null)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#0E5C36] text-white hover:bg-[#16472D] transition-colors"
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
