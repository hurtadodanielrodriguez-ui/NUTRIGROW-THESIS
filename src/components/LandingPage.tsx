import React from 'react';
import { 
  LogIn, UserPlus, Sparkles, UtensilsCrossed, Sprout, 
  ArrowRight, Shield, HeartPulse, Compass, 
  Sun, Moon, ChevronDown, Check, Apple, BookOpen, Layers, Leaf
} from 'lucide-react';
import { Logo } from './Logo';
import { TestimonialsSection } from './TestimonialsSection';
import { ContactForm } from './ContactForm';
import { RecipeCategory } from '../types';

interface LandingPageProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onExploreRecipes: (category?: RecipeCategory) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onExploreRecipes,
  isDark,
  onToggleTheme
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 border-b border-emerald-900/10 dark:border-[#70B873]/20 bg-[#F6F4EE]/90 dark:bg-[#0D1912]/85 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo Header Left */}
          <div className="flex items-center gap-3">
            <Logo size="sm" isDark={isDark} showSubtitle={false} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </div>

          {/* Smooth Navigation Center Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-2 rounded-full border border-emerald-900/10 dark:border-emerald-500/20 bg-white/70 dark:bg-[#16291E]/60 backdrop-blur-sm shadow-sm">
            <button
              onClick={() => scrollToSection('hero-section')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold rounded-full text-stone-800 dark:text-gray-200 hover:text-[#0E5C36] dark:hover:text-[#70B873] hover:bg-emerald-50 dark:hover:bg-[#0D1912] transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('beneficios-section')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold rounded-full text-stone-800 dark:text-gray-200 hover:text-[#0E5C36] dark:hover:text-[#70B873] hover:bg-emerald-50 dark:hover:bg-[#0D1912] transition-colors cursor-pointer"
            >
              Pilares Nutricionales
            </button>
            <button
              onClick={() => scrollToSection('testimonios-section')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold rounded-full text-stone-800 dark:text-gray-200 hover:text-[#0E5C36] dark:hover:text-[#70B873] hover:bg-emerald-50 dark:hover:bg-[#0D1912] transition-colors cursor-pointer"
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection('contacto-section')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold rounded-full text-stone-800 dark:text-gray-200 hover:text-[#0E5C36] dark:hover:text-[#70B873] hover:bg-emerald-50 dark:hover:bg-[#0D1912] transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* TOP RIGHT: LOGIN ICON & ACTIONS */}
          <div className="flex items-center gap-2.5">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              title="Cambiar tema claro / oscuro"
              className="p-2.5 rounded-xl border border-stone-300 dark:border-gray-800 text-stone-800 dark:text-gray-300 hover:bg-white dark:hover:bg-[#16291E] transition-colors cursor-pointer shadow-sm"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#70B873]" /> : <Moon className="w-4 h-4 text-[#0E5C36]" />}
            </button>

            {/* Iniciar Sesión Icon & Button in Top Right corner */}
            <button
              id="top-right-btn-login"
              onClick={() => onOpenAuth('login')}
              className="group px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border border-[#0E5C36] dark:border-[#70B873]/30 text-[#0E5C36] dark:text-[#70B873] bg-white/60 dark:bg-transparent hover:bg-[#0E5C36] hover:text-white dark:hover:bg-[#70B873] dark:hover:text-[#0D1912] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="Iniciar Sesión en NutriGrow"
            >
              <LogIn className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Iniciar Sesión</span>
            </button>

            {/* Quick Register CTA */}
            <button
              id="top-right-btn-register"
              onClick={() => onOpenAuth('register')}
              className="hidden sm:inline-flex px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#0E5C36] text-white hover:bg-[#16472D] active:scale-95 transition-all shadow-md items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Registrarme</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH LARGE LOGO & INTERACTIVE BACKGROUND EFFECT */}
      <section id="hero-section" className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        {/* Subtle pill badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border shadow-sm bg-white dark:bg-[#16291E]/90 border-[#0E5C36]/30 dark:border-[#70B873]/30 text-[#0E5C36] dark:text-[#70B873] backdrop-blur-md"
        >
          <Leaf className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />
          <span>Nutrición Consciente & Autocultivo</span>
        </div>

        {/* PROMINENT LARGE NUTRIGROW LOGO */}
        <div className="mb-6 transform hover:scale-102 transition-transform duration-500">
          <Logo size="hero" isDark={isDark} showSubtitle={true} />
        </div>

        {/* Hero Headline and Subtitle with high-contrast text in light mode */}
        <h1 className={`max-w-4xl text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight leading-[1.18] mt-4 ${
          isDark ? 'text-white' : 'text-[#102417]'
        }`}>
          Alimenta tu Cuerpo, Cultiva tu Salud y{' '}
          <span className={`relative inline-block ${isDark ? 'text-[#70B873]' : 'text-[#0E5C36]'}`}>
            Crece sin Límites
            <svg
              className={`absolute -bottom-2 left-0 w-full h-3 ${isDark ? 'text-[#70B873]/60' : 'text-[#0E5C36]/50'}`}
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path d="M0 15 Q50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </span>
        </h1>

        <p className={`max-w-2xl text-base sm:text-lg md:text-xl mt-6 leading-relaxed font-semibold ${
          isDark ? 'text-gray-200' : 'text-[#1E3A2B]'
        }`}>
          La plataforma integral que fusiona{' '}
          <strong className={`font-black ${isDark ? 'text-white' : 'text-[#0E5C36]'}`}>
            recetas inteligentes antiinflamatorias
          </strong>,{' '}
          <strong className={`font-black ${isDark ? 'text-white' : 'text-[#0E5C36]'}`}>
            proyectos de autocultivo de microgreens
          </strong>{' '}
          y seguimiento nutricional personalizado en un entorno sereno y elegante.
        </p>

        {/* Smooth CTA Navigation Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
          <button
            id="hero-btn-start-now"
            onClick={() => onOpenAuth('register')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm sm:text-base bg-[#0E5C36] text-white hover:bg-[#16472D] active:scale-98 transition-all duration-200 shadow-xl shadow-emerald-950/20 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#86EFAC]" />
            <span>Comenzar Ahora Gratis</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            id="hero-btn-explore-recipes"
            onClick={() => onOpenAuth('login')}
            className={`w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm sm:text-base border transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-[#16291E] border-[#70B873]/30 text-white hover:bg-[#70B873]/10 hover:border-[#70B873]'
                : 'bg-white border-[#0E5C36]/30 text-[#0E5C36] hover:bg-emerald-50 shadow-md'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-[#0E5C36] dark:text-[#70B873]" />
            <span>Iniciar Sesión</span>
          </button>
        </div>

        {/* Interactive Features Floating Highlights */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl w-full">
          {[
            { icon: UtensilsCrossed, title: '+150 Recetas Vivas', desc: 'Desayunos, almuerzos & cenas' },
            { icon: Sprout, title: 'Proyectos de Cultivo', desc: 'Microgreens y huertos en casa' },
            { icon: HeartPulse, title: 'Control de Macros', desc: 'Proteínas, carbohidratos y grasas' },
            { icon: Shield, title: '100% Personalizado', desc: 'Planes ajustados a tus metas' }
          ].map((item, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#16291E]/80 border-[#70B873]/20 shadow-lg shadow-black/20 text-white'
                  : 'bg-white border-emerald-900/15 shadow-sm text-stone-900'
              }`}
            >
              <item.icon className="w-6 h-6 text-[#0E5C36] dark:text-[#70B873] mb-2" />
              <h4 className={`font-bold text-sm font-display ${isDark ? 'text-white' : 'text-[#102417]'}`}>{item.title}</h4>
              <p className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-400' : 'text-[#2D4536]'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS / PILARES SECTION */}
      <section id="beneficios-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-[#0E5C36]/10 dark:bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] border border-[#0E5C36]/20 dark:border-transparent">
            <Layers className="w-3.5 h-3.5" /> Metodología NutriGrow
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold font-display ${
            isDark ? 'text-white' : 'text-[#102417]'
          }`}>
            Todo lo que necesitas para tu <span className={isDark ? 'text-[#70B873]' : 'text-[#0E5C36]'}>transformación vital</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Recetas */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              isDark ? 'bg-[#16291E] border-[#70B873]/30 text-white' : 'bg-white border-emerald-900/15 text-stone-900'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] flex items-center justify-center mb-5">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-bold font-display mb-2 ${isDark ? 'text-white' : 'text-[#102417]'}`}>Recetas Inteligentes & Desplegables</h3>
              <p className={`text-sm leading-relaxed mb-4 font-medium ${isDark ? 'text-gray-300' : 'text-[#2D4536]'}`}>
                Accede a categorías detalladas: desayunos energéticos con espirulina, almuerzos de salmón y quinoa, cenas depurativas, snacks saludables y calculadoras de macros en tiempo real.
              </p>
            </div>
            <button
              onClick={() => onOpenAuth('login')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E5C36] dark:text-[#70B873] hover:underline mt-2 cursor-pointer"
            >
              <span>Explorar Recetario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Proyectos Vivos */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              isDark ? 'bg-[#16291E] border-[#70B873]/30 text-white' : 'bg-white border-emerald-900/15 text-stone-900'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] flex items-center justify-center mb-5">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-bold font-display mb-2 ${isDark ? 'text-white' : 'text-[#102417]'}`}>Mis Proyectos & Huerto Urbano</h3>
              <p className={`text-sm leading-relaxed mb-4 font-medium ${isDark ? 'text-gray-300' : 'text-[#2D4536]'}`}>
                Sigue proyectos interactivos paso a paso como cultivo de microgreens en tu cocina, retos de 21 días sin azúcares refinados y sistemas de batch cooking semanal.
              </p>
            </div>
            <button
              onClick={() => onOpenAuth('login')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E5C36] dark:text-[#70B873] hover:underline mt-2 cursor-pointer"
            >
              <span>Ver Proyectos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Perfil y Biometría */}
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              isDark ? 'bg-[#16291E] border-[#70B873]/30 text-white' : 'bg-white border-emerald-900/15 text-stone-900'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] flex items-center justify-center mb-5">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-bold font-display mb-2 ${isDark ? 'text-white' : 'text-[#102417]'}`}>Perfil & Progreso Diario</h3>
              <p className={`text-sm leading-relaxed mb-4 font-medium ${isDark ? 'text-gray-300' : 'text-[#2D4536]'}`}>
                Monitorea tu hidratación, balance calórico, ingesta de proteínas y constancia diaria con insignias de logros y gráficos de evolución corporal.
              </p>
            </div>
            <button
              onClick={() => onOpenAuth('login')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E5C36] dark:text-[#70B873] hover:underline mt-2 cursor-pointer"
            >
              <span>Conocer Mi Perfil</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS INTERACTIVE SECTION */}
      <section id="testimonios-section" className="py-12 px-4 sm:px-6 lg:px-8">
        <TestimonialsSection isDark={isDark} />
      </section>

      {/* INTEGRATED CONTACT FORM SECTION */}
      <section id="contacto-section" className="py-16 px-4 sm:px-6 lg:px-8">
        <ContactForm isDark={isDark} />
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-emerald-900/10 dark:border-[#70B873]/20 bg-white/80 dark:bg-[#0D1912]/90 backdrop-blur-md py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" isDark={isDark} showSubtitle={true} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-stone-700 dark:text-gray-300">
            <button onClick={() => scrollToSection('hero-section')} className="hover:text-[#0E5C36] dark:hover:text-[#70B873] cursor-pointer">
              Inicio
            </button>
            <button onClick={() => scrollToSection('beneficios-section')} className="hover:text-[#0E5C36] dark:hover:text-[#70B873] cursor-pointer">
              Pilares
            </button>
            <button onClick={() => scrollToSection('testimonios-section')} className="hover:text-[#0E5C36] dark:hover:text-[#70B873] cursor-pointer">
              Testimonios
            </button>
            <button onClick={() => scrollToSection('contacto-section')} className="hover:text-[#0E5C36] dark:hover:text-[#70B873] cursor-pointer">
              Contacto
            </button>
            <button onClick={() => onOpenAuth('login')} className="hover:text-[#0E5C36] dark:hover:text-[#70B873] font-bold text-[#0E5C36] dark:text-[#70B873] cursor-pointer">
              Acceso Miembros
            </button>
          </div>

          <p className="text-xs text-stone-500 dark:text-gray-400 text-center font-medium">
            © {new Date().getFullYear()} NutriGrow. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

