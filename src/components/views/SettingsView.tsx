import React, { useState } from 'react';
import { 
  Settings, User, Bell, Moon, Sun, Shield, Lock, 
  Download, LogOut, CheckCircle2, Sliders, Smartphone,
  Eye, EyeOff
} from 'lucide-react';
import { UserProfile } from '../../types';
import confetti from 'canvas-confetti';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  onLogout,
  isDark,
  onToggleTheme
}) => {
  const [notifyDaily, setNotifyDaily] = useState(user.notificationsEnabled);
  const [notifyProjects, setNotifyProjects] = useState(true);
  const [notifyHydration, setNotifyHydration] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passSaved, setPassSaved] = useState(false);

  const handleSaveNotifications = () => {
    onUpdateUser({ notificationsEnabled: notifyDaily });
    try {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#0E5C36', '#70B873']
      });
    } catch {}
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass) return;
    setPassSaved(true);
    setTimeout(() => {
      setPassSaved(false);
      setShowPasswordChange(false);
      setCurrentPass('');
      setNewPass('');
    }, 1200);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NutriGrow_Perfil_${user.name.replace(' ', '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="view-configuracion-section" className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* HEADER */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
          <Settings className="w-3.5 h-3.5" /> Preferencias & Seguridad
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
          Configuración de Cuenta
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
          Administra tu perfil, notificaciones, estética visual y privacidad en NutriGrow.
        </p>
      </div>

      {/* PALETTE SHOWCASE */}
      <div
        className={`rounded-3xl p-6 sm:p-7 border shadow-sm space-y-4 ${
          isDark ? 'bg-[#16291E] border-[#70B873]/25 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#0E5C36] dark:text-[#70B873]" />
            <h2 className="text-lg font-bold font-display">Tema y Estética Visual</h2>
          </div>

          <button
            onClick={onToggleTheme}
            id="btn-toggle-theme-settings"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0E5C36] text-white hover:bg-[#16472D] flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#70B873]" /> : <Moon className="w-4 h-4" />}
            <span>{isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Paleta oficial NutriGrow aplicada armónicamente en toda la interfaz:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          <div className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#0E5C36] mx-auto border shadow-sm" />
            <span className="text-[10px] font-bold block">#0E5C36</span>
            <span className="text-[9px] text-gray-400 block">Verde Oscuro</span>
          </div>
          <div className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#70B873] mx-auto border shadow-sm" />
            <span className="text-[10px] font-bold block">#70B873</span>
            <span className="text-[9px] text-gray-400 block">Verde Manzana</span>
          </div>
          <div className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#F6F4EE] mx-auto border shadow-sm" />
            <span className="text-[10px] font-bold block">#F6F4EE</span>
            <span className="text-[9px] text-gray-400 block">Crema Claro</span>
          </div>
          <div className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#0D1912] mx-auto border shadow-sm" />
            <span className="text-[10px] font-bold block">#0D1912</span>
            <span className="text-[9px] text-gray-400 block">Verde Fondo</span>
          </div>
          <div className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#16291E] mx-auto border shadow-sm" />
            <span className="text-[10px] font-bold block">#16291E</span>
            <span className="text-[9px] text-gray-400 block">Tarjetas Dark</span>
          </div>
        </div>
      </div>

      {/* NOTIFICATIONS & REMINDERS */}
      <div
        className={`rounded-3xl p-6 sm:p-7 border shadow-sm space-y-4 ${
          isDark ? 'bg-[#16291E] border-[#70B873]/25 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#0E5C36] dark:text-[#70B873]" />
          <h2 className="text-lg font-bold font-display">Notificaciones & Recordatorios</h2>
        </div>

        <div className="space-y-3 pt-1">
          <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-[#0D1912] border border-gray-200 dark:border-gray-800 cursor-pointer">
            <div>
              <p className="text-xs sm:text-sm font-bold">Recordatorio Diario de Hábitos</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Aviso a las 09:00 AM para registrar desayuno e hidratación.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyDaily}
              onChange={(e) => setNotifyDaily(e.target.checked)}
              className="w-5 h-5 rounded text-[#0E5C36]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-[#0D1912] border border-gray-200 dark:border-gray-800 cursor-pointer">
            <div>
              <p className="text-xs sm:text-sm font-bold">Alertas de Proyectos de Microgreens</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Notificación cuando sea momento de regar o exponer a la luz.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyProjects}
              onChange={(e) => setNotifyProjects(e.target.checked)}
              className="w-5 h-5 rounded text-[#0E5C36]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-[#0D1912] border border-gray-200 dark:border-gray-800 cursor-pointer">
            <div>
              <p className="text-xs sm:text-sm font-bold">Metas de Hidratación</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Sonido suave al alcanzar tus 8 vasos de agua del día.
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifyHydration}
              onChange={(e) => setNotifyHydration(e.target.checked)}
              className="w-5 h-5 rounded text-[#0E5C36]"
            />
          </label>
        </div>

        <button
          onClick={handleSaveNotifications}
          className="px-5 py-2 text-xs font-bold rounded-xl bg-[#0E5C36] text-white hover:bg-[#16472D] transition-colors"
        >
          Guardar Preferencias de Alertas
        </button>
      </div>

      {/* SECURITY & DATA EXPORT */}
      <div
        className={`rounded-3xl p-6 sm:p-7 border shadow-sm space-y-4 ${
          isDark ? 'bg-[#16291E] border-[#70B873]/25 text-white' : 'bg-white border-[#0E5C36]/15 text-gray-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#0E5C36] dark:text-[#70B873]" />
          <h2 className="text-lg font-bold font-display">Seguridad y Exportación</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#0D1912] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Cambiar Contraseña</span>
          </button>

          <button
            onClick={handleExportData}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#0D1912] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#70B873]" />
            <span>Descargar Mis Datos (.JSON)</span>
          </button>
        </div>

        {showPasswordChange && (
          <form onSubmit={handlePasswordSubmit} className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0D1912] border border-gray-200 dark:border-gray-800 space-y-3 animate-in fade-in">
            {passSaved ? (
              <div className="text-emerald-600 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Contraseña actualizada correctamente!</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Contraseña Actual</label>
                    <input
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Nueva Contraseña</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-[#0E5C36] text-white hover:bg-[#16472D]"
                >
                  Actualizar Contraseña
                </button>
              </>
            )}
          </form>
        )}

        {/* LOGOUT DANGER ZONE */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-red-600 dark:text-red-400">Cerrar Sesión Activa</p>
            <p className="text-[11px] text-gray-400">Tu progreso se guardará en este dispositivo.</p>
          </div>
          <button
            onClick={onLogout}
            id="btn-settings-logout"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};
