import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, User, MessageSquare, Tag, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactFormProps {
  isDark?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'informacion',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#0E5C36', '#70B873', '#F4D06F']
        });
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: 'informacion', message: '' });
    setSubmitted(false);
    setError('');
  };

  return (
    <div
      id="contact-section-container"
      className={`relative w-full max-w-xl mx-auto rounded-3xl p-6 sm:p-8 border shadow-xl transition-all duration-300 ${
        isDark
          ? 'bg-[#16291E]/95 border-[#70B873]/30 text-white shadow-black/40'
          : 'bg-white/95 border-[#0E5C36]/20 text-gray-800 shadow-emerald-950/5'
      }`}
    >
      {/* Decorative top accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-full bg-gradient-to-r from-[#0E5C36] via-[#70B873] to-[#0E5C36]" />

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
          <MessageSquare className="w-3.5 h-3.5" /> Contáctanos
        </div>
        <h3 className={`text-2xl sm:text-3xl font-extrabold font-display ${isDark ? 'text-white' : 'text-[#102417]'}`}>
          ¿Tienes preguntas sobre <span className={isDark ? 'text-[#70B873]' : 'text-[#0E5C36]'}>NutriGrow</span>?
        </h3>
        <p className={`text-sm mt-1 font-medium ${isDark ? 'text-gray-300' : 'text-[#2D4536]'}`}>
          Escríbenos y nuestro equipo de nutricionistas y especialistas te responderá en minutos.
        </p>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-[#0E5C36] dark:text-[#70B873]">
              ¡Mensaje Enviado con Éxito!
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-sm mx-auto">
              Gracias, <strong>{formData.name}</strong>. Hemos recibido tu consulta sobre{' '}
              <span className="italic font-medium">{formData.subject}</span> y nos pondremos en contacto a{' '}
              <strong>{formData.email}</strong>.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-[#0E5C36] text-white hover:bg-[#16472D] transition-colors shadow-md"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Tu Nombre Completo *
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 absolute left-3.5 text-gray-400" />
              <input
                id="contact-input-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Sofía Martínez"
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-all outline-none ${
                  isDark
                    ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873] focus:ring-2 focus:ring-[#70B873]/20'
                    : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36] focus:ring-2 focus:ring-[#0E5C36]/10'
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
                id="contact-input-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sofia@ejemplo.com"
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-all outline-none ${
                  isDark
                    ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873] focus:ring-2 focus:ring-[#70B873]/20'
                    : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36] focus:ring-2 focus:ring-[#0E5C36]/10'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Asunto o Interés
            </label>
            <div className="relative flex items-center">
              <Tag className="w-4 h-4 absolute left-3.5 text-gray-400" />
              <select
                id="contact-select-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-all outline-none appearance-none ${
                  isDark
                    ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873]'
                    : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36]'
                }`}
              >
                <option value="informacion">Información General de NutriGrow</option>
                <option value="planes">Planes y Recetarios Personalizados</option>
                <option value="cultivo">Kit y Proyectos de Cultivo de Microgreens</option>
                <option value="nutricionistas">Consulta con Nutricionista Aliado</option>
                <option value="soporte">Soporte Técnico / Cuenta</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Tu Mensaje *
              </label>
              <span className="text-[11px] text-gray-400">
                {formData.message.length}/500 caracteres
              </span>
            </div>
            <textarea
              id="contact-textarea-message"
              required
              rows={4}
              maxLength={500}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Escribe tu consulta o meta de salud..."
              className={`w-full p-3 text-sm rounded-xl border transition-all outline-none resize-none ${
                isDark
                  ? 'bg-[#0D1912] border-[#70B873]/30 text-white focus:border-[#70B873] focus:ring-2 focus:ring-[#70B873]/20'
                  : 'bg-[#F6F4EE]/50 border-gray-200 text-gray-900 focus:border-[#0E5C36] focus:ring-2 focus:ring-[#0E5C36]/10'
              }`}
            />
          </div>

          <button
            type="submit"
            id="btn-submit-contact"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#0E5C36] text-white hover:bg-[#16472D] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Consulta Ahora</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
