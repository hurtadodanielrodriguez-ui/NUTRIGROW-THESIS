import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, PlusCircle, CheckCircle2, Heart } from 'lucide-react';
import { Testimonial } from '../types';
import { INITIAL_TESTIMONIALS } from '../data/mockData';

interface TestimonialsSectionProps {
  isDark?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isDark }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    city: '',
    comment: '',
    rating: 5,
    tag: 'Estilo de Vida'
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const tags = ['Todos', 'Salud Médica', 'Rendimiento', 'Estilo de Vida', 'Gastronomía'];

  const filteredTestimonials = selectedTag === 'Todos'
    ? testimonials
    : testimonials.filter((t) => t.tag === selectedTag);

  const current = filteredTestimonials[activeIndex % Math.max(1, filteredTestimonials.length)] || testimonials[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.comment.trim()) return;

    const created: Testimonial = {
      id: `test_${Date.now()}`,
      name: newTestimonial.name,
      role: newTestimonial.role || 'Miembro NutriGrow',
      city: newTestimonial.city || 'Comunidad Global',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      comment: newTestimonial.comment,
      rating: newTestimonial.rating,
      tag: newTestimonial.tag,
      date: 'Recién publicado'
    };

    setTestimonials([created, ...testimonials]);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowAddModal(false);
      setNewTestimonial({ name: '', role: '', city: '', comment: '', rating: 5, tag: 'Estilo de Vida' });
    }, 1200);
  };

  return (
    <div id="testimonials-interactive-section" className="w-full max-w-5xl mx-auto py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
          <Heart className="w-3.5 h-3.5" /> Comunidad & Testimonios
        </div>
        <h3 className={`text-3xl sm:text-4xl font-extrabold font-display ${isDark ? 'text-white' : 'text-[#102417]'}`}>
          Experiencias que crecen con <span className={isDark ? 'text-[#70B873]' : 'text-[#0E5C36]'}>NutriGrow</span>
        </h3>
        <p className={`text-sm sm:text-base mt-2 max-w-2xl mx-auto font-medium ${isDark ? 'text-gray-300' : 'text-[#2D4536]'}`}>
          Descubre cómo miles de personas han transformado su energía, hábitos culinarios y bienestar integral.
        </p>

        {/* Filter tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                setActiveIndex(0);
              }}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#0E5C36] text-white shadow-md'
                  : isDark
                  ? 'bg-[#16291E] text-gray-300 hover:bg-[#70B873]/20 hover:text-white border border-[#70B873]/20'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}

          <button
            onClick={() => setShowAddModal(true)}
            id="btn-open-add-testimonial"
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873] border border-[#70B873]/40 hover:bg-[#70B873]/30 transition-all flex items-center gap-1.5 cursor-pointer ml-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Compartir mi historia</span>
          </button>
        </div>
      </div>

      {/* Featured Testimonial Card */}
      {current && (
        <div
          id="featured-testimonial-card"
          className={`relative rounded-3xl p-6 sm:p-10 border shadow-xl transition-all duration-500 overflow-hidden ${
            isDark
              ? 'bg-[#16291E] border-[#70B873]/30 text-white shadow-black/40'
              : 'bg-white border-[#0E5C36]/20 text-gray-800 shadow-emerald-950/5'
          }`}
        >
          <Quote className="absolute top-4 right-6 w-20 h-20 opacity-5 text-[#0E5C36] dark:text-[#70B873] pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            <div className="relative shrink-0">
              <img
                src={current.avatar}
                alt={current.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#70B873]/40 shadow-lg"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#0E5C36] text-white">
                {current.tag}
              </span>
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < current.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-2">
                  5.0 / 5.0
                </span>
              </div>

              <p className="text-base sm:text-xl font-medium leading-relaxed italic text-gray-700 dark:text-gray-200">
                "{current.comment}"
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[#0E5C36] dark:text-[#70B873]">
                    {current.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {current.role} • {current.city}
                  </p>
                </div>
                <span className="text-xs text-gray-400 font-medium">{current.date}</span>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          {filteredTestimonials.length > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800/60">
              <div className="flex gap-1.5">
                {filteredTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-6 bg-[#0E5C36] dark:bg-[#70B873]'
                        : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  id="btn-prev-testimonial"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-[#0E5C36] hover:text-white dark:hover:bg-[#70B873] dark:hover:text-[#0D1912] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  id="btn-next-testimonial"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-[#0E5C36] hover:text-white dark:hover:bg-[#70B873] dark:hover:text-[#0D1912] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid of all community member testimonials with their photos */}
      <div className="mt-8 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center">
          Voces de nuestra comunidad viva
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((tItem, idx) => {
            const isSelected = current && current.id === tItem.id;
            return (
              <div
                key={tItem.id}
                onClick={() => {
                  const targetIdx = filteredTestimonials.findIndex((t) => t.id === tItem.id);
                  if (targetIdx !== -1) {
                    setActiveIndex(targetIdx);
                  } else {
                    setSelectedTag('Todos');
                    const allIdx = testimonials.findIndex((t) => t.id === tItem.id);
                    setActiveIndex(allIdx !== -1 ? allIdx : 0);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0E5C36] dark:border-[#70B873] bg-[#0E5C36]/5 dark:bg-[#70B873]/10 shadow-md ring-2 ring-[#0E5C36]/20'
                    : isDark
                    ? 'bg-[#16291E]/60 border-gray-800 hover:border-[#70B873]/50'
                    : 'bg-white border-gray-200/80 hover:border-[#0E5C36]/40 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={tItem.avatar}
                    alt={tItem.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#70B873] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs sm:text-sm font-bold truncate text-[#0E5C36] dark:text-[#70B873]">
                      {tItem.name}
                    </h5>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {tItem.role}
                    </p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs italic text-gray-600 dark:text-gray-300 line-clamp-3">
                  "{tItem.comment}"
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl ${
              isDark ? 'bg-[#16291E] border-[#70B873]/40 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            <h4 className="text-xl font-bold font-display mb-1">
              Comparte tu experiencia con NutriGrow
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Tu historia inspira a otros a nutrirse y cultivar salud conscientemente.
            </p>

            {savedSuccess ? (
              <div className="py-8 text-center text-emerald-600 dark:text-[#70B873] space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" />
                <h5 className="font-bold text-lg">¡Testimonio publicado con éxito!</h5>
              </div>
            ) : (
              <form onSubmit={handleAddSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold mb-1">Tu Nombre</label>
                  <input
                    type="text"
                    required
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    placeholder="Ej. Lucas Domínguez"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Ocupación / Rol</label>
                    <input
                      type="text"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      placeholder="Ej. Maratonista"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Ciudad</label>
                    <input
                      type="text"
                      value={newTestimonial.city}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, city: e.target.value })}
                      placeholder="Ej. Buenos Aires"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Categoría</label>
                    <select
                      value={newTestimonial.tag}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, tag: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-[#16291E] outline-none"
                    >
                      <option value="Salud Médica">Salud Médica</option>
                      <option value="Rendimiento">Rendimiento</option>
                      <option value="Estilo de Vida">Estilo de Vida</option>
                      <option value="Gastronomía">Gastronomía</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Calificación</label>
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newTestimonial.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Tu Comentario</label>
                  <textarea
                    required
                    rows={3}
                    value={newTestimonial.comment}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                    placeholder="Cuéntanos cómo NutriGrow te ha ayudado..."
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-semibold rounded-xl bg-[#0E5C36] text-white hover:bg-[#16472D]"
                  >
                    Publicar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
