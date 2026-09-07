import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, User, UtensilsCrossed, Sprout, Settings, 
  ChevronDown, Sun, Moon, LogOut, Sparkles, Coffee, 
  Salad, MoonStar, Apple, GlassWater, Calculator,
  Sliders, Shield, Bell, Check
} from 'lucide-react';
import { Logo } from './Logo';
import { ViewMode, RecipeCategory, UserProfile } from '../types';

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
  const [recipesDropdownOpen, setRecipesDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
      title: 'Todos los Platillos',
      description: 'Explora toda la colección botánica viva',
      icon: UtensilsCrossed,
      color: '#0E5C36'
    },
    {
      id: 'desayunos' as RecipeCategory,
      title: 'Desayunos Energéticos',
      description: 'Avena con espirulina, bowls y tostadas',
      icon: Coffee,
      color: '#70B873'
    },
    {
      id: 'almuerzos' as RecipeCategory,
      title: 'Almuerzos Balanceados',
      description: 'Salmón salvaje, quinoa real y ensaladas',
      icon: Salad,
      color: '#0E5C36'
    },
    {
      id: 'cenas' as RecipeCategory,
      title: 'Cenas Ligeras',
      description: 'Cremas depurativas y proteínas magras',
      icon: MoonStar,
      color: '#70B873'
    },
    {
      id: 'snacks' as RecipeCategory,
      title: 'Snacks Saludables',
      description: 'Energy balls de matcha, semillas y nueces',
      icon: Apple,
      color: '#0E5C36'
    },
    {
      id: 'bebidas' as RecipeCategory,
      title: 'Bebidas & Batidos Detox',
      description: 'NutriGlow Elixir e infusiones alcalinas',
      icon: GlassWater,
      color: '#70B873'
    },
    {
      id: 'macro_calculator' as RecipeCategory,
      title: 'Calculadora de Macros',
      description: 'Ajusta porciones según tus objetivos diarios',
      icon: Calculator,
      color: '#F4D06F'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-300 border-b border-emerald-900/10 dark:border-[#70B873]/20 bg-[#F6F4EE]/90 dark:bg-[#0D1912]/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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
            <span>Inicio</span>
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
              <span>Recetas</span>
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
                    Categorías & Características
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] font-semibold">
                    7 Módulos
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
            <span className="hidden sm:inline">Mis</span>
            <span>Proyectos</span>
          </button>

          {/* 4. AYUDA POR IA (Gemini-Powered Botanical & Nutrition Assistant) */}
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
            <span className="font-extrabold tracking-tight">Ayuda por IA</span>
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
            <span>Perfil</span>
          </button>
        </nav>

        {/* RIGHT: CONFIGURACIÓN DE CUENTA (PERSON LOGO AS REQUESTED) + THEME TOGGLE */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            id="btn-toggle-theme-navbar"
            title="Cambiar tema"
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#16291E] transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#70B873]" /> : <Moon className="w-4 h-4 text-[#0E5C36]" />}
          </button>

          {/* CONFIGURACIÓN DE CUENTA (Personita Icon on the right) */}
          <div id="user-settings-btn-container" className="relative">
            <button
              id="btn-nav-user-settings"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              title="Configuración de Cuenta"
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
                {user?.name ? user.name.split(' ')[0] : 'Perfil'}
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
                    <Sparkles className="w-3 h-3" /> Racha: {user.streakDays} días
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
                    <span>Configuración de Cuenta</span>
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
                    <span>Mi Perfil & Biometría</span>
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
                    <span>Cerrar Sesión</span>
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
