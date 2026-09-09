import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, User, UtensilsCrossed, Sprout, Settings, 
  ChevronDown, Sun, Moon, LogOut, Sparkles, Coffee, 
  Salad, MoonStar, Apple, GlassWater, Calculator,
  Sliders, Shield, Bell, Check, Menu, X, ChevronRight, Globe
} from 'lucide-react';
import { Logo } from './Logo';
import { ViewMode, RecipeCategory, UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode, recipeCategory?: RecipeCategory) => void;
  user: UserProfile;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onLogout,
  isDark,
  onToggleTheme
}) => {
  const { t } = useLanguage();
  const [recipesDropdownOpen, setRecipesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileRecipesOpen, setMobileRecipesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#recetas-nav-container') && !target.closest('#user-settings-btn-container')) {
        setRecipesDropdownOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMouseEnterRecipes = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setRecipesDropdownOpen(true);
  };

  const handleMouseLeaveRecipes = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setRecipesDropdownOpen(false);
    }, 250);
  };

  const recipeDropdownItems = [
    {
      id: 'todos' as RecipeCategory,
      title: t.nav.categories.all,
      description: t.recipes.allDishes,
      icon: UtensilsCrossed,
      color: '#0E5C36'
    },
    {
      id: 'desayunos' as RecipeCategory,
      title: t.nav.categories.breakfast,
      description: t.recipes.breakfasts,
      icon: Coffee,
      color: '#70B873'
    },
    {
      id: 'almuerzos' as RecipeCategory,
      title: t.nav.categories.lunch,
      description: t.recipes.lunches,
      icon: Salad,
      color: '#0E5C36'
    },
    {
      id: 'cenas' as RecipeCategory,
      title: t.nav.categories.dinner,
      description: t.recipes.dinners,
      icon: MoonStar,
      color: '#70B873'
    },
    {
      id: 'snacks' as RecipeCategory,
      title: t.nav.categories.snacks,
      description: t.recipes.snacks,
      icon: Apple,
      color: '#0E5C36'
    },
    {
      id: 'bebidas' as RecipeCategory,
      title: t.nav.categories.drinks,
      description: t.recipes.drinks,
      icon: GlassWater,
      color: '#70B873'
    },
    {
      id: 'macro_calculator' as RecipeCategory,
      title: t.nav.categories.calculator,
      description: t.recipes.calculator,
      icon: Calculator,
      color: '#F4D06F'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-300 border-b border-emerald-900/10 dark:border-[#70B873]/20 bg-[#F6F4EE]/90 dark:bg-[#0D1912]/90 shadow-sm">
      {/* 1. MOBILE HEADER BAR (Strictly for mobile screens: 3 stripes on left, NutriGrow in center, user photo on right) */}
      <div className="flex md:hidden max-w-7xl mx-auto px-4 h-16 items-center justify-between">
        {/* Left: Hamburger menu with three stripes */}
        <button
          type="button"
          id="btn-mobile-hamburger-nav"
          onClick={() => setMobileDrawerOpen(true)}
          className="p-2 rounded-xl border border-emerald-900/10 dark:border-[#70B873]/25 bg-white/70 dark:bg-[#16291E]/80 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-[#0D1912] transition-colors cursor-pointer shadow-xs"
          aria-label="Abrir menú de navegación móvil"
        >
          <Menu className="w-5 h-5 text-[#0E5C36] dark:text-[#70B873]" />
        </button>

        {/* Center: NutriGrow centered in the middle */}
        <div className="flex items-center justify-center">
          <Logo 
            size="sm" 
            isDark={isDark} 
            showSubtitle={false} 
            onClick={() => onNavigate('inicio')} 
          />
        </div>

        {/* Right: User profile photo */}
        <button
          type="button"
          id="btn-mobile-user-profile-nav"
          onClick={() => onNavigate('perfil')}
          className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#70B873] shadow-xs cursor-pointer shrink-0"
          title={user.name}
          aria-label="Ir a mi perfil"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#0E5C36] text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          )}
        </button>
      </div>

      {/* MOBILE LEFT DRAWER (Opens when user taps the 3 stripes on mobile) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Slide-out Left Drawer with Computer Menu Items */}
          <aside
            id="navbar-mobile-left-drawer"
            className={`relative z-10 w-80 max-w-[85vw] h-full flex flex-col justify-between p-5 shadow-2xl border-r transition-transform animate-in slide-in-from-left duration-300 overflow-y-auto ${
              isDark
                ? 'bg-[#16291E] border-[#70B873]/25 text-white'
                : 'bg-[#FDFCFA] border-[#0E5C36]/20 text-gray-800'
            }`}
          >
            <div className="space-y-4">
              {/* Drawer Header: Logo + Close */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                <Logo 
                  size="sm" 
                  isDark={isDark} 
                  showSubtitle={false} 
                  onClick={() => {
                    onNavigate('inicio');
                    setMobileDrawerOpen(false);
                  }} 
                />
                <button
                  type="button"
                  id="btn-close-mobile-navbar-drawer"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-[#0D1912] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-900 dark:hover:text-white" />
                </button>
              </div>

              {/* User Quick Profile Card */}
              <div
                onClick={() => {
                  onNavigate('perfil');
                  setMobileDrawerOpen(false);
                }}
                className="p-3 rounded-2xl bg-[#0E5C36]/10 dark:bg-[#70B873]/10 border border-[#0E5C36]/20 dark:border-[#70B873]/20 flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#70B873] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold truncate text-[#0E5C36] dark:text-[#70B873]">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                  <span className="inline-block mt-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    🔥 Racha: {user.streakDays} días
                  </span>
                </div>
              </div>

              {/* Computer Menu Items transferred into Mobile Drawer */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-1 mb-1.5">
                  {t.nav.menu}
                </p>

                {/* 1. Inicio */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('inicio');
                    setMobileDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    currentView === 'inicio'
                      ? 'bg-[#0E5C36] text-white shadow-sm'
                      : 'hover:bg-emerald-50 dark:hover:bg-[#0D1912] text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <Home className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                  <span>{t.nav.home}</span>
                </button>

                {/* 2. Recetas with collapsible categories */}
                <div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('recetas', 'todos');
                        setMobileDrawerOpen(false);
                      }}
                      className={`flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                        currentView === 'recetas'
                          ? 'bg-[#0E5C36] text-white shadow-sm'
                          : 'hover:bg-emerald-50 dark:hover:bg-[#0D1912] text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <UtensilsCrossed className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                      <span>{t.nav.recipes}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileRecipesOpen(!mobileRecipesOpen)}
                      className="p-2.5 rounded-xl border border-gray-200/50 dark:border-gray-800 hover:bg-emerald-50 dark:hover:bg-[#0D1912] transition-colors text-gray-500 cursor-pointer"
                      title="Ver categorías de recetas"
                      aria-label="Ver categorías de recetas"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileRecipesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {mobileRecipesOpen && (
                    <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#70B873]/30 ml-4 my-1">
                      {recipeDropdownItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onNavigate('recetas', item.id);
                            setMobileDrawerOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-50 dark:hover:bg-[#0D1912] text-gray-600 dark:text-gray-300 flex items-center gap-2 cursor-pointer"
                        >
                          <item.icon className="w-3.5 h-3.5 shrink-0" style={{ color: item.color }} />
                          <span className="truncate">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Mis Proyectos */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('proyectos');
                    setMobileDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    currentView === 'proyectos'
                      ? 'bg-[#0E5C36] text-white shadow-sm'
                      : 'hover:bg-emerald-50 dark:hover:bg-[#0D1912] text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <Sprout className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                  <span>{t.nav.projects}</span>
                </button>

                {/* 4. Ayuda por IA */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('ayuda_ia');
                    setMobileDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    currentView === 'ayuda_ia'
                      ? 'bg-[#0E5C36] text-white shadow-sm ring-1 ring-[#70B873]'
                      : 'hover:bg-emerald-50 dark:hover:bg-[#0D1912] text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="flex-1">{t.nav.aiHelp}</span>
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
                    Gemini
                  </span>
                </button>

                {/* 5. Mi Perfil & Biometría */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('perfil');
                    setMobileDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    currentView === 'perfil'
                      ? 'bg-[#0E5C36] text-white shadow-sm'
                      : 'hover:bg-emerald-50 dark:hover:bg-[#0D1912] text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <User className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                  <span>{t.nav.profile}</span>
                </button>

                {/* 6. Configuración de Cuenta */}
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('configuracion');
                    setMobileDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    currentView === 'configuracion'
                      ? 'bg-[#0E5C36] text-white shadow-sm'
                      : 'hover:bg-emerald-50 dark:hover:bg-[#0D1912] text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <Settings className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                  <span>{t.nav.settings}</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom Actions: Theme Toggle & Logout */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2 mt-3">
              <button
                type="button"
                onClick={onToggleTheme}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-[#0D1912] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {isDark ? <Sun className="w-4 h-4 text-[#70B873]" /> : <Moon className="w-4 h-4 text-[#0E5C36]" />}
                  <span>{isDark ? t.nav.themeDark : t.nav.themeLight}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{t.nav.theme}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{t.nav.logout}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 2. DESKTOP HEADER BAR (Unchanged layout for desktop as instructed: "No cambies nada de la parte del computador") */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 items-center justify-between">
        {/* LEFT: BRAND LOGO */}
        <div className="flex items-center shrink-0">
          <Logo 
            size="sm" 
            isDark={isDark} 
            showSubtitle={false} 
            onClick={() => onNavigate('inicio')} 
          />
        </div>

        {/* CENTER: MAIN NAVIGATION MENU (Centered in Header as requested) */}
        <nav 
          id="centered-top-menu"
          className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 px-3 py-1.5 rounded-full border border-emerald-900/10 dark:border-[#70B873]/25 bg-white/70 dark:bg-[#16291E]/80 backdrop-blur-md shadow-sm"
        >
          {/* 1. INICIO */}
          <button
            id="nav-btn-inicio"
            onClick={() => onNavigate('inicio')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'inicio'
                ? 'bg-[#0E5C36] text-white shadow-md'
                : 'text-gray-700 dark:text-gray-200 hover:text-[#0E5C36] dark:hover:text-[#70B873] hover:bg-emerald-50 dark:hover:bg-[#0D1912]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>{t.nav.home}</span>
          </button>

          {/* 2. RECETAS WITH HOVER DROPDOWN MENU */}
          <div
            id="recetas-nav-container"
            className="relative"
            onMouseEnter={handleMouseEnterRecipes}
            onMouseLeave={handleMouseLeaveRecipes}
          >
            <button
              id="nav-btn-recetas"
              onClick={() => onNavigate('recetas', 'todos')}
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'recetas'
                  ? 'bg-[#0E5C36] text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-200 hover:text-[#0E5C36] dark:hover:text-[#70B873] hover:bg-emerald-50 dark:hover:bg-[#0D1912]'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>{t.nav.recipes}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${recipesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* RECIPES DROPDOWN PANEL */}
            {recipesDropdownOpen && (
              <div
                id="recetas-dropdown-menu"
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 rounded-2xl p-2.5 border shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
                  isDark
                    ? 'bg-[#16291E] border-[#70B873]/30 text-white shadow-black/60'
                    : 'bg-white border-[#0E5C36]/20 text-gray-800 shadow-emerald-950/15'
                }`}
              >
                <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E5C36] dark:text-[#70B873]">
                    {t.recipes.filterByCategory}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] font-semibold">
                    7 {t.recipes.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1">
                  {recipeDropdownItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        id={`dropdown-recipe-${item.id}`}
                        onClick={() => {
                          onNavigate('recetas', item.id);
                          setRecipesDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                          isDark
                            ? 'hover:bg-[#0D1912] hover:text-[#70B873]'
                            : 'hover:bg-emerald-50 hover:text-[#0E5C36]'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white shadow-sm"
                          style={{ backgroundColor: item.color }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-bold truncate leading-tight">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. MIS PROYECTOS */}
          <button
            id="nav-btn-proyectos"
            onClick={() => onNavigate('proyectos')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'proyectos'
                ? 'bg-[#0E5C36] text-white shadow-md'
                : 'text-gray-700 dark:text-gray-200 hover:text-[#0E5C36] dark:hover:text-[#70B873] hover:bg-emerald-50 dark:hover:bg-[#0D1912]'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>{t.nav.projects}</span>
          </button>

          {/* 4. AYUDA POR IA (Gemini-Powered Natural & Nutrition Assistant) */}
          <button
            id="nav-btn-ayuda-ia"
            onClick={() => onNavigate('ayuda_ia')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer relative overflow-hidden ${
              currentView === 'ayuda_ia'
                ? 'bg-gradient-to-r from-[#0E5C36] via-[#157947] to-[#0E5C36] text-white shadow-md ring-2 ring-[#70B873]/50'
                : 'text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100/70 dark:hover:bg-[#153424] bg-emerald-50/70 dark:bg-[#102419]'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${currentView === 'ayuda_ia' ? 'text-amber-300 animate-spin-slow' : 'text-[#0E5C36] dark:text-[#70B873]'}`} />
            <span className="font-extrabold tracking-tight">{t.nav.aiHelp}</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#70B873] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0E5C36] dark:bg-[#70B873]"></span>
            </span>
          </button>

          {/* 5. MI PERFIL (Moved to the right of Ayuda por IA as requested) */}
          <button
            id="nav-btn-perfil"
            onClick={() => onNavigate('perfil')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'perfil'
                ? 'bg-[#0E5C36] text-white shadow-md'
                : 'text-gray-700 dark:text-gray-200 hover:text-[#0E5C36] dark:hover:text-[#70B873] hover:bg-emerald-50 dark:hover:bg-[#0D1912]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.nav.profile}</span>
          </button>
        </nav>

        {/* RIGHT: THEME TOGGLE + CONFIGURACIÓN DE CUENTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            id="btn-toggle-theme-navbar"
            title={isDark ? t.nav.themeLight : t.nav.themeDark}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#16291E] transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#70B873]" /> : <Moon className="w-4 h-4 text-[#0E5C36]" />}
          </button>

          {/* CONFIGURACIÓN DE CUENTA (Personita Icon on the right) */}
          <div id="user-settings-btn-container" className="relative">
            <button
              id="btn-nav-user-settings"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              title={t.nav.settings}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-full border transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                currentView === 'configuracion'
                  ? 'bg-[#0E5C36] border-[#0E5C36] text-white'
                  : isDark
                  ? 'bg-[#16291E] border-[#70B873]/30 text-gray-200 hover:border-[#70B873]'
                  : 'bg-white border-[#0E5C36]/20 text-[#0E5C36] hover:bg-emerald-50'
              }`}
            >
              {/* Personita Icon / Avatar */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-[#70B873]/20 flex items-center justify-center border border-[#70B873]/40">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
                )}
              </div>
              <span className="hidden lg:inline text-xs font-bold max-w-[100px] truncate">
                {user?.name ? user.name.split(' ')[0] : t.nav.profile}
              </span>
              <ChevronDown className="hidden sm:block w-3 h-3 opacity-70" />
            </button>

            {/* USER SETTINGS MENU POPUP */}
            {userMenuOpen && (
              <div
                id="user-settings-dropdown-menu"
                className={`absolute right-0 mt-2 w-64 rounded-2xl p-2 border shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 ${
                  isDark
                    ? 'bg-[#16291E] border-[#70B873]/30 text-white'
                    : 'bg-white border-[#0E5C36]/20 text-gray-800'
                }`}
              >
                {/* User info banner */}
                <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-bold text-[#0E5C36] dark:text-[#70B873] truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#70B873]/20 text-[10px] font-bold text-[#0E5C36] dark:text-[#70B873]">
                    <Sparkles className="w-3 h-3" /> {t.common.streak}: {user.streakDays} {t.common.days}
                  </div>
                </div>

                <div className="p-1 space-y-0.5">
                  <button
                    onClick={() => {
                      onNavigate('configuracion');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-[#0D1912]' : 'hover:bg-emerald-50'
                    }`}
                  >
                    <Settings className="w-4 h-4 text-emerald-600" />
                    <span>{t.nav.settings}</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('perfil');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-[#0D1912]' : 'hover:bg-emerald-50'
                    }`}
                  >
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>{t.nav.profile}</span>
                  </button>

                  <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.nav.logout}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
