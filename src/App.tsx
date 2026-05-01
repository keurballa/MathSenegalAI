/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Camera, 
  LayoutDashboard, 
  User, 
  ChevronRight, 
  ArrowLeft,
  Sparkles,
  Award,
  Upload,
  BrainCircuit,
  MessageSquare,
  History,
  Target,
  Trophy,
  Dices
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Chapter, GradeLevel, MathSolution, UserProfile, GeneratedExercise } from './types';
import { CURRICULUM } from './constants';
import { geminiService } from './services/geminiService';

// --- Components ---

const Sidebar = ({ activeView, setActiveView }: { activeView: string, setActiveView: (v: string) => void }) => {
  const items = [
    { id: 'home', icon: BookOpen, label: 'Niveaux' },
    { id: 'scan', icon: Camera, label: 'Scanner AI' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Analyses' },
    { id: 'profile', icon: User, label: 'Mon Profil' },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none">Σ</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-emerald-900 italic">MathSénégal AI</h1>
        </div>
        
        <nav className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4 ml-2">Menu Principal</p>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all",
                activeView === item.id 
                  ? "bg-emerald-50 text-emerald-700 font-bold" 
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
          <p className="text-[10px] font-bold text-amber-800 uppercase mb-1">Mode Hors-ligne</p>
          <p className="text-[11px] text-amber-700 leading-tight">Accès aux cours sans connexion activé.</p>
        </div>
      </div>
    </aside>
  );
};

const Navbar = ({ activeView, setActiveView }: { activeView: string, setActiveView: (v: string) => void }) => {
  const items = [
    { id: 'home', icon: BookOpen, label: 'Cours' },
    { id: 'scan', icon: Camera, label: 'Scanner' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 pb-8 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeView === item.id ? "text-emerald-700 font-bold" : "text-slate-400"
            )}
          >
            <item.icon size={24} />
            <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [selectedChapterObj, setSelectedChapterObj] = useState<Chapter | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [generatedExercise, setGeneratedExercise] = useState<GeneratedExercise | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [solution, setSolution] = useState<MathSolution | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    uid: '123',
    email: 'eleve@kebemer.sn',
    displayName: 'Amath',
    role: 'student',
    grade: '3e',
    points: 1240,
    badges: ['🌱 Jeune Mathématicien']
  });

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setActiveView('solution');

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      try {
        const res = await geminiService.solveMathProblem(
          { mimeType: file.type, data: base64Data },
          selectedGrade || '3e'
        );
        setSolution(res);
        setUserProfile(prev => ({ ...prev, points: prev.points + 50 }));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateExercise = async (chapter: string, diff: 'easy' | 'medium' | 'hard') => {
    if (!selectedGrade) return;
    setIsLoading(true);
    setActiveView('training-solve');
    setShowHint(false);
    setShowSolution(false);
    
    try {
      const exercise = await geminiService.generateExercise(selectedGrade, chapter, diff);
      setGeneratedExercise(exercise);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-emerald-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header (re-styled) */}
        <header className="bg-white border-b border-slate-200 h-16 md:h-20 flex items-center px-6 sticky top-0 z-40">
          <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">Σ</div>
              <h1 className="font-bold text-lg text-emerald-900 tracking-tight italic">MathSénégal AI</h1>
            </div>
            
            <div className="hidden md:flex items-center bg-slate-100/80 px-4 py-2 rounded-xl w-96 border border-slate-200/50">
              <span className="text-slate-400 text-sm">Rechercher un chapitre (ex: Pythagore)...</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Major de Classe</span>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
                  {userProfile.points} Points
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.displayName}`} alt="User" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto p-5 md:p-10 pb-28 md:pb-10">
          <AnimatePresence mode="wait">
            {activeView === 'home' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key="home"
                className="space-y-10"
              >
                <section className="text-center md:text-left">
                  <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">Salam, {userProfile.displayName} ! 🇸🇳</h2>
                  <p className="text-slate-500 font-medium italic">Que veux-tu faire aujourd'hui ?</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                  <button 
                    onClick={() => setActiveView('scan')}
                    className="card-math p-8 flex flex-col items-center gap-4 text-center group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl math-gradient flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                      <Camera size={32} />
                    </div>
                    <div>
                      <span className="block text-xl font-black text-slate-900 mb-1">📸 Scanner</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Aide instantanée</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedGrade(null); // Reset to ensure picking a grade
                      setActiveView('grades');
                    }}
                    className="card-math p-8 flex flex-col items-center gap-4 text-center group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                      <BookOpen size={32} />
                    </div>
                    <div>
                      <span className="block text-xl font-black text-slate-900 mb-1">📘 Réviser</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tous les chapitres</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveView('dashboard')}
                    className="card-math p-8 flex flex-col items-center gap-4 text-center group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-lg shadow-amber-100 group-hover:scale-110 transition-transform">
                      <LayoutDashboard size={32} />
                    </div>
                    <div>
                      <span className="block text-xl font-black text-slate-900 mb-1">📊 Progression</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tes statistiques</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedGrade(null);
                      setActiveView('grades');
                    }}
                    className="card-math p-8 flex flex-col items-center gap-4 text-center group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-lg shadow-rose-100 group-hover:scale-110 transition-transform">
                      <BrainCircuit size={32} />
                    </div>
                    <div>
                      <span className="block text-xl font-black text-slate-900 mb-1">🧩 S'entraîner</span>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Défis personnalisés</span>
                    </div>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full border border-emerald-100/50 w-fit mx-auto animate-pulse">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Accès Hors-ligne Activé</span>
                </div>
              </motion.div>
            )}

            {activeView === 'grades' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key="grades"
                className="space-y-10"
              >
                <div className="flex items-center gap-4">
                  <button onClick={() => setActiveView('home')} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50">
                    <ArrowLeft size={18} />
                  </button>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Choisis ta classe</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(CURRICULUM).map(([cycle, levels]) => (
                    <div key={cycle} className="space-y-4">
                      <h3 className="text-[11px] font-bold uppercase text-slate-400 tracking-[0.2em] px-1">{cycle}</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {levels.map((lvl) => (
                          <button
                            key={lvl.id}
                            onClick={() => {
                              setSelectedGrade(lvl.id as GradeLevel);
                              setActiveView('chapters');
                            }}
                            className={cn(
                              "group p-5 rounded-2xl border bg-white flex items-center justify-between transition-all active:scale-[0.98] hover:shadow-lg hover:shadow-slate-200/50",
                              selectedGrade === lvl.id ? "border-emerald-600 ring-1 ring-emerald-600" : "border-slate-200"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                <BookOpen size={22} />
                              </div>
                              <div className="text-left">
                                <span className="block font-bold text-slate-800 text-lg">{lvl.name}</span>
                                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">{lvl.chapters.length} Chapitres</span>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeView === 'chapters' && selectedGrade && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                key="chapters"
                className="space-y-8"
              >
                <button 
                  onClick={() => setActiveView('grades')} 
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="font-bold text-sm uppercase tracking-wider">Retour aux niveaux</span>
                </button>

                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-[10px] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Cahier de classe</span>
                    <h2 className="text-4xl font-bold text-slate-900 mt-3 tracking-tight">Mathématiques {selectedGrade}</h2>
                    <p className="text-slate-500 mt-2 italic">Programme officiel du Sénégal</p>
                  </div>
                </header>

                <div className="space-y-10">
                  {Array.from(new Set(CURRICULUM.Moyen.concat(CURRICULUM.Secondaire).find(l => l.id === selectedGrade)?.chapters.map(c => c.category))).map(category => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-emerald-600 rounded-full"></div>
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CURRICULUM.Moyen.concat(CURRICULUM.Secondaire)
                          .find(l => l.id === selectedGrade)
                          ?.chapters.filter(c => c.category === category)
                          .map((ch, idx) => (
                          <div 
                            key={ch.id} 
                            onClick={() => {
                              setSelectedChapterObj(ch);
                              setSelectedChapter(ch.title);
                              setActiveView('course');
                            }}
                            className="card-math p-5 flex items-center justify-between group cursor-pointer active:bg-slate-50/50"
                          >
                            <div className="flex items-center gap-5">
                              <div className="w-10 h-10 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                {idx + 1}
                              </div>
                              <div className="text-left">
                                <span className="block font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{ch.title}</span>
                                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide">Consulter le cours →</span>
                              </div>
                            </div>
                            <ChevronRight size={18} className="text-slate-200 group-hover:text-emerald-600 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeView === 'course' && selectedChapterObj && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                key="course"
                className="max-w-3xl mx-auto space-y-8"
              >
                <button 
                  onClick={() => setActiveView('chapters')} 
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="font-bold text-sm uppercase tracking-wider">Retour aux chapitres</span>
                </button>

                <div className="card-math p-10 bg-white shadow-xl shadow-slate-200/40">
                  <header className="border-b border-slate-100 pb-8 mb-8">
                    <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">{selectedChapterObj.category}</span>
                    <h2 className="text-4xl font-black text-slate-900 mt-2 mb-4">{selectedChapterObj.title}</h2>
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl w-fit border border-blue-100/50">
                      <BrainCircuit size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">Leçon Interactive</span>
                    </div>
                  </header>

                  <div className="space-y-10">
                    <section className="space-y-4">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">🎯 Objectifs de la leçon</h3>
                      <ul className="space-y-3">
                        {selectedChapterObj.objectives?.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Award size={12} />
                            </div>
                            <span className="text-sm font-medium">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <div className="p-8 bg-emerald-900 rounded-3xl text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <h3 className="text-xl font-black mb-4">Prêt pour l'entraînement ?</h3>
                        <p className="text-emerald-100 mb-8 max-w-md leading-relaxed italic">
                          "La pratique est le seul moyen de maîtriser les mathématiques. L'IA va générer un sujet adapté à ton niveau."
                        </p>
                        <button 
                          onClick={() => {
                            setSelectedChapter(selectedChapterObj.title);
                            setActiveView('training-setup');
                          }}
                          className="bg-white text-emerald-900 px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-950/20"
                        >
                          <Target size={20} />
                          Lancer un défi (+100 pts)
                        </button>
                      </div>
                      <div className="absolute right-[-20%] bottom-[-20%] w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50"></div>
                      <Trophy size={120} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'training-setup' && selectedChapter && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                key="training-setup"
                className="max-w-2xl mx-auto space-y-10 py-10"
              >
                <header className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <Target size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Générateur d'Exercices</h2>
                  <p className="text-slate-500 font-medium italic">Personnalise ton entraînement sur le chapitre : <br/> <span className="text-emerald-600 font-bold">"{selectedChapter}"</span></p>
                </header>

                <div className="card-math p-8 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em]">Niveau de difficulté</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {(['easy', 'medium', 'hard'] as const).map((d) => (
                        <button
                          key={d}
                          onClick={() => setDifficulty(d)}
                          className={cn(
                            "py-4 rounded-xl border font-bold transition-all capitalize",
                            difficulty === d 
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105" 
                              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                          )}
                        >
                          {d === 'easy' ? 'Facile' : d === 'medium' ? 'Intermédiaire' : 'Avancé'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                      <BrainCircuit size={20} />
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-slate-800 mb-1">Comment ça marche ?</p>
                      <p className="text-slate-500 leading-relaxed">Notre IA va concevoir un exercice unique respectant le <span className="text-emerald-600 font-bold">programme officiel du Sénégal</span> avec une solution guidée.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleGenerateExercise(selectedChapter, difficulty)}
                    className="btn-primary w-full py-4 text-lg"
                  >
                    <Dices size={24} />
                    Générer mon exercice
                  </button>

                  <button 
                    onClick={() => setActiveView('chapters')}
                    className="w-full text-center text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-slate-600 transition-colors"
                  >
                    Changer de chapitre
                  </button>
                </div>
              </motion.div>
            )}

            {activeView === 'training-solve' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                key="training-solve"
                className="max-w-3xl mx-auto space-y-8"
              >
                <header className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveView('training-setup')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-[10px]"
                  >
                    <ArrowLeft size={16} />
                    <span>Configuration</span>
                  </button>
                  <div className="flex gap-2">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      generatedExercise?.difficulty === 'easy' ? "bg-emerald-100 text-emerald-700" :
                      generatedExercise?.difficulty === 'medium' ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    )}>
                      Mode {generatedExercise?.difficulty}
                    </div>
                  </div>
                </header>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32 space-y-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full"
                    />
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-800 animate-pulse">L'IA rédige ton sujet...</p>
                      <p className="text-slate-400 text-sm italic mt-1">Conformité au programme sénégalais vérifiée.</p>
                    </div>
                  </div>
                ) : generatedExercise ? (
                  <div className="space-y-10 pb-20">
                    <div className="card-math p-10 bg-white shadow-xl shadow-slate-200/50 border-emerald-100">
                      <div className="flex items-center gap-3 mb-6">
                        <Trophy size={20} className="text-amber-500" />
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Sujet d'entraînement</h3>
                      </div>
                      <p className="text-2xl font-bold text-slate-800 leading-relaxed mb-8">{generatedExercise.problem}</p>
                      
                      <div className="flex flex-wrap gap-3">
                        {!showHint && (
                          <button 
                            onClick={() => setShowHint(true)}
                            className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-xs font-bold border border-amber-100 hover:bg-amber-100 transition-colors"
                          >
                            💡 Voir un indice
                          </button>
                        )}
                        {!showSolution && (
                          <button 
                            onClick={() => setShowSolution(true)}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
                          >
                            ✨ Voir la solution
                          </button>
                        )}
                      </div>

                      {showHint && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm italic text-amber-800"
                        >
                          <span className="font-bold">Indice du Prof :</span> {generatedExercise.hint}
                        </motion.div>
                      )}
                    </div>

                    {showSolution && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                      >
                         <div className="flex items-center gap-3">
                          <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
                          <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Correction Détaillée</h3>
                        </div>

                        <div className="space-y-6">
                          {generatedExercise.solution.steps.map((step, i) => (
                            <div key={i} className="relative pl-12">
                              <div className="absolute left-0 top-1 w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                                {i + 1}
                              </div>
                              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm font-mono text-sm leading-relaxed">
                                {step}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="card-math p-8 bg-emerald-600 text-white border-none shadow-xl shadow-emerald-100">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Réponse attendue</h3>
                          <p className="text-4xl font-black font-mono tracking-tight">{generatedExercise.solution.finalAnswer}</p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4">
                           <div className="flex items-center gap-2">
                             <BrainCircuit size={20} className="text-blue-600" />
                             <h4 className="font-bold text-blue-900">Le coin du Professeur</h4>
                           </div>
                           <p className="text-sm text-blue-800 leading-relaxed italic">
                             {generatedExercise.solution.explanation}
                           </p>
                        </div>

                        <button 
                          onClick={() => handleGenerateExercise(selectedChapter!, difficulty)}
                          className="btn-primary w-full py-4"
                        >
                          <Dices size={24} />
                          Encore un exercice !
                        </button>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-20 text-slate-400">Erreur lors de la génération. Réessaye.</div>
                )}
              </motion.div>
            )}

            {activeView === 'scan' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                key="scan"
                className="max-w-2xl mx-auto space-y-10 flex flex-col items-center justify-center min-h-[65vh] text-center"
              >
                <div className="w-28 h-28 rounded-3xl math-gradient flex items-center justify-center text-white shadow-2xl shadow-emerald-200 rotate-3 animate-pulse">
                  <Camera size={48} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Intelligence Artificielle</h2>
                  <p className="text-slate-500 font-medium text-lg italic">
                    Scanne ton exercice pour une résolution guidée étape par étape.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <label className="btn-primary flex-1 p-6 h-auto flex flex-col items-center text-center gap-3">
                    <Camera size={32} />
                    <div>
                      <span className="block text-lg">Appareil Photo</span>
                      <span className="block text-[11px] opacity-70 uppercase tracking-widest mt-1">Photo instantanée</span>
                    </div>
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleScan} />
                  </label>
                  <label className="btn-secondary h-auto p-6 flex flex-col items-center text-center gap-3 border shadow-sm">
                    <Upload size={32} className="text-emerald-600" />
                    <div>
                      <span className="block text-lg text-slate-800">Importer PDF / Image</span>
                      <span className="block text-[11px] opacity-70 uppercase tracking-widest mt-1 text-slate-400">Devoirs & Cours</span>
                    </div>
                    <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleScan} />
                  </label>
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white w-full text-left overflow-hidden relative shadow-xl">
                  <div className="relative z-10 flex gap-6 items-start">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0 mt-1">
                      <BrainCircuit size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 tracking-tight">Le Thabit : Défi Géométrique</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Démontre cette propriété extraite du manuel CIAM 3ème. Relève le défi maintenant !
                      </p>
                      <button className="bg-emerald-500 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
                        Démarrer (+50 pts)
                      </button>
                    </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 border-[20px] border-emerald-500/20 rounded-full"></div>
                </div>
              </motion.div>
            )}

            {activeView === 'solution' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                key="solution"
                className="max-w-3xl mx-auto space-y-8"
              >
                <header className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveView('scan')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-[10px]"
                  >
                    <ArrowLeft size={16} />
                    <span>Nouveau Scan AI</span>
                  </button>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        if (solution) {
                          const utterance = new SpeechSynthesisUtterance(solution.explanation);
                          utterance.lang = 'fr-FR';
                          window.speechSynthesis.speak(utterance);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-emerald-600 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm"
                      title="Lire l'explication"
                    >
                      <MessageSquare size={16} />
                      <span>Audio Prof</span>
                    </button>
                  </div>
                </header>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32 space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
                        <Sparkles size={20} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-slate-800 animate-pulse">Analyse de l'IA en cours...</p>
                      <p className="text-slate-400 text-sm italic mt-1">Le Professeur prépare ta résolution.</p>
                    </div>
                  </div>
                ) : solution ? (
                  <div className="space-y-8 pb-10">
                    <div className="card-math p-8 bg-slate-100 border-none relative overflow-hidden">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-[0.2em]">Énoncé identifié</h3>
                      <p className="text-slate-800 font-bold text-xl leading-relaxed italic relative z-10">"{solution.problem}"</p>
                      <div className="absolute right-[-10%] top-[-20%] w-32 h-32 bg-slate-200 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
                        <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Résolution Étape par Étape</h3>
                      </div>

                      <div className="space-y-6">
                        {solution.steps.map((step, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative pl-12"
                          >
                            <div className="absolute left-0 top-1 w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-lg shadow-emerald-200">
                              {i + 1}
                            </div>
                            {i < solution.steps.length - 1 && (
                              <div className="absolute left-4 top-10 bottom-[-24px] w-[2px] bg-slate-200"></div>
                            )}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-emerald-300 transition-colors">
                              <p className="text-slate-700 font-mono text-sm leading-relaxed whitespace-pre-wrap">{step}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="card-math p-8 bg-emerald-600 text-white border-none shadow-xl shadow-emerald-100 mt-12 relative overflow-hidden">
                        <div className="relative z-10">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Résultat Final</h3>
                          <p className="text-4xl font-black font-mono tracking-tight">{solution.finalAnswer}</p>
                        </div>
                        <Sparkles size={80} className="absolute right-[-20px] bottom-[-20px] opacity-10" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="card-math p-8 flex flex-col gap-4">
                          <h3 className="font-bold text-slate-900 border-b pb-4 border-slate-100 flex items-center gap-2">
                            <BrainCircuit size={18} className="text-blue-500" />
                            Explication Prof AI
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed italic">{solution.explanation}</p>
                        </div>

                        {solution.commonErrors && solution.commonErrors.length > 0 && (
                          <div className="card-math p-8 bg-rose-50 border-rose-100 border flex flex-col gap-4">
                            <h3 className="font-bold text-rose-800 border-b pb-4 border-rose-200 flex items-center gap-2">
                              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                              Analyses des Erreurs
                            </h3>
                            <ul className="space-y-3">
                              {solution.commonErrors.map((err, i) => (
                                <li key={i} className="flex gap-2 text-rose-700 text-xs font-bold bg-white/50 p-2 rounded-lg leading-relaxed">
                                  <span>⚠️</span> {err}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-slate-400">Désolé, je n'ai pas pu résoudre cet exercice.</div>
                )}
              </motion.div>
            )}

            {activeView === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                key="dashboard"
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Analyses de Progrès</h2>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1">Rang : Major de Classe</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="card-math p-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <History size={26} />
                    </div>
                    <div>
                      <span className="block text-3xl font-black text-slate-900">1,240</span>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Points accumulés</span>
                    </div>
                  </div>
                  <div className="card-math p-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Target size={26} />
                    </div>
                    <div>
                      <span className="block text-3xl font-black text-slate-900">85%</span>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Maîtrise Globale</span>
                    </div>
                  </div>
                  <div className="card-math p-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                      <BrainCircuit size={26} />
                    </div>
                    <div>
                      <span className="block text-3xl font-black text-slate-900">12</span>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Exercices Réussis</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="card-math p-8">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                       <Award size={18} className="text-emerald-500" />
                       Points Forts
                    </h3>
                    <div className="space-y-6">
                      {[
                        { topic: 'Calcul littéral', val: 95 },
                        { topic: 'Fractions', val: 88 },
                        { topic: 'Proportionnalité', val: 82 }
                      ].map((d, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-xs font-bold text-slate-600">
                            <span>{d.topic}</span>
                            <span>{d.val}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${d.val}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-math p-8 border-orange-100 bg-orange-50/10">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-orange-100 pb-4 flex items-center gap-2">
                      <Sparkles size={18} className="text-orange-500" />
                      Lacunes Détectées
                    </h3>
                    <div className="space-y-4">
                      {[
                        { topic: 'Théorème de Pythagore', status: 'À revoir' },
                        { topic: 'Racines Carrées', status: 'Besoin d\'aide' }
                      ].map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-orange-100">
                          <span className="text-sm font-bold text-slate-700">{d.topic}</span>
                          <span className="text-[10px] font-black uppercase py-1 px-2 bg-orange-100 text-orange-700 rounded-lg">
                            {d.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card-math p-10 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="shrink-0">
                      <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-6 group-hover:rotate-0 transition-transform">
                        <Trophy size={40} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black mb-2 tracking-tight">Objectif : Génie du Sahel</h4>
                      <p className="text-slate-400 mb-6 max-w-lg leading-relaxed italic">
                        "Encore 5 exercices sur la Géométrie Plane pour débloquer ton prochain badge."
                      </p>
                      <button 
                        onClick={() => setActiveView('grades')}
                        className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
                      >
                        S'entraîner maintenant
                      </button>
                    </div>
                  </div>
                  <div className="absolute right-[-10%] top-[-20%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                  <Sparkles size={120} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/5 pointer-events-none" />
                </div>
              </motion.div>
            )}

            {activeView === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key="profile"
                className="max-w-2xl mx-auto space-y-10"
              >
                <div className="flex flex-col items-center gap-6 py-10">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl bg-emerald-50 overflow-hidden relative">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.displayName}`} alt="Avatar" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg">
                      <Award size={18} />
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{userProfile.displayName}</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{userProfile.email}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Succès Académiques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userProfile.badges.map((badge, i) => (
                      <div key={i} className="card-math p-6 flex flex-col items-center gap-3 text-center transition-all hover:scale-105">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                          {badge.charAt(0)}
                        </div>
                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight leading-tight">
                          {badge.substring(2)}
                        </span>
                      </div>
                    ))}
                    <div className="card-math p-6 flex flex-col items-center justify-center border-dashed border-slate-300 opacity-50 bg-slate-50/50">
                      <span className="text-3xl font-black text-slate-300">?</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">Bloqué</span>
                    </div>
                  </div>
                </div>

                <div className="card-math p-0 overflow-hidden divide-y divide-slate-100">
                  <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                    <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">Niveau Scolaire</span>
                    <span className="font-black text-emerald-600 text-lg">{userProfile.grade}</span>
                  </div>
                  <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                    <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">Langue de l'IA</span>
                    <span className="font-black text-slate-900">Français (Sénégal)</span>
                  </div>
                  <button className="w-full p-6 text-center text-rose-500 font-black uppercase tracking-widest text-xs hover:bg-rose-50 transition-colors">
                    Fermer la session
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <Navbar activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
}
