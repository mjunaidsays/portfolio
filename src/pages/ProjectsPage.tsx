import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Code, Bot, Users, Zap, MapPin, Phone, Award,
  Github, Linkedin, Mail, ArrowLeft, Heart, ArrowUp,
  Clock, Menu, X, Calendar, Building, Search,
} from 'lucide-react';
import { ScrollProgress } from '../components/ScrollProgress';
import { fadeInUp, scaleIn, staggerContainer, viewportOnce } from '../lib/motionVariants';

// ── Back to top ──
function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-electric-500 text-base-900 rounded-full flex items-center justify-center glow-electric shadow-2xl"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── Company badge config ──
const COMPANY_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  Nuclieos: { color: 'text-electric-400', bg: 'bg-electric-500/10', border: 'border-electric-500/25' },
  MindRind: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
  'NCBA&E (FYP)': { color: 'text-violet-400', bg: 'bg-violet-600/10', border: 'border-violet-600/25' },
};

// ── All projects data ──
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
      'Built an AI-powered medical chatbot with real-time speech-to-speech interaction using FastAPI and ReactJS. Designed 2 dedicated modules: an Exam Bot for medical Q&A evaluation and a Medical Assistant Bot powered by RAG and LLM workflows. Integrated ElevenLabs, Deepgram, and LiveKit for low-latency conversational voice interactions.',
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

function ProjectDetailCard({ project }: { project: (typeof allProjects)[0] }) {
  const Icon = project.icon;
  const companyStyle = COMPANY_CONFIG[project.company] ?? {
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/25',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-7 hover:border-electric-500/20 flex flex-col h-full hover:bg-white/8 transition-colors duration-300"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className={`w-14 h-14 ${project.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {project.status === 'ongoing' ? (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/15 text-green-400 rounded-full text-xs font-semibold border border-green-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Ongoing
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-white/8 text-gray-400 rounded-full text-xs font-semibold border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Completed
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-electric-500 transition-colors leading-tight">
        {project.title}
      </h3>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${companyStyle.bg} ${companyStyle.color} ${companyStyle.border}`}>
          <Building className="w-3 h-3" />
          {project.company}
        </span>
        <span className="flex items-center gap-1.5 text-gray-500 text-xs">
          <Calendar className="w-3 h-3" />
          {project.period}
        </span>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-2.5 py-1 bg-electric-500/10 text-electric-400 rounded-full text-xs font-medium border border-electric-500/20">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Academic') return p.company.includes('NCBA&E');
    return p.company === activeFilter;
  });

  const getCount = (f: FilterType) => {
    if (f === 'All') return allProjects.length;
    if (f === 'Academic') return allProjects.filter((p) => p.company.includes('NCBA&E')).length;
    return allProjects.filter((p) => p.company === f).length;
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#080C14' }}>
      <ScrollProgress />
      <BackToTopButton />

      {/* ── Navbar ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 border-b border-white/5"
        initial={{ backgroundColor: 'rgba(8, 12, 20, 0.75)' }}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/')}
            className="font-display font-bold text-2xl gradient-text-electric"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            MJ
          </motion.button>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Home', href: '/#home' },
              { label: 'About', href: '/#about' },
              { label: 'Education', href: '/#education' },
              { label: 'Experience', href: '/#experience' },
              { label: 'Skills', href: '/#skills' },
              { label: 'Contact', href: '/#contact' },
            ].map((link) => (
              <a key={link.label} href={link.href} className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors capitalize">
                {link.label}
              </a>
            ))}
            <span className="px-3 py-2 text-sm font-medium text-electric-500">Projects</span>
          </div>

          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(true)}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-72 z-50 border-l border-white/10"
              style={{ backgroundColor: '#0D1117' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="font-display font-bold text-xl gradient-text-electric">MJ</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-6">
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
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <span className="px-4 py-3 text-electric-500 font-medium">Projects</span>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-electric-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 hover:border-electric-500/20 transition-all duration-300 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            custom={0.1}
            className="font-display text-5xl lg:text-7xl font-bold gradient-text-electric mb-6"
          >
            All Projects
          </motion.h1>

          <motion.p variants={fadeInUp} custom={0.2} className="text-xl text-gray-300 mb-2">
            A complete timeline of my work
          </motion.p>
          <motion.p variants={fadeInUp} custom={0.25} className="text-gray-500 text-sm mb-10">
            {allProjects.length} projects across AI, Full Stack &amp; Data Engineering
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              { value: '9', label: 'Total Projects' },
              { value: '7', label: 'At Nuclieos' },
              { value: '1', label: 'Final Year Project' },
              { value: '1', label: 'At MindRind' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i * 0.08}
                className="bg-white/5 border border-white/10 rounded-2xl px-7 py-4 text-center hover:border-electric-500/20 hover:bg-white/8 transition-colors duration-300"
              >
                <div className="font-display text-2xl font-bold text-electric-500">{stat.value}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Filter chips ── */}
      <section className="pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {FILTERS.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 ${
                  activeFilter === filter
                    ? 'bg-electric-500 text-base-900 border-transparent glow-electric'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-electric-500/30 hover:text-white'
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {filter}
                <span className="ml-2 text-xs opacity-70">({getCount(filter)})</span>
              </motion.button>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectDetailCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 border-t border-white/8" style={{ backgroundColor: '#0D1117' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>© 2026 Muhammad Junaid Sarfraz. Made with</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.span>
            </div>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/mjunaidsays', Icon: Github },
                { href: 'https://www.linkedin.com/in/m-junaid2282001', Icon: Linkedin },
                { href: 'mailto:mjunaid2282001@gmail.com', Icon: Mail },
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-electric-500 hover:bg-electric-500/10 hover:border-electric-500/30 transition-all duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
