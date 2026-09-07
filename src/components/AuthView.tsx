import React, { useState } from 'react';
import { 
  Lock, Mail, User, ArrowRight, ArrowLeft, CheckCircle2, 
  Sparkles, Eye, EyeOff, ShieldCheck, Target, Activity, Zap
} from 'lucide-react';
import { Logo } from './Logo';
import { UserProfile, AuthMode } from '../types';
import confetti from 'canvas-confetti';

interface AuthViewProps {
  initialMode?: AuthMode;
  onLoginSuccess: (user: UserProfile) => void;
  onBackToLanding: () => void;
  isDark?: boolean;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onBackToLanding,
  isDark = false
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('camila.morales@nutrigrow.com');
  const [loginPassword, setLoginPassword] = useState('nutri1234');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regGoal, setRegGoal] = useState<'salud_integral' | 'perder_grasa' | 'ganar_musculo' | 'mantenimiento'>('salud_integral');
  const [regActivity, setRegActivity] = useState<'sedentario' | 'moderado' | 'activo' | 'muy_activo'>('activo');
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0E5C36', '#70B873', '#F4D06F']
        });
      } catch {}

      const user: UserProfile = {
        id: 'usr_' + Date.now(),
        name: loginEmail.includes('camila') ? 'Camila Morales' : loginEmail.split('@')[0],
        email: loginEmail,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        bio: 'Buscando el balance perfecto entre nutrición viva, recetas deliciosas y energía vital diaria.',
        goal: 'salud_integral',
        activityLevel: 'activo',
        heightCm: 168,
        weightKg: 62.5,
        targetWeightKg: 60.0,
        dailyCalories: 2100,
        consumedCalories: 1450,
        proteinGrams: 98,
        targetProteinGrams: 120,
        carbsGrams: 140,
        targetCarbsGrams: 190,
        fatGrams: 42,
        targetFatGrams: 60,
        waterGlasses: 6,
        targetWaterGlasses: 8,
        streakDays: 14,
        joinedDate: 'Agosto 2026',
        notificationsEnabled: true,
        theme: isDark ? 'dark' : 'light',
        hasCompletedBiometrics: false
      };

      onLoginSuccess(user);
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Por favor completa todos los campos para tu registro.');
      return;
    }
    if (!termsAccepted) {
      setError('Por favor acepta las políticas de nutrición y privacidad.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#0E5C36', '#70B873', '#F4D06F', '#86EFAC']
        });
      } catch {}

      const newUser: UserProfile = {
        id: 'usr_' + Date.now(),
        name: regName,
        email: regEmail,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
        bio: `Nuevo miembro en NutriGrow enfocado en ${regGoal.replace('_', ' ')}.`,
        goal: regGoal,
        activityLevel: regActivity,
        heightCm: 170,
        weightKg: 68.0,
        targetWeightKg: 65.0,
        dailyCalories: regGoal === 'perder_grasa' ? 1800 : regGoal === 'ganar_musculo' ? 2400 : 2000,
        consumedCalories: 600,
        proteinGrams: 45,
        targetProteinGrams: 110,
        carbsGrams: 65,
        targetCarbsGrams: 180,
        fatGrams: 20,
        targetFatGrams: 55,
        waterGlasses: 3,
        targetWaterGlasses: 8,
        streakDays: 1,
        joinedDate: 'Hoy',
        notificationsEnabled: true,
        theme: isDark ? 'dark' : 'light',
        hasCompletedBiometrics: false
      };

      onLoginSuccess(newUser);
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setLoginEmail('camila.morales@nutrigrow.com');
    setLoginPassword('nutri1234');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const demoUser: UserProfile = {
        id: 'usr_demo',
        name: 'Camila Morales',
        email: 'camila.morales@nutrigrow.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        bio: 'Miembro VIP en NutriGrow. Explorando recetas botánicas y proyectos de germinados.',
        goal: 'salud_integral',
        activityLevel: 'activo',
        heightCm: 168,
        weightKg: 62.5,
        targetWeightKg: 60.0,
        dailyCalories: 2100,
        consumedCalories: 1450,
        proteinGrams: 98,
        targetProteinGrams: 120,
        carbsGrams: 140,
        targetCarbsGrams: 190,
        fatGrams: 42,
        targetFatGrams: 60,
        waterGlasses: 6,
        targetWaterGlasses: 8,
        streakDays: 14,
        joinedDate: 'Agosto 2026',
        notificationsEnabled: true,
        theme: isDark ? 'dark' : 'light',
        hasCompletedBiometrics: false
      };
      onLoginSuccess(demoUser);
    }, 400);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4 sm:p-6 py-12">
      {/* Back button */}
      <div className="w-full max-w-xl flex justify-start mb-6">
        <button
          onClick={onBackToLanding}
          id="btn-auth-back-to-landing"
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
            isDark
              ? 'bg-[#16291E] border-[#70B873]/30 text-gray-200 hover:text-white hover:border-[#70B873]'
              : 'bg-white border-[#0E5C36]/20 text-[#0E5C36] hover:bg-emerald-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Página Principal</span>
        </button>
      </div>

      <div
        id="auth-main-card"
        className={`w-full max-w-xl rounded-3xl p-6 sm:p-10 border shadow-2xl transition-all duration-300 ${
          isDark
            ? 'bg-[#16291E] border-[#70B873]/30 text-white shadow-black/60'
            : 'bg-white border-[#0E5C36]/20 text-gray-800 shadow-emerald-950/10'
        }`}
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Logo size="md" isDark={isDark} showSubtitle={false} className="justify-center mb-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
            {mode === 'login' ? 'Bienvenido a tu Espacio' : 'Crea tu Cuenta en NutriGrow'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            {mode === 'login'
              ? 'Accede a tus recetas favoritas, metas nutricionales y proyectos vivos.'
              : 'Únete a la comunidad de nutrición consciente y autocultivo.'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex rounded-2xl p-1 bg-gray-100 dark:bg-[#0D1912] mb-6 border border-emerald-900/10 dark:border-emerald-500/20">
          <button
            type="button"
            id="tab-auth-login"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
              mode === 'login'
                ? 'bg-[#0E5C36] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            id="tab-auth-register"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
              mode === 'register'
                ? 'bg-[#0E5C36] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Registrarme
          </button>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <span className="font-semibold">Atención:</span>
            <span>{error}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 text-gray-400" />
                <input
                  id="input-login-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                    isDark
                      ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873]'
                      : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36]'
                  }`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => alert('Se ha enviado un enlace de recuperación simulado a tu correo.')}
                  className="text-[11px] font-semibold text-[#0E5C36] dark:text-[#70B873] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3.5 text-gray-400" />
                <input
                  id="input-login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                    isDark
                      ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873]'
                      : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="btn-submit-login"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#0E5C36] text-white hover:bg-[#16472D] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ingresar a NutriGrow</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Access */}
            <div className="pt-2">
              <button
                type="button"
                id="btn-quick-demo-login"
                onClick={handleQuickDemoLogin}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#0D1912] border-[#70B873]/40 text-[#70B873] hover:bg-[#70B873]/10'
                    : 'bg-emerald-50 border-[#0E5C36]/30 text-[#0E5C36] hover:bg-emerald-100'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Acceso Rápido Demo (1 Clic)</span>
              </button>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Nombre Completo *
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 absolute left-3.5 text-gray-400" />
                <input
                  id="input-reg-name"
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ej. Andrés Gómez"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                    isDark
                      ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873]'
                      : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Correo Electrónico *
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 absolute left-3.5 text-gray-400" />
                <input
                  id="input-reg-email"
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="andres@ejemplo.com"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                    isDark
                      ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873]'
                      : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Crear Contraseña *
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 absolute left-3.5 text-gray-400" />
                <input
                  id="input-reg-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className={`w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                    isDark
                      ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873]'
                      : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  <Target className="w-3.5 h-3.5 inline mr-1 text-[#70B873]" /> Meta Nutricional
                </label>
                <select
                  value={regGoal}
                  onChange={(e) => setRegGoal(e.target.value as any)}
                  className={`w-full px-3 py-2 text-xs font-medium rounded-xl border outline-none ${
                    isDark
                      ? 'bg-[#0D1912] border-[#70B873]/30 text-white'
                      : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="salud_integral">🌱 Salud Integral & Vitalidad</option>
                  <option value="perder_grasa">🔥 Quema de Grasa Saludable</option>
                  <option value="ganar_musculo">💪 Ganancia Muscular Magra</option>
                  <option value="mantenimiento">⚖️ Mantenimiento & Hábitos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                  <Activity className="w-3.5 h-3.5 inline mr-1 text-[#70B873]" /> Nivel de Actividad
                </label>
                <select
                  value={regActivity}
                  onChange={(e) => setRegActivity(e.target.value as any)}
                  className={`w-full px-3 py-2 text-xs font-medium rounded-xl border outline-none ${
                    isDark
                      ? 'bg-[#0D1912] border-[#70B873]/30 text-white'
                      : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="sedentario">Sedentario (Oficina / Poco ejercicio)</option>
                  <option value="moderado">Moderado (1-3 días x semana)</option>
                  <option value="activo">Activo (3-5 días x semana)</option>
                  <option value="muy_activo">Muy Activo (Atleta / Diario)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 rounded text-[#0E5C36] focus:ring-[#70B873]"
                />
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  Acepto los términos de servicio y deseo recibir recomendaciones botánicas y nutricionales personalizadas.
                </span>
              </label>
            </div>

            <button
              type="submit"
              id="btn-submit-register"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#0E5C36] text-white hover:bg-[#16472D] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 cursor-pointer mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#70B873]" />
                  <span>Crear Mi Cuenta Gratuita</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#70B873]" />
          <span>Tus datos de salud y privacidad están 100% protegidos</span>
        </div>
      </div>
    </div>
  );
};
