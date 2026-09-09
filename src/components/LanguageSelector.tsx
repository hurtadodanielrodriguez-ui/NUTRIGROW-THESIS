import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AppLanguage } from '../types';

interface LanguageSelectorProps {
  variant?: 'compact' | 'dropdown' | 'cards' | 'pills';
  isDark?: boolean;
  className?: string;
  onSelect?: (lang: AppLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  isDark = false,
  className = '',
  onSelect
}) => {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleChoose = (code: AppLanguage) => {
    setLanguage(code);
    setIsOpen(false);
    if (onSelect) onSelect(code);
  };

  // 1. CARDS VARIANT (For SettingsView & ProfileView)
  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {supportedLanguages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              id={`btn-select-lang-${lang.code}`}
              onClick={() => handleChoose(lang.code)}
              className={`relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                isSelected
                  ? isDark
                    ? 'bg-[#0E5C36]/30 border-[#70B873] text-white ring-2 ring-[#70B873]/50 shadow-md'
                    : 'bg-emerald-50/90 border-[#0E5C36] text-[#0E5C36] ring-2 ring-[#0E5C36]/20 shadow-md'
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
    );
  }

  // 2. PILLS VARIANT (For Mobile Drawer or Bottom Bars)
  if (variant === 'pills') {
    return (
      <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
        {supportedLanguages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleChoose(lang.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#0E5C36] text-white shadow-sm ring-1 ring-[#70B873]'
                  : isDark
                  ? 'bg-[#16291E] border border-gray-800 text-gray-300 hover:bg-[#0D1912]'
                  : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {isSelected && <Check className="w-3 h-3 ml-0.5" />}
            </button>
          );
        })}
      </div>
    );
  }

  // 3. DROPDOWN / COMPACT VARIANT (For Navbar / Header)
  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        id="btn-language-dropdown"
        onClick={() => setIsOpen(!isOpen)}
        title={t.nav.selectLanguage}
        className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-xs ${
          isDark
            ? 'bg-[#16291E] border-gray-800 text-gray-200 hover:border-[#70B873]/50'
            : 'bg-white border-gray-200 text-gray-700 hover:border-[#0E5C36]/40 hover:bg-emerald-50/50'
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />
        <span className="text-sm select-none">{currentOption.flag}</span>
        <span className="hidden sm:inline uppercase">{currentOption.code}</span>
        <ChevronDown className={`w-3 h-3 opacity-60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-2xl p-1.5 border shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 ${
            isDark
              ? 'bg-[#16291E] border-[#70B873]/30 text-white'
              : 'bg-white border-[#0E5C36]/20 text-gray-800'
          }`}
        >
          <div className="px-2.5 py-1.5 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800 mb-1">
            {t.nav.selectLanguage}
          </div>

          <div className="space-y-0.5">
            {supportedLanguages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleChoose(lang.code)}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-[#0D1912] text-[#0E5C36] dark:text-[#70B873] font-bold'
                      : isDark
                      ? 'hover:bg-[#0D1912] text-gray-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base select-none">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0E5C36] dark:text-[#70B873]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
