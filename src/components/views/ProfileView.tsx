import React, { useState } from 'react';
import { 
  User, Target, Activity, Award, Shield, Sparkles, 
  CheckCircle2, Flame, Droplets, Calendar, Edit3, Save, 
  TrendingDown, TrendingUp
} from 'lucide-react';
import { UserProfile } from '../../types';
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
  const [editForm, setEditForm] = useState({
    name: user.name,
    bio: user.bio,
    heightCm: user.heightCm,
    weightKg: user.weightKg,
    targetWeightKg: user.targetWeightKg,
    goal: user.goal,
    activityLevel: user.activityLevel
  });

  const bmi = Number((user.weightKg / Math.pow(user.heightCm / 100, 2)).toFixed(1));
  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { text: 'Bajo peso', color: 'text-amber-500' };
    if (val < 24.9) return { text: 'Peso Óptimo / Saludable', color: 'text-emerald-500' };
    if (val < 29.9) return { text: 'Sobrepeso leve', color: 'text-amber-600' };
    return { text: 'Revisión recomendada', color: 'text-red-500' };
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
    { title: 'Chef Botánico', desc: 'Preparó más de 10 recetas antiinflamatorias', icon: '🥗', level: 'Nivel 2' }
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
                  Miembro NutriGrow
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
            <span>{isEditing ? 'Cancelar Edición' : 'Editar Datos'}</span>
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
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[#0E5C36] text-white hover:bg-[#16472D] flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* BIOMETRICS & TARGETS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-5 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <span className="text-xs uppercase font-bold text-gray-400">Índice Masa Corporal</span>
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
          <span className="text-xs uppercase font-bold text-gray-400">Peso Objetivo</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-display">{user.targetWeightKg}</span>
            <span className="text-xs text-gray-400">kg</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 block mt-2 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
            Diferencia: {(user.weightKg - user.targetWeightKg).toFixed(1)} kg
          </span>
        </div>

        <div
          className={`p-5 rounded-3xl border shadow-sm ${
            isDark ? 'bg-[#16291E] border-[#70B873]/20 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
          }`}
        >
          <span className="text-xs uppercase font-bold text-gray-400">Meta Calórica Diaria</span>
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
          <span className="text-xs uppercase font-bold text-gray-400">Constancia & Racha</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold font-display text-amber-500">{user.streakDays}</span>
            <span className="text-xs text-gray-400">días seguidos</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 block mt-2">
            ¡Sigue así para desbloquear el Nivel 4!
          </span>
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
          <h2 className="text-xl font-bold font-display">Insignias & Logros de Bienestar</h2>
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
