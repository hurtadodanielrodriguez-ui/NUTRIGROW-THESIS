import React, { useState } from 'react';
import { 
  Sprout, Plus, CheckCircle2, Circle, Calendar, 
  Sparkles, Award, Trash2, ArrowRight, X, Clock, 
  Layers, Check
} from 'lucide-react';
import { Project, ProjectTask } from '../../types';
import confetti from 'canvas-confetti';

interface ProjectsViewProps {
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  isDark: boolean;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onUpdateProjects,
  isDark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'Cultivo' as 'Cultivo' | 'Nutrición' | 'Hábitos' | 'Meal Prep',
    targetDays: 14,
    taskInputs: ['', '', '']
  });

  const categories = ['Todos', 'Cultivo', 'Nutrición', 'Hábitos', 'Meal Prep'];

  const filteredProjects = selectedCategory === 'Todos'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const toggleTask = (projectId: string, taskId: string) => {
    const updated = projects.map((proj) => {
      if (proj.id !== projectId) return proj;
      const updatedTasks = proj.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      const completedCount = updatedTasks.filter((t) => t.completed).length;
      const progress = Math.round((completedCount / Math.max(1, updatedTasks.length)) * 100);
      const status: 'en_progreso' | 'completado' = progress === 100 ? 'completado' : 'en_progreso';

      if (progress === 100 && proj.progress < 100) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0E5C36', '#70B873', '#F4D06F', '#34D399']
          });
        } catch {}
      }

      return {
        ...proj,
        tasks: updatedTasks,
        progress,
        status
      };
    });

    onUpdateProjects(updated);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const validTasks: ProjectTask[] = newProject.taskInputs
      .filter((t) => t.trim().length > 0)
      .map((t, idx) => ({
        id: `t_new_${Date.now()}_${idx}`,
        title: t.trim(),
        completed: false
      }));

    if (validTasks.length === 0) {
      validTasks.push({
        id: `t_new_${Date.now()}_0`,
        title: 'Iniciar y dar seguimiento diario',
        completed: false
      });
    }

    const created: Project = {
      id: `proj_${Date.now()}`,
      title: newProject.title,
      description: newProject.description || 'Proyecto de salud consciente en NutriGrow.',
      category: newProject.category,
      progress: 0,
      startDate: '08 Sep 2026',
      targetDate: `28 Sep 2026`,
      status: 'en_progreso',
      badgeIcon: 'Sprout',
      colorTag: '#0E5C36',
      tasks: validTasks
    };

    onUpdateProjects([created, ...projects]);
    setShowAddModal(false);
    setNewProject({
      title: '',
      description: '',
      category: 'Cultivo',
      targetDays: 14,
      taskInputs: ['', '', '']
    });

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0E5C36', '#70B873']
      });
    } catch {}
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('¿Deseas archivar o eliminar este proyecto?')) {
      onUpdateProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div id="view-proyectos-section" className="space-y-8 animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
            <Sprout className="w-3.5 h-3.5" /> Autocultivo & Hábitos
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
            Mis Proyectos <span className="text-[#0E5C36] dark:text-[#70B873]">NutriGrow</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            Crea retos, siembra germinados vivos en casa y organiza tus rutinas de cocina saludable.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          id="btn-create-new-project"
          className="px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-[#0E5C36] text-white hover:bg-[#16472D] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Nuevo Proyecto</span>
        </button>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-2xl transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0E5C36] text-white shadow-md'
                : isDark
                ? 'bg-[#16291E] text-gray-300 hover:bg-[#70B873]/20 border border-[#70B873]/20'
                : 'bg-white text-gray-700 hover:bg-emerald-50 border border-[#0E5C36]/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const isFinished = project.progress === 100;
          return (
            <div
              key={project.id}
              className={`rounded-3xl p-6 sm:p-7 border shadow-md flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                isDark
                  ? 'bg-[#16291E] border-[#70B873]/25 text-white'
                  : 'bg-white border-[#0E5C36]/15 text-gray-800'
              }`}
            >
              <div className="space-y-4">
                {/* Header tags */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#70B873]/20 text-[#0E5C36] dark:text-[#70B873]">
                      {project.category}
                    </span>
                    {isFinished && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-black flex items-center gap-1">
                        <Award className="w-3 h-3" /> ¡Completado!
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    title="Eliminar proyecto"
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Project Title & Description */}
                <div>
                  <h3 className="text-xl font-bold font-display">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-gray-500 dark:text-gray-400">Progreso del Reto</span>
                    <span className="text-[#0E5C36] dark:text-[#70B873]">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-[#0D1912] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0E5C36] to-[#70B873] transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Task Checklist */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Lista de Tareas ({project.tasks.filter((t) => t.completed).length}/{project.tasks.length})
                  </span>
                  <div className="space-y-2">
                    {project.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(project.id, task.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          task.completed
                            ? 'bg-emerald-100/40 dark:bg-emerald-950/30 border-emerald-500/40 text-gray-500'
                            : 'bg-gray-50/70 dark:bg-[#0D1912]/50 border-gray-200 dark:border-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              task.completed
                                ? 'bg-emerald-600 text-white'
                                : 'border-2 border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {task.completed && <Check className="w-3 h-3" />}
                          </div>
                          <span className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer timeline */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#70B873]" /> Inicio: {project.startDate}
                </span>
                <span className="font-semibold text-[#0E5C36] dark:text-[#70B873]">
                  Meta: {project.targetDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE PROJECT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div
            className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl ${
              isDark ? 'bg-[#16291E] border-[#70B873]/30 text-white' : 'bg-white border-[#0E5C36]/20 text-gray-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold font-display">Crear Nuevo Proyecto</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Título del Proyecto *
                </label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Ej. Huerto de Tomates Cherry en Balcón"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                    Categoría
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-[#16291E] outline-none"
                  >
                    <option value="Cultivo">🌱 Cultivo</option>
                    <option value="Nutrición">🥗 Nutrición</option>
                    <option value="Hábitos">⚡ Hábitos</option>
                    <option value="Meal Prep">🍱 Meal Prep</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                    Duración Estimada (días)
                  </label>
                  <input
                    type="number"
                    min={3}
                    max={90}
                    value={newProject.targetDays}
                    onChange={(e) => setNewProject({ ...newProject, targetDays: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Descripción
                </label>
                <textarea
                  rows={2}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="¿Cuál es el propósito y beneficio de este proyecto?"
                  className="w-full p-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Tareas Iniciales
                </label>
                <div className="space-y-2">
                  {newProject.taskInputs.map((taskVal, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={taskVal}
                      onChange={(e) => {
                        const updated = [...newProject.taskInputs];
                        updated[idx] = e.target.value;
                        setNewProject({ ...newProject, taskInputs: updated });
                      }}
                      placeholder={`Paso ${idx + 1}...`}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent outline-none focus:border-[#70B873]"
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-[#0E5C36] text-white hover:bg-[#16472D]"
                >
                  Crear Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
