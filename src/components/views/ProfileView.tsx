import React, { useState } from 'react';
import { 
  User, Target, Activity, Award, Shield, Sparkles, 
  CheckCircle2, Flame, Droplets, Calendar, Edit3, Save, 
  TrendingDown, TrendingUp, Globe, Check
} from 'lucide-react';
import { UserProfile, AppLanguage } from '../../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../utils/translations';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  isDark: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  isDark
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [langFeedback, setLangFeedback] = useState('');
  const currentLang = user.language || 'es';
  const t = getTranslation(currentLang);

  const [editForm, setEditForm] = useState({
    name: user.name,
    bio: user.bio,
    heightCm: user.heightCm,
    weightKg: user.weightKg,
    targetWeightKg: user.targetWeightKg,
    goal: user.goal,
    activityLevel: user.activityLevel,
    language: currentLang
  });

  const handleLanguageChange = (newLang: AppLanguage) => {
    onUpdateUser({ language: newLang });
    setEditForm((prev) => ({ ...prev, language: newLang }));
    try {
      localStorage.setItem('nutrigrow_lang', newLang);
    } catch {}

    const selectedOpt = SUPPORTED_LANGUAGES.find((l) => l.code === newLang);
    setLangFeedback(`${selectedOpt?.name || newLang}`);
    setTimeout(() => setLangFeedback(''), 3000);

    try {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#0E5C36', '#70B873', '#F4D06F']
      });
    } catch {}
  };

  const bmi = Number((user.weightKg / Math.pow(user.heightCm / 100, 2)).toFixed(1));
  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { text: currentLang === 'en' ? 'Underweight' : currentLang === 'fr' ? 'Poids insuffisant' : 'Bajo peso', color: 'text-amber-500' };
    if (val < 24.9) return { text: currentLang === 'en' ? 'Optimal Weight' : currentLang === 'fr' ? 'Poids optimal' : 'Peso Óptimo / Saludable', color: 'text-emerald-500' };
    if (val < 29.9) return { text: currentLang === 'en' ? 'Slight overweight' : currentLang === 'fr' ? 'Léger surpoids' : 'Sobrepeso leve', color: 'text-amber-600' };
    return { text: currentLang === 'en' ? 'Check recommended' : currentLang === 'fr' ? 'Suivi conseillé' : 'Revisión recomendada', color: 'text-red-500' };
  };

  const bmiInfo = getBmiCategory(bmi);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...editForm
    });
    setIsEditing(false);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#0E5C36', '#70B873']
      });
    } catch {}
  };

  const badges = [
    { title: 'Sembrador Vital', desc: 'Completó su primer proyecto de microgreens', icon: '🌱', level: 'Nivel 2' },
    { title: 'Racha Dorada', desc: '14 días consecutivos registrando hábitos', icon: '🔥', level: 'Nivel 3' },
    { title: 'Hidratación Zen', desc: '8 vasos diarios durante 1 semana', icon: '💧', level: 'Nivel 1' },
    { title: 'Chef Vegetal', desc: 'Preparó más de 10 recetas antiinflamatorias', icon: '🥗', level: 'Nivel 2' }
  ];

  return (
    <div id="view-perfil-section" className="space-y-8 animate-in fade-in duration-300">
      {/* HEADER BIO CARD */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-xl ${
          isDark ? 'bg-[#16291E] border-[#70B873]/25 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#70B873]/50 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#0E5C36] text-white flex items-center justify-center text-xs font-bold shadow-md">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
                  {t.profile.memberBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md pt-1 leading-relaxed">
                "{user.bio}"
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-emerald-600/30 text-[#0E5C36] dark:text-[#70B873] hover:bg-[#0E5C36] hover:text-white dark:hover:bg-[#70B873] dark:hover:text-black transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? t.profile.cancelEdit : t.profile.editData}</span>
          </button>
        </div>

        {/* EDIT FORM (Conditionally open) */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-[#0E5C36] dark:text-[#70B873]">
              Actualizar Información de Perfil
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Altura (cm)</label>
                <input
                  type="number"
                  value={editForm.heightCm}
                  onChange={(e) => setEditForm({ ...editForm, heightCm: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Peso Actual (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={editForm.weightKg}
                  onChange={(e) => setEditForm({ ...editForm, weightKg: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Meta Principal</label>
                <select
                  value={editForm.goal}
                  onChange={(e) => setEditForm({ ...editForm, goal: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-[#16291E] outline-none"
                >
                  <option value="salud_integral">Salud Integral & Vitalidad</option>
                  <option value="perder_grasa">Pérdida de Grasa</option>
                  <option value="ganar_musculo">Ganancia Muscular</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Nivel de Actividad</label>
                <select
                  value={editForm.activityLevel}
                  onChange={(e) => setEditForm({ ...editForm, activityLevel: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-[#16291E] outline-none"
                >
                  <option value="sedentario">Sedentario</option>
                  <option value="moderado">Moderado</option>
                  <option value="activo">Activo</option>
                  <option value="muy_activo">Muy Activo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">{t.profile.languageSectionTitle}</label>
                <select
                  value={editForm.language}
                  onChange={(e) => setEditForm({ ...editForm, language: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-[#16291E] outline-none"
                >
                  <option value="es">🇪🇸 Español</option>
                  <option value="en">🇬🇧 English (Inglés)</option>
                  <option value="fr">🇫🇷 Français (Francés)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700"
              >
                {t.profile.close}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[#0E5C36] text-white hover:bg-[#16472D] flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{t.profile.saveChanges}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* DEDICATED LANGUAGE SELECTOR CARD (SPANISH, ENGLISH, FRENCH) */}
      <div
        id="profile-language-section"
        className={`rounded-3xl p-6 sm:p-7 border shadow-lg transition-all ${
          isDark ? 'bg-[#16291E] border-[#70B873]/25 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#70B873]/20 flex items-center justify-center text-[#0E5C36] dark:text-[#70B873] shrink-0 shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-display">
                  {t.profile.languageSectionTitle}
                </h3>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-[#0E5C36] text-white">
                  3 {currentLang === 'en' ? 'Languages' : currentLang === 'fr' ? 'Langues' : 'Idiomas'}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {t.profile.languageSectionDesc}
              </p>
            </div>
          </div>

          {langFeedback && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 text-[#0E5C36] dark:text-[#70B873] text-xs font-bold animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>{t.profile.languageChangedNotice} {langFeedback}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                id={`btn-lang-${lang.code}`}
                onClick={() => handleLanguageChange(lang.code)}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? isDark
                      ? 'bg-[#0E5C36]/30 border-[#70B873] text-white ring-2 ring-[#70B873]/50 shadow-md'
                      : 'bg-emerald-50/80 border-[#0E5C36] text-[#0E5C36] ring-2 ring-[#0E5C36]/20 shadow-md'
                    : isDark
                    ? 'bg-[#0D1912]/50 border-gray-800 text-gray-300 hover:border-gray-600 hover:bg-[#0D1912]'
                    : 'bg-gray-50/70 border-gray-200 text-gray-700 hover:border-[#0E5C36]/40 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl select-none" role="img" aria-label={lang.name}>
                    {lang.flag}
                  </span>
                  <div>
                    <p className="text-sm font-bold tracking-tight">{lang.name}</p>
                    <p className="text-[11px] opacity-75 font-medium">{lang.nativeName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-[#0E5C36] text-white flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* BIOMETRICS & TARGETS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-5 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <span className="text-xs uppercase font-bold text-gray-400">{t.profile.bmiTitle}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-display">{bmi}</span>
            <span className="text-xs text-gray-400">IMC</span>
          </div>
          <span className={`text-xs font-bold block mt-2 ${bmiInfo.color}`}>{bmiInfo.text}</span>
        </div>

        <div
          className={`p-5 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <span className="text-xs uppercase font-bold text-gray-400">{t.profile.targetWeightTitle}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-display">{user.targetWeightKg}</span>
            <span className="text-xs text-gray-400">kg</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 block mt-2 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
            {t.profile.difference}: {(user.weightKg - user.targetWeightKg).toFixed(1)} kg
          </span>
        </div>

        <div
          className={`p-5 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <span className="text-xs uppercase font-bold text-gray-400">{t.profile.dailyCaloriesTitle}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-display">{user.dailyCalories}</span>
            <span className="text-xs text-gray-400">kcal</span>
          </div>
          <span className="text-xs text-emerald-600 dark:text-[#70B873] font-bold block mt-2">
            Ajustado para {user.goal.replace('_', ' ')}
          </span>
        </div>

        <div
          className={`p-5 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <span className="text-xs uppercase font-bold text-gray-400">{t.profile.streakTitle}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-display text-amber-500">{user.streakDays}</span>
            <span className="text-xs text-gray-400">{t.profile.daysConsecutive}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 block mt-2">
            {t.profile.keepGoing}
          </span>
        </div>
      </div>

      {/* NATURAL CULTIVATION & NUTRITIONAL PREFERENCES SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Natural Microgreens Impact */}
        <div
          className={`rounded-3xl p-6 border shadow-sm space-y-4 ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#70B873]/20 flex items-center justify-center text-[#0E5C36] dark:text-[#70B873]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold font-display">
                {currentLang === 'en' ? 'Natural Vitality Impact' : currentLang === 'fr' ? 'Impact de Vitalité Naturelle' : 'Impact de Vitalidad Natural'}
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0E5C36] text-white">
              Activo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#0D1912]/60 border-gray-800' : 'bg-emerald-50/40 border-emerald-900/10'}`}>
              <p className="text-[11px] text-gray-400 font-bold uppercase">Bandejas Cosechadas</p>
              <p className="text-2xl font-extrabold text-[#0E5C36] dark:text-[#70B873] mt-0.5">
                {user.microgreensHarvestedCount || 14}
              </p>
              <p className="text-[10px] text-gray-500 mt-1">Rábano, Brócoli y Girasol</p>
            </div>

            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#0D1912]/60 border-gray-800' : 'bg-emerald-50/40 border-emerald-900/10'}`}>
              <p className="text-[11px] text-gray-400 font-bold uppercase">Clorofila Asimilada</p>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                ~{user.chlorophyllGramsEstimated || 120}g
              </p>
              <p className="text-[10px] text-gray-500 mt-1">Poder antioxidante puro</p>
            </div>

            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#0D1912]/60 border-gray-800' : 'bg-emerald-50/40 border-emerald-900/10'}`}>
              <p className="text-[11px] text-gray-400 font-bold uppercase">Agua Ahorrada</p>
              <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-0.5">
                85%
              </p>
              <p className="text-[10px] text-gray-500 mt-1">vs agricultura tradicional</p>
            </div>

            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-[#0D1912]/60 border-gray-800' : 'bg-emerald-50/40 border-emerald-900/10'}`}>
              <p className="text-[11px] text-gray-400 font-bold uppercase">Nivel de Frescura</p>
              <p className="text-2xl font-extrabold text-amber-500 mt-0.5">
                100%
              </p>
              <p className="text-[10px] text-gray-500 mt-1">Cosecha directa a plato</p>
            </div>
          </div>
        </div>

        {/* Preferences & Dietary Needs */}
        <div
          className={`rounded-3xl p-6 border shadow-sm space-y-4 ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#70B873]/20 flex items-center justify-center text-[#0E5C36] dark:text-[#70B873]">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold font-display">
              {currentLang === 'en' ? 'Dietary Lifestyle & Nutrition' : currentLang === 'fr' ? 'Mode de Vie et Nutrition' : 'Estilo de Alimentación & Alergias'}
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {currentLang === 'en' ? 'Dietary Preferences' : currentLang === 'fr' ? 'Préférences Alimentaires' : 'Preferencias Alimentarias'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(user.dietaryPreferences && user.dietaryPreferences.length > 0 
                  ? user.dietaryPreferences 
                  : ['Vegetariano Flexible', 'Microgreens Lover', 'Alimentos Vivos', 'Bajo en Sodio']
                ).map((pref, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#70B873]/15 text-[#0E5C36] dark:text-[#70B873] border border-[#70B873]/30"
                  >
                    ✓ {pref}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {currentLang === 'en' ? 'Allergens / Intolerances' : currentLang === 'fr' ? 'Allergènes / Intolérances' : 'Alergias o Intolerancias'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(user.allergies && user.allergies.length > 0
                  ? user.allergies
                  : ['Sin intolerancias registradas']
                ).map((al, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40"
                  >
                    🛡️ {al}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Hidratación Recomendada Diaria
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#70B873] h-full rounded-full w-3/4"></div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-[#70B873]">
                  2.4 L / día
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS & BADGES */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-sm space-y-4 ${
          isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold font-display">{t.profile.badgesTitle}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {badges.map((badge, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-transform hover:scale-102 ${
                isDark ? 'bg-[#0D1912]/70 border-[#70B873]/20' : 'bg-emerald-50/50 border-emerald-900/10'
              }`}
            >
              <div className="text-3xl">{badge.icon}</div>
              <h4 className="font-bold text-sm font-display">{badge.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0E5C36] text-white">
                {badge.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
