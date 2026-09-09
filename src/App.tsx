import React, { useState, useEffect } from 'react';
import { ViewMode, AuthMode, RecipeCategory, UserProfile, Recipe, Project, PersonalizedPlan } from './types';
import { INITIAL_USER, INITIAL_RECIPES, INITIAL_PROJECTS } from './data/mockData';
import { InteractiveBackground } from './components/InteractiveBackground';
import { LandingPage } from './components/LandingPage';
import { AuthView } from './components/AuthView';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/views/HomeView';
import { ProfileView } from './components/views/ProfileView';
import { RecipesView } from './components/views/RecipesView';
import { ProjectsView } from './components/views/ProjectsView';
import { SettingsView } from './components/views/SettingsView';
import { AiHelpView } from './components/views/AiHelpView';
import { BiometricsOnboardingModal } from './components/BiometricsOnboardingModal';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showBiometricsModal, setShowBiometricsModal] = useState<boolean>(false);

  // App Data State
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedRecipeCategory, setSelectedRecipeCategory] = useState<RecipeCategory>('todos');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Theme synchronization with html class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenAuth = (mode: AuthMode = 'login') => {
    setAuthMode(mode);
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
    setCurrentView('inicio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Trigger the mandatory biometrics prompt modal right after login as requested!
    setShowBiometricsModal(true);
  };

  const handleBiometricsComplete = (data: {
    birthDate: string;
    age: number;
    heightCm: number;
    weightKg: number;
    gender: 'femenino' | 'masculino' | 'otro';
    personalizedPlan: PersonalizedPlan;
  }) => {
    setUser((prev) => ({
      ...prev,
      birthDate: data.birthDate,
      age: data.age,
      heightCm: data.heightCm,
      weightKg: data.weightKg,
      gender: data.gender,
      dailyCalories: data.personalizedPlan.dailyCalories,
      targetProteinGrams: data.personalizedPlan.proteinGrams,
      targetCarbsGrams: data.personalizedPlan.carbsGrams,
      targetFatGrams: data.personalizedPlan.fatGrams,
      targetWaterGlasses: data.personalizedPlan.waterGlasses,
      hasCompletedBiometrics: true,
      personalizedPlan: data.personalizedPlan
    }));
    setShowBiometricsModal(false);
    setCurrentView('inicio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowBiometricsModal(false);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: ViewMode, recipeCategory?: RecipeCategory) => {
    if (recipeCategory) {
      setSelectedRecipeCategory(recipeCategory);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavoriteRecipe = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  const handleAddRecipe = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleUpdateUser = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  return (
    <LanguageProvider
      initialLanguage={user.language || 'es'}
      onLanguageChange={(newLang) => setUser((prev) => ({ ...prev, language: newLang }))}
    >
      <div className={`min-h-screen relative transition-colors duration-300 ${isDark ? 'dark bg-[#0D1912] text-[#E2EBE5]' : 'bg-[#F6F4EE] text-[#1A2E22]'}`}>
        {/* Dynamic Cursor-following Natural Canvas Background */}
        <InteractiveBackground isDark={isDark} />

        {/* VIEW 1: LANDING PAGE */}
        {currentView === 'landing' && (
          <LandingPage
            onOpenAuth={handleOpenAuth}
            onExploreRecipes={(category) => {
              if (category) setSelectedRecipeCategory(category);
              handleOpenAuth('login');
            }}
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {/* VIEW 2: AUTH VIEW (LOGIN & REGISTRATION) */}
        {currentView === 'auth' && (
          <div className="relative z-10">
            <AuthView
              initialMode={authMode}
              onLoginSuccess={handleLoginSuccess}
              onBackToLanding={() => setCurrentView('landing')}
              isDark={isDark}
            />
          </div>
        )}

        {/* VIEW 3: AUTHENTICATED APP PORTAL */}
        {currentView !== 'landing' && currentView !== 'auth' && isAuthenticated && (
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Header with Centered Menu & Top Right Account Settings */}
            <Navbar
              currentView={currentView}
              onNavigate={handleNavigate}
              user={user}
              onLogout={handleLogout}
              isDark={isDark}
              onToggleTheme={handleToggleTheme}
            />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {currentView === 'inicio' && (
                <HomeView
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  recipes={recipes}
                  projects={projects}
                  onNavigate={handleNavigate}
                  onSelectRecipe={setSelectedRecipe}
                  isDark={isDark}
                  onOpenBiometrics={() => setShowBiometricsModal(true)}
                />
              )}

              {currentView === 'perfil' && (
                <ProfileView
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  isDark={isDark}
                />
              )}

              {currentView === 'recetas' && (
                <RecipesView
                  recipes={recipes}
                  onToggleFavorite={handleToggleFavoriteRecipe}
                  selectedCategory={selectedRecipeCategory}
                  onSelectCategory={setSelectedRecipeCategory}
                  selectedRecipe={selectedRecipe}
                  onSelectRecipe={setSelectedRecipe}
                  user={user}
                  isDark={isDark}
                />
              )}

              {currentView === 'proyectos' && (
                <ProjectsView
                  projects={projects}
                  onUpdateProjects={setProjects}
                  isDark={isDark}
                />
              )}

              {currentView === 'ayuda_ia' && (
                <AiHelpView
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  recipes={recipes}
                  onAddRecipe={handleAddRecipe}
                  projects={projects}
                  onAddProject={handleAddProject}
                  onNavigate={handleNavigate}
                  isDark={isDark}
                />
              )}

              {currentView === 'configuracion' && (
                <SettingsView
                  user={user}
                  onUpdateUser={handleUpdateUser}
                  onLogout={handleLogout}
                  isDark={isDark}
                  onToggleTheme={handleToggleTheme}
                />
              )}
            </main>
          </div>
        )}

        {/* MANDATORY BIOMETRICS ONBOARDING MODAL AFTER LOGIN */}
        <BiometricsOnboardingModal
          isOpen={showBiometricsModal}
          user={user}
          onComplete={handleBiometricsComplete}
          isDark={isDark}
        />
      </div>
    </LanguageProvider>
  );
}
