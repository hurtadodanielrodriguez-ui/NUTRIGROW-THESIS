import React, { useState } from 'react';
import { 
  Lock, Mail, User, ArrowRight, ArrowLeft, CheckCircle2, 
  Sparkles, Eye, EyeOff, ShieldCheck, Target, Activity, Zap,
  Menu, X, BookOpen, Sprout
} from 'lucide-react';
import { Logo } from './Logo';
import { UserProfile, AuthMode } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { GoogleAccountChooser, SelectedGoogleAccount } from './GoogleAccountChooser';
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
  const { language, t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);
  const [statusNotice, setStatusNotice] = useState('');
  const [error, setError] = useState('');

  // Login form state - completely empty so user enters their own credentials
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regGoal, setRegGoal] = useState<'salud_integral' | 'perder_grasa' | 'ganar_musculo' | 'mantenimiento'>('salud_integral');
  const [regActivity, setRegActivity] = useState<'sedentario' | 'moderado' | 'activo' | 'muy_activo'>('activo');
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleGoogleSignIn = () => {
    setError('');
    setStatusNotice('');
    setShowGoogleChooser(true);
  };

  const handleSelectGoogleAccount = (account: SelectedGoogleAccount) => {
    setShowGoogleChooser(false);
    try {
      confetti({
        particleCount: 75,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335']
      });
    } catch {}

    const googleUser: UserProfile = {
      id: 'usr_google_' + Date.now(),
      name: account.name,
      email: account.email,
      avatar: account.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=0E5C36&color=fff&size=200`,
      bio: `Miembro NutriGrow conectado con Google (${account.email}). Enfocado en nutrición inteligente, cultivo casero y vitalidad diaria.`,
      goal: 'salud_integral',
      activityLevel: 'activo',
      heightCm: 172,
      weightKg: 68.0,
      targetWeightKg: 65.0,
      dailyCalories: 2200,
      consumedCalories: 1550,
      proteinGrams: 105,
      targetProteinGrams: 130,
      carbsGrams: 160,
      targetCarbsGrams: 210,
      fatGrams: 48,
      targetFatGrams: 65,
      waterGlasses: 6,
      targetWaterGlasses: 8,
      streakDays: 3,
      joinedDate: 'Septiembre 2026',
      notificationsEnabled: true,
      theme: isDark ? 'dark' : 'light',
      hasCompletedBiometrics: false,
      language: language
    };

    onLoginSuccess(googleUser);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim();
    const cleanPassword = loginPassword.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !cleanPassword) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setError('Por favor ingresa un formato de correo electrónico válido.');
      return;
    }

    if (cleanPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
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

      const rawUserPart = cleanEmail.split('@')[0] || 'Miembro NutriGrow';
      const formattedName = rawUserPart
        .replace(/[._-]/g, ' ')
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const user: UserProfile = {
        id: 'usr_' + Date.now(),
        name: formattedName,
        email: cleanEmail,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
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
        hasCompletedBiometrics: false,
        language: language
      };

      onLoginSuccess(user);
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = regName.trim();
    const cleanEmail = regEmail.trim();
    const cleanPassword = regPassword.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanName || !cleanEmail || !cleanPassword) {
      setError('Por favor completa todos los campos obligatorios para tu registro.');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setError('Por favor ingresa un correo electrónico válido con formato nombre@dominio.com.');
      return;
    }

    if (cleanPassword.length < 6) {
      setError('La contraseña debe contener al menos 6 caracteres.');
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
        name: cleanName,
        email: cleanEmail,
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
        hasCompletedBiometrics: false,
        language: language
      };

      onLoginSuccess(newUser);
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const demoUser: UserProfile = {
        id: 'usr_demo',
        name: 'Usuario Demo',
        email: 'demo@nutrigrow.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
        bio: 'Explorando NutriGrow en modo demostración para descubrir recetas naturales y proyectos vivos.',
        goal: 'salud_integral',
        activityLevel: 'activo',
        heightCm: 170,
        weightKg: 65.0,
        targetWeightKg: 63.0,
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
        streakDays: 7,
        joinedDate: 'Agosto 2026',
        notificationsEnabled: true,
        theme: isDark ? 'dark' : 'light',
        hasCompletedBiometrics: false,
        language: language
      };
      onLoginSuccess(demoUser);
    }, 400);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4 sm:p-6 py-10 relative">
      {/* TOP BAR: BACK TO LANDING */}
      <div className="w-full max-w-xl flex items-center justify-start mb-5">
        <button
          type="button"
          onClick={onBackToLanding}
          id="btn-auth-back-to-landing"
          className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all cursor-pointer shadow-xs ${
            isDark
              ? 'bg-[#16291E] border-[#70B873]/30 text-gray-200 hover:text-white hover:border-[#70B873]'
              : 'bg-white border-[#0E5C36]/20 text-[#0E5C36] hover:bg-emerald-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
          <span>{t.auth.backToHome}</span>
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
        <div className="text-center mb-6">
          <Logo size="md" isDark={isDark} showSubtitle={false} className="justify-center mb-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
            {mode === 'login' ? t.auth.welcomeTitle : t.auth.registerTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            {mode === 'login' ? t.auth.welcomeSubtitle : t.auth.registerSubtitle}
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
              setStatusNotice('');
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
              mode === 'login'
                ? 'bg-[#0E5C36] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {t.auth.loginTab}
          </button>
          <button
            type="button"
            id="tab-auth-register"
            onClick={() => {
              setMode('register');
              setError('');
              setStatusNotice('');
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
              mode === 'register'
                ? 'bg-[#0E5C36] text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {t.auth.registerTab}
          </button>
        </div>

        {/* GOOGLE SIGN-IN BUTTON (TOP ACTION FOR EASY ACCESS) */}
        <div className="mb-5 space-y-4">
          <button
            type="button"
            id="btn-auth-google-signin"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-2xl font-bold text-sm border flex items-center justify-center gap-3 transition-all duration-200 shadow-sm cursor-pointer hover:shadow-md active:scale-[0.99] ${
              isDark
                ? 'bg-[#0D1912] border-[#70B873]/30 text-white hover:bg-[#152e20] hover:border-[#70B873]'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t.auth.googleSignIn}</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            <span className="absolute px-3 text-[11px] uppercase tracking-wider font-semibold text-gray-400 bg-white dark:bg-[#16291E]">
              {t.auth.orDivider}
            </span>
          </div>
        </div>

        {/* Status / Error banners */}
        {statusNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{statusNotice}</span>
          </div>
        )}

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
                {t.auth.emailLabel}
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
                  {t.auth.passwordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => setStatusNotice('Se ha enviado un enlace de restablecimiento a tu correo registrado.')}
                  className="text-[11px] font-semibold text-[#0E5C36] dark:text-[#70B873] hover:underline cursor-pointer"
                >
                  {t.auth.forgotPassword}
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
                  className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
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
                  <span>{t.auth.submitLogin}</span>
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
                <span>{t.auth.quickDemo}</span>
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
                  Acepto los términos de servicio y deseo recibir recomendaciones vegetales y nutricionales personalizadas.
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

      {/* Real Google Account Chooser Modal */}
      <GoogleAccountChooser
        isOpen={showGoogleChooser}
        onClose={() => setShowGoogleChooser(false)}
        onSelectAccount={handleSelectGoogleAccount}
        isDark={isDark}
      />
    </div>
  );
};
