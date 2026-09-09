import { AppLanguage } from '../types';

export interface LanguageOption {
  code: AppLanguage;
  name: string;
  nativeName: string;
  flag: string;
  badge: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', badge: 'Predeterminado' },
  { code: 'en', name: 'Inglés', nativeName: 'English', flag: '🇬🇧', badge: 'English' },
  { code: 'fr', name: 'Francés', nativeName: 'Français', flag: '🇫🇷', badge: 'Français' }
];

export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      recipes: 'Recetas',
      projects: 'Mis Proyectos',
      aiHelp: 'Ayuda por IA',
      profile: 'Perfil',
      settings: 'Configuración de Cuenta',
      logout: 'Cerrar Sesión',
      theme: 'Cambiar Tema',
      menu: 'Menú'
    },
    profile: {
      title: 'Mi Perfil & Biometría',
      memberBadge: 'Miembro NutriGrow',
      editData: 'Editar Datos',
      cancelEdit: 'Cancelar Edición',
      saveChanges: 'Guardar Cambios',
      close: 'Cerrar',
      updateInfoTitle: 'Actualizar Información de Perfil',
      nameLabel: 'Nombre Completo',
      heightLabel: 'Altura (cm)',
      weightLabel: 'Peso Actual (kg)',
      targetWeightLabel: 'Peso Objetivo (kg)',
      goalLabel: 'Meta Principal',
      activityLabel: 'Nivel de Actividad',
      languageSectionTitle: 'Idioma de la Cuenta',
      languageSectionDesc: 'Selecciona el idioma con el que deseas utilizar la plataforma NutriGrow (Español, Inglés o Francés).',
      languageChangedNotice: 'Idioma cambiado exitosamente a',
      currentLanguage: 'Idioma activo',
      selectLanguage: 'Elegir idioma',
      bmiTitle: 'Índice Masa Corporal',
      targetWeightTitle: 'Peso Objetivo',
      dailyCaloriesTitle: 'Meta Calórica Diaria',
      streakTitle: 'Constancia & Racha',
      daysConsecutive: 'días seguidos',
      badgesTitle: 'Insignias & Logros de Bienestar',
      difference: 'Diferencia',
      keepGoing: '¡Sigue así para desbloquear el Nivel 4!'
    },
    auth: {
      welcomeTitle: 'Bienvenido a tu Espacio',
      registerTitle: 'Crea tu Cuenta en NutriGrow',
      welcomeSubtitle: 'Accede a tus recetas favoritas, metas nutricionales y proyectos vivos.',
      registerSubtitle: 'Únete a la comunidad de nutrición consciente y autocultivo.',
      loginTab: 'Iniciar Sesión',
      registerTab: 'Registrarme',
      emailLabel: 'Correo Electrónico',
      passwordLabel: 'Contraseña',
      forgotPassword: '¿Olvidaste tu contraseña?',
      submitLogin: 'Ingresar a NutriGrow',
      submitRegister: 'Crear Mi Cuenta Gratuita',
      quickDemo: 'Acceso Rápido Demo (1 Clic)',
      googleSignIn: 'Continuar con Google',
      orDivider: 'o continuar con correo',
      connectingGoogle: 'Conectando con Google...',
      mobileMenuTitle: 'Navegación NutriGrow',
      backToHome: 'Volver a la Página Principal',
      exploreRecipes: 'Explorar Recetas',
      viewProjects: 'Proyectos Vivos',
      selectLang: 'Cambiar Idioma',
      securityNotice: 'Tus datos de salud y privacidad están 100% protegidos'
    }
  },
  en: {
    nav: {
      home: 'Home',
      recipes: 'Recipes',
      projects: 'My Projects',
      aiHelp: 'AI Assistant',
      profile: 'Profile',
      settings: 'Account Settings',
      logout: 'Log Out',
      theme: 'Toggle Theme',
      menu: 'Menu'
    },
    profile: {
      title: 'My Profile & Biometrics',
      memberBadge: 'NutriGrow Member',
      editData: 'Edit Profile',
      cancelEdit: 'Cancel Edit',
      saveChanges: 'Save Changes',
      close: 'Close',
      updateInfoTitle: 'Update Profile Information',
      nameLabel: 'Full Name',
      heightLabel: 'Height (cm)',
      weightLabel: 'Current Weight (kg)',
      targetWeightLabel: 'Target Weight (kg)',
      goalLabel: 'Primary Goal',
      activityLabel: 'Activity Level',
      languageSectionTitle: 'Account Language',
      languageSectionDesc: 'Select your preferred language for the NutriGrow platform (Spanish, English, or French).',
      languageChangedNotice: 'Language successfully updated to',
      currentLanguage: 'Active Language',
      selectLanguage: 'Choose language',
      bmiTitle: 'Body Mass Index',
      targetWeightTitle: 'Target Weight',
      dailyCaloriesTitle: 'Daily Calorie Target',
      streakTitle: 'Streak & Consistency',
      daysConsecutive: 'consecutive days',
      badgesTitle: 'Wellness Badges & Achievements',
      difference: 'Difference',
      keepGoing: 'Keep it up to unlock Level 4!'
    },
    auth: {
      welcomeTitle: 'Welcome to your Space',
      registerTitle: 'Create your NutriGrow Account',
      welcomeSubtitle: 'Access your favorite recipes, nutritional targets, and live projects.',
      registerSubtitle: 'Join the conscious nutrition and home growing community.',
      loginTab: 'Log In',
      registerTab: 'Sign Up',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      forgotPassword: 'Forgot password?',
      submitLogin: 'Log In to NutriGrow',
      submitRegister: 'Create Free Account',
      quickDemo: 'Quick Demo Access (1 Click)',
      googleSignIn: 'Continue with Google',
      orDivider: 'or continue with email',
      connectingGoogle: 'Connecting to Google...',
      mobileMenuTitle: 'NutriGrow Navigation',
      backToHome: 'Back to Main Page',
      exploreRecipes: 'Explore Recipes',
      viewProjects: 'Living Projects',
      selectLang: 'Change Language',
      securityNotice: 'Your health data and privacy are 100% protected'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      recipes: 'Recettes',
      projects: 'Mes Projets',
      aiHelp: 'Aide IA',
      profile: 'Profil',
      settings: 'Paramètres du Compte',
      logout: 'Se Déconnecter',
      theme: 'Changer de Thème',
      menu: 'Menu'
    },
    profile: {
      title: 'Mon Profil & Biométrie',
      memberBadge: 'Membre NutriGrow',
      editData: 'Modifier les Données',
      cancelEdit: 'Annuler la Modification',
      saveChanges: 'Enregistrer les Modifications',
      close: 'Fermer',
      updateInfoTitle: 'Mettre à Jour les Informations du Profil',
      nameLabel: 'Nom Complet',
      heightLabel: 'Taille (cm)',
      weightLabel: 'Poids Actuel (kg)',
      targetWeightLabel: 'Poids Cible (kg)',
      goalLabel: 'Objectif Principal',
      activityLabel: 'Niveau d\'Activité',
      languageSectionTitle: 'Langue du Compte',
      languageSectionDesc: 'Choisissez la langue dans laquelle vous souhaitez utiliser la plateforme NutriGrow (Espagnol, Anglais ou Français).',
      languageChangedNotice: 'Langue mise à jour avec succès en',
      currentLanguage: 'Langue active',
      selectLanguage: 'Choisir la langue',
      bmiTitle: 'Indice de Masse Corporelle',
      targetWeightTitle: 'Poids Cible',
      dailyCaloriesTitle: 'Objectif Calorique Quotidien',
      streakTitle: 'Constance & Série',
      daysConsecutive: 'jours consécutifs',
      badgesTitle: 'Badges & Réalisations de Bien-être',
      difference: 'Différence',
      keepGoing: 'Continuez ainsi pour débloquer le Niveau 4 !'
    },
    auth: {
      welcomeTitle: 'Bienvenue dans votre Espace',
      registerTitle: 'Créez votre Compte NutriGrow',
      welcomeSubtitle: 'Accédez à vos recettes favorites, objectifs nutritionnels et projets vivants.',
      registerSubtitle: 'Rejoignez la communauté de la nutrition consciente et de l\'autoculture.',
      loginTab: 'Connexion',
      registerTab: 'S\'inscrire',
      emailLabel: 'Adresse E-mail',
      passwordLabel: 'Mot de Passe',
      forgotPassword: 'Mot de passe oublié ?',
      submitLogin: 'Entrer sur NutriGrow',
      submitRegister: 'Créer Mon Compte Gratuit',
      quickDemo: 'Accès Démo Rapide (1 Clic)',
      googleSignIn: 'Continuer avec Google',
      orDivider: 'ou continuer avec e-mail',
      connectingGoogle: 'Connexion à Google en cours...',
      mobileMenuTitle: 'Navigation NutriGrow',
      backToHome: 'Retour à la Page Principale',
      exploreRecipes: 'Explorer les Recettes',
      viewProjects: 'Projets Vivants',
      selectLang: 'Changer de Langue',
      securityNotice: 'Vos données de santé et votre confidentialité sont 100% protégées'
    }
  }
};

export function getTranslation(lang?: AppLanguage) {
  const code = lang && (lang === 'en' || lang === 'fr' || lang === 'es') ? lang : 'es';
  return translations[code];
}
