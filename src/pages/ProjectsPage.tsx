import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain, Code, Bot, Users, Zap, MapPin, Phone, Award,
  Github, Linkedin, Mail, ArrowLeft, Heart, ArrowUp,
  Clock, Menu, X, Calendar, Building, ExternalLink, Search
} from 'lucide-react';

// ---- Scroll animation hook (duplicated from App.tsx) ----
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  return [ref, isVisible] as const;
};

const ScrollReveal = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
}: {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
}) => {
  const [ref, isVisible] = useScrollAnimation(0.1);

  const cls = () => {
    const base = 'transition-all duration-700 ease-out';
    if (!isVisible) {
      switch (animation) {
        case 'fadeInUp': return `${base} opacity-0 translate-y-8`;
        case 'fadeInLeft': return `${base} opacity-0 -translate-x-8`;
        case 'fadeInRight': return `${base} opacity-0 translate-x-8`;
        case 'scaleIn': return `${base} opacity-0 scale-95`;
        default: return `${base} opacity-0 translate-y-8`;
      }
    }
    return `${base} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={ref} className={cls()} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ---- Back to top button ----
const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
    >
      <ArrowUp className="w-6 h-6 text-white" />
    </button>
  ) : null;
};

// ---- Company badge config ----
const COMPANY_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  Nuclieos: {
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/30',
  },
  MindRind: {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
  },
  'NCBA&E (FYP)': {
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/30',
  },
};

// ---- All projects data ----
const allProjects = [
  {
    title: 'Cogit Saas',
    company: 'Nuclieos',
    period: 'Feb 2026 – Present',
    status: 'ongoing',
    description:
      'Developing AI agents for automated business workflows using Python, FastAPI, Next.js, PostgreSQL, and OpenRouter. Engineered an Invoice Processor agent that transcribes business calls, extracts entities, and automates credit note posting to Lexoffice. Enhanced UI components and contributed to data privacy policy implementation. Enabled widget generation and email-processing automation features for customizable business integrations.',
    technologies: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'OpenRouter', 'AI Agents'],
    icon: Bot,
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  {
    title: 'SEObot',
    company: 'Nuclieos',
    period: 'Jan 2026 – Feb 2026',
    status: 'completed',
    description:
      'Designed an AI-driven SEO analysis platform with automated website audits, issue detection, and AI-generated SEO-friendly article generation. Delivered customizable article editing and optimization controls to improve content management flexibility.',
    technologies: ['Next.js', 'Supabase', 'OpenRouter', 'PostHog', 'AI'],
    icon: Search,
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
  },
  {
    title: 'LocalSEO',
    company: 'Nuclieos',
    period: 'Jan 2026 – Feb 2026',
    status: 'completed',
    description:
      'Built a Local SEO analytics platform to evaluate business visibility in local markets. Generated AI-powered optimization recommendations to improve local search presence and business discoverability. Implemented editable recommendation workflows for customized SEO suggestions.',
    technologies: ['Next.js', 'Supabase', 'OpenRouter', 'PostHog', 'Local SEO'],
    icon: MapPin,
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
  },
  {
    title: 'Flexify',
    company: 'Nuclieos',
    period: 'Oct 2025 – Dec 2025',
    status: 'completed',
    description:
      'Architected an AI-powered WhatsApp automation agent capable of handling hotel, restaurant, and flight bookings alongside email automation and reminders. Leveraged FastAPI and LangGraph to orchestrate multiple AI tools. Integrated Booking.com, Stripe, Google APIs, Meta APIs, AccuWeather, and Al-Adhan APIs for payments, bookings, and live updates.',
    technologies: ['FastAPI', 'LangGraph', 'Meta APIs', 'Stripe', 'Booking.com', 'Google APIs', 'AccuWeather'],
    icon: Phone,
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
  },
  {
    title: 'AI Registrar',
    company: 'Nuclieos',
    period: 'Sept 2025 – Oct 2025',
    status: 'completed',
    description:
      'Developed a RAG-based AI chatbot that organized and retrieved doctor-patient records from recorded medical conversations. Structured and aligned patient interaction datasets to improve contextual search and medical record accessibility. Strengthened end-to-end encrypted communication workflows for healthcare data privacy.',
    technologies: ['RAG', 'LLM', 'Python', 'PostgreSQL', 'Healthcare AI'],
    icon: Award,
    gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
  },
  {
    title: 'Medical Exambot & Chatbot',
    company: 'Nuclieos',
    period: 'July 2025 – Oct 2025',
    status: 'completed',
    description:
      'Built an AI-powered medical chatbot with real-time speech-to-speech interaction using FastAPI and ReactJS. Designed 2 dedicated modules: an Exam Bot for medical Q&A evaluation and a Medical Assistant Bot powered by RAG and LLM workflows. Integrated ElevenLabs, Deepgram, and LiveKit for low-latency conversational voice interactions. Managed PostgreSQL-backed session storage and AI-generated consultation summaries.',
    technologies: ['FastAPI', 'ReactJS', 'ElevenLabs', 'Deepgram', 'LiveKit', 'RAG', 'PostgreSQL'],
    icon: Brain,
    gradient: 'bg-gradient-to-br from-red-500 to-orange-600',
  },
  {
    title: 'AI-based WebRTC App',
    company: 'Nuclieos',
    period: 'May 2025 – July 2025',
    status: 'completed',
    description:
      'Engineered a WebRTC-based video conferencing platform using ReactJS and FastAPI with real-time audio/video communication. Integrated Jitsi for screen sharing, messaging, and conferencing features. Implemented AI-driven meeting transcription using Deepgram API and generated automated summaries through OpenAI API.',
    technologies: ['ReactJS', 'FastAPI', 'WebRTC', 'Jitsi', 'Deepgram', 'OpenAI'],
    icon: Users,
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
  },
  {
    title: 'AI Chatbot for Code Development',
    company: 'NCBA&E (FYP)',
    period: '2024 – 2025',
    status: 'completed',
    description:
      'Developed an AI-powered code generation platform using Next.js, React, and TailwindCSS with a responsive dark-mode UI. Integrated Google Generative AI APIs for prompt-based code generation with live previews using Sandpack. Implemented secure authentication workflows using Google OAuth for user access management.',
    technologies: ['Next.js', 'React', 'TailwindCSS', 'Google AI', 'Sandpack', 'OAuth'],
    icon: Code,
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
  },
  {
    title: 'Desktop Assistant in Python',
    company: 'MindRind',
    period: 'Jan 2025 – Apr 2025',
    status: 'completed',
    description:
      'Created an AI desktop assistant with Python and Tkinter supporting voice-based task automation. Integrated speech recognition, text-to-speech, weather APIs, and system automation utilities. Automated browsing, weather updates, and system-level operations through voice commands.',
    technologies: ['Python', 'Tkinter', 'Speech Recognition', 'TTS', 'Weather APIs'],
    icon: Brain,
    gradient: 'bg-gradient-to-br from-green-500 to-teal-600',
  },
];

type FilterType = 'All' | 'Nuclieos' | 'MindRind' | 'Academic';

const FILTERS: FilterType[] = ['All', 'Nuclieos', 'MindRind', 'Academic'];

// ---- Project card for projects page ----
const ProjectDetailCard = ({
  project,
  index,
}: {
  project: (typeof allProjects)[0];
  index: number;
}) => {
  const Icon = project.icon;
  const companyStyle = COMPANY_CONFIG[project.company] ?? {
    color: 'text-gray-400',
    bg: 'bg-gray-500/15',
    border: 'border-gray-500/30',
  };

  return (
    <ScrollReveal animation="fadeInUp" delay={index * 80}>
      <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-400/30 flex flex-col h-full">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-14 h-14 ${project.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          {/* Status badge */}
          <div className="flex flex-col items-end gap-2">
            {project.status === 'ongoing' ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Ongoing
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 text-gray-400 rounded-full text-xs font-semibold border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors leading-tight">
          {project.title}
        </h3>

        {/* Company + Date */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${companyStyle.bg} ${companyStyle.color} ${companyStyle.border}`}
          >
            <Building className="w-3 h-3" />
            {project.company}
          </span>
          <span className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            {project.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-5 flex-grow">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

// ---- Main page component ----
export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Academic') return p.company.includes('NCBA&E');
    return p.company === activeFilter;
  });

  const gradientText: React.CSSProperties = {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0f172a' }}>
      <BackToTopButton />

      {/* ── Navigation ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #334155',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold"
            style={gradientText}
          >
            MJ
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: 'Home', href: '/#home' },
              { label: 'About', href: '/#about' },
              { label: 'Education', href: '/#education' },
              { label: 'Experience', href: '/#experience' },
              { label: 'Skills', href: '/#skills' },
              { label: 'Contact', href: '/#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="capitalize font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <span className="font-medium" style={{ color: '#3b82f6' }}>
              Projects
            </span>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              {[
                { label: 'Home', href: '/#home' },
                { label: 'About', href: '/#about' },
                { label: 'Education', href: '/#education' },
                { label: 'Experience', href: '/#experience' },
                { label: 'Skills', href: '/#skills' },
                { label: 'Contact', href: '/#contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block capitalize font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <span className="block font-medium" style={{ color: '#3b82f6' }}>
                Projects
              </span>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6" style={gradientText}>
            All Projects
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            A complete timeline of my work
          </p>
          <p className="text-gray-500 text-sm">
            {allProjects.length} projects across AI, Full Stack &amp; Data Engineering
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { value: '9', label: 'Total Projects' },
              { value: '7', label: 'At Nuclieos' },
              { value: '1', label: 'Final Year Project' },
              { value: '1', label: 'At MindRind' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter chips ── */}
      <section className="pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-blue-400/30 hover:text-white'
                }`}
              >
                {filter}
                {filter !== 'All' && (
                  <span className="ml-2 text-xs opacity-70">
                    ({
                      filter === 'Academic'
                        ? allProjects.filter((p) => p.company.includes('NCBA&E')).length
                        : allProjects.filter((p) => p.company === filter).length
                    })
                  </span>
                )}
                {filter === 'All' && (
                  <span className="ml-2 text-xs opacity-70">({allProjects.length})</span>
                )}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-center text-gray-500 text-sm mt-4">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project, index) => (
              <ProjectDetailCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="py-10 border-t"
        style={{ backgroundColor: '#1e293b', borderTop: '1px solid #334155' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2026 Muhammad Junaid Sarfraz. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/mjunaidsays"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/m-junaid2282001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:mjunaid2282001@gmail.com"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
