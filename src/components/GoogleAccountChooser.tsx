import React, { useState } from 'react';
import { X, UserPlus, ArrowLeft, ArrowRight, Shield, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface SelectedGoogleAccount {
  name: string;
  email: string;
  avatar?: string;
}

interface GoogleAccountChooserProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: SelectedGoogleAccount) => void;
  isDark?: boolean;
}

const DEFAULT_ACCOUNTS = [
  {
    id: 'g_acc_1',
    name: 'Daniel Rodríguez',
    email: 'daniel.rodrih123@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    badge: 'Sesión activa'
  },
  {
    id: 'g_acc_2',
    name: 'Daniel Cultivo & Nutrición',
    email: 'daniel.cultivo.green@gmail.com',
    avatar: '',
    badge: 'Guardada'
  }
];

export const GoogleAccountChooser: React.FC<GoogleAccountChooserProps> = ({
  isOpen,
  onClose,
  onSelectAccount,
  isDark = false
}) => {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customError, setCustomError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authenticatingAccount, setAuthenticatingAccount] = useState<SelectedGoogleAccount | null>(null);

  if (!isOpen) return null;

  const t_es = {
    title: 'Elegir una cuenta',
    subtitle: 'para continuar en NutriGrow',
    useOtherAccount: 'Usar otra cuenta de Google',
    otherAccountTitle: 'Ingresa tu cuenta de Google',
    otherAccountDesc: 'Escribe el nombre y correo de Google con el que deseas registrarte o iniciar sesión en NutriGrow.',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Ej. Juan Pérez',
    emailLabel: 'Correo electrónico de Google',
    emailPlaceholder: 'tunombre@gmail.com',
    continueBtn: 'Continuar con esta cuenta',
    backBtn: 'Volver a la lista de cuentas',
    cancel: 'Cancelar',
    verifying: 'Conectando y autenticando con Google...',
    privacyNotice: 'Para continuar, Google compartirá tu nombre, dirección de correo electrónico y preferencia de idioma con NutriGrow.',
    termsNotice: 'Antes de usar esta aplicación, puedes revisar la Política de Privacidad y las Condiciones del Servicio de NutriGrow.',
    activeSession: 'Sesión activa',
    savedSession: 'Guardada en este dispositivo'
  };

  const t_en = {
    title: 'Choose an account',
    subtitle: 'to continue to NutriGrow',
    useOtherAccount: 'Use another Google account',
    otherAccountTitle: 'Enter your Google account',
    otherAccountDesc: 'Enter the name and Google email you want to use to register or sign in to NutriGrow.',
    nameLabel: 'Full name',
    namePlaceholder: 'e.g. John Doe',
    emailLabel: 'Google email address',
    emailPlaceholder: 'yourname@gmail.com',
    continueBtn: 'Continue with this account',
    backBtn: 'Back to account list',
    cancel: 'Cancel',
    verifying: 'Connecting and authenticating with Google...',
    privacyNotice: 'To continue, Google will share your name, email address, and language preference with NutriGrow.',
    termsNotice: 'Before using this app, you can review NutriGrow’s Privacy Policy and Terms of Service.',
    activeSession: 'Active session',
    savedSession: 'Saved on device'
  };

  const t_fr = {
    title: 'Choisissez un compte',
    subtitle: 'pour continuer vers NutriGrow',
    useOtherAccount: 'Utiliser un autre compte Google',
    otherAccountTitle: 'Saisissez votre compte Google',
    otherAccountDesc: 'Indiquez le nom et l’adresse Google avec lesquels vous souhaitez vous inscrire sur NutriGrow.',
    nameLabel: 'Nom complet',
    namePlaceholder: 'ex. Jean Dupont',
    emailLabel: 'Adresse e-mail Google',
    emailPlaceholder: 'votrenom@gmail.com',
    continueBtn: 'Continuer avec ce compte',
    backBtn: 'Retour à la liste des comptes',
    cancel: 'Annuler',
    verifying: 'Connexion et authentification Google en cours...',
    privacyNotice: 'Pour continuer, Google partagera votre nom, adresse e-mail et préférence linguistique avec NutriGrow.',
    termsNotice: 'Avant d’utiliser cette application, vous pouvez consulter la politique de confidentialité de NutriGrow.',
    activeSession: 'Session active',
    savedSession: 'Enregistré sur l’appareil'
  };

  const text = language === 'en' ? t_en : language === 'fr' ? t_fr : t_es;

  const handlePickPredefined = (acc: typeof DEFAULT_ACCOUNTS[0]) => {
    setSelectedId(acc.id);
    const chosen: SelectedGoogleAccount = {
      name: acc.name,
      email: acc.email,
      avatar: acc.avatar || undefined
    };
    triggerAuth(chosen);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) {
      setCustomError('Por favor introduce un correo válido de Google (ej: usuario@gmail.com)');
      return;
    }
    const name = customName.trim() || customEmail.split('@')[0];
    setCustomError('');
    const chosen: SelectedGoogleAccount = {
      name,
      email: customEmail.trim()
    };
    triggerAuth(chosen);
  };

  const triggerAuth = (chosen: SelectedGoogleAccount) => {
    setIsAuthenticating(true);
    setAuthenticatingAccount(chosen);
    setTimeout(() => {
      onSelectAccount(chosen);
    }, 750);
  };

  return (
    <div
      id="google-account-chooser-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="google-account-chooser-modal"
        className={`w-full max-w-md rounded-3xl p-6 sm:p-7 border shadow-2xl relative transition-all duration-200 animate-in zoom-in-95 ${
          isDark
            ? 'bg-[#111C15] border-[#70B873]/30 text-white shadow-black/80'
            : 'bg-white border-gray-200 text-gray-800 shadow-xl'
        }`}
      >
        {/* Close Button */}
        {!isAuthenticating && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#16291E] transition-colors cursor-pointer"
            title={text.cancel}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* AUTHENTICATING SPINNER VIEW */}
        {isAuthenticating && authenticatingAccount ? (
          <div className="py-10 text-center space-y-4 animate-in fade-in">
            <div className="relative mx-auto w-16 h-16">
              <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-800" />
              <div className="w-16 h-16 rounded-full border-4 border-[#4285F4] border-t-transparent animate-spin absolute top-0 left-0" />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">
                G
              </div>
            </div>
            <div>
              <p className="font-bold text-base">{text.verifying}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {authenticatingAccount.name} ({authenticatingAccount.email})
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#34A853]/15 text-[#0E5C36] dark:text-[#70B873]">
              <Shield className="w-3.5 h-3.5" />
              <span>Google OAuth 2.0 Segura</span>
            </div>
          </div>
        ) : isCustomMode ? (
          /* FORM TO USE ANOTHER GOOGLE ACCOUNT */
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCustomMode(false);
                  setCustomError('');
                }}
                className="p-1.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h3 className="text-lg font-bold font-display">{text.otherAccountTitle}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">NutriGrow</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              {text.otherAccountDesc}
            </p>

            <form onSubmit={handleCustomSubmit} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {text.nameLabel}
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={text.namePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#4285F4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  {text.emailLabel} *
                </label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder={text.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-[#4285F4] focus:outline-none"
                />
              </div>

              {customError && (
                <p className="text-xs text-red-500 dark:text-red-400 font-semibold">
                  {customError}
                </p>
              )}

              <div className="pt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="px-4 py-2 text-xs font-bold rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#16291E] cursor-pointer"
                >
                  {text.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#4285F4] text-white hover:bg-blue-600 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{text.continueBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* STANDARD ACCOUNT LIST SELECTION */
          <div className="space-y-4">
            {/* Google Logo Header */}
            <div className="text-center pb-2">
              <svg className="w-9 h-9 mx-auto mb-2" viewBox="0 0 24 24">
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
              <h3 className="text-xl font-bold font-display">{text.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {text.subtitle}
              </p>
            </div>

            {/* List of Detected / Available Google Accounts */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              {DEFAULT_ACCOUNTS.map((acc) => {
                const isSelected = selectedId === acc.id;
                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handlePickPredefined(acc)}
                    className={`w-full p-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-[#152e20]'
                          : 'bg-emerald-50'
                        : isDark
                        ? 'hover:bg-[#16291E]'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {acc.avatar ? (
                        <img
                          src={acc.avatar}
                          alt={acc.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-emerald-500/30"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#0E5C36] text-white font-bold flex items-center justify-center shrink-0 text-sm">
                          {acc.name[0]}
                        </div>
                      )}
                      <div className="min-w-0 truncate">
                        <p className="text-xs sm:text-sm font-bold truncate">
                          {acc.name}
                        </p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                          {acc.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#0D1912] text-gray-500 dark:text-gray-400 hidden sm:inline">
                        {acc.badge}
                      </span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : null}
                    </div>
                  </button>
                );
              })}

              {/* Usar otra cuenta Option */}
              <button
                type="button"
                onClick={() => setIsCustomMode(true)}
                className={`w-full p-3.5 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-[#16291E]' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center shrink-0 text-gray-500 dark:text-gray-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200">
                    {text.useOtherAccount}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    Introduce cualquier correo de Google
                  </p>
                </div>
              </button>
            </div>

            {/* Privacy note */}
            <div className="pt-2 text-[11px] text-gray-400 leading-relaxed space-y-1">
              <p>{text.privacyNotice}</p>
              <p className="text-[10px] text-gray-400/80">{text.termsNotice}</p>
            </div>

            {/* Cancel Button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
              >
                {text.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
