import React, { useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';
import { AuthView } from './AuthView';
import { UserProfile } from '../types';

interface ProtectedRouteProps {
  children: ReactNode;
  /**
   * Vista de reemplazo opcional si el usuario no está autenticado.
   * Por defecto renderiza AuthView.tsx o redirige según se configure.
   */
  fallback?: ReactNode;
  /**
   * Ruta opcional para redirigir si se usa enrutador (ej: '/login').
   */
  redirectTo?: string;
  /**
   * Callback invocado al autenticarse con éxito en la vista AuthView embebida.
   */
  onLoginSuccess?: (user: UserProfile) => void;
  /**
   * Callback para regresar a la página de bienvenida.
   */
  onBackToLanding?: () => void;
  /**
   * Modo oscuro opcional.
   */
  isDark?: boolean;
  /**
   * Estado de autenticación local complementario a la sesión de Supabase.
   */
  isAuthenticated?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
  redirectTo,
  onLoginSuccess,
  onBackToLanding,
  isDark = false,
  isAuthenticated = false
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Verificar sesión existente al montar el componente
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('[ProtectedRoute] Error al obtener la sesión:', error.message);
        }
        if (isMounted) {
          setSession(data.session);
        }
      } catch (err) {
        console.error('[ProtectedRoute] Excepción al verificar sesión:', err);
        if (isMounted) {
          setSession(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    // 2. Escuchar cambios de estado de autenticación en tiempo real (login, logout, refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const isUserAllowed = Boolean(session || isAuthenticated);

  // 3. Spinner de carga centrado mientras se valida la sesión
  if (loading && !isAuthenticated) {
    return (
      <div 
        id="protected-route-loader"
        className={`min-h-[60vh] flex flex-col items-center justify-center p-6 text-center ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}
      >
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin" />
          <div className="absolute w-8 h-8 rounded-full border-2 border-emerald-400/30 border-b-emerald-500 animate-spin" style={{ animationDirection: 'reverse' }} />
        </div>
        <p className="text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-300 animate-pulse">
          Validando credenciales de acceso...
        </p>
        <span className="text-xs text-gray-400 mt-1">Conectando con Supabase Auth</span>
      </div>
    );
  }

  // 4. Si no hay sesión válida ni autenticación, redirigir a /login o mostrar AuthView.tsx
  if (!isUserAllowed) {
    if (redirectTo && typeof window !== 'undefined' && window.location.pathname !== redirectTo) {
      window.location.href = redirectTo;
      return null;
    }

    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <AuthView
        initialMode="login"
        onLoginSuccess={(user) => {
          if (onLoginSuccess) {
            onLoginSuccess(user);
          }
        }}
        onBackToLanding={() => {
          if (onBackToLanding) {
            onBackToLanding();
          } else if (typeof window !== 'undefined') {
            window.location.href = '/';
          }
        }}
        isDark={isDark}
      />
    );
  }

  // 5. Sesión válida: renderizar componentes hijos
  return <>{children}</>;
};

export default ProtectedRoute;
