import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from './config';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Code,
  Bot,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Award,
  Zap,
  GraduationCap,
  ArrowUp,
  Heart,
  Clock,
  Calendar,
  Phone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectCard } from './components/ProjectCard';
import type { Project } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from './lib/motionVariants';
import { useScrollspy } from './hooks/useScrollspy';

const SECTION_IDS = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'];

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <h2 className="font-display text-5xl font-bold gradient-text-electric mb-4">{title}</h2>
      <p className="text-xl text-gray-400">{subtitle}</p>
      <div className="w-16 h-px bg-electric-500 mx-auto mt-4 opacity-60" />
    </motion.div>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
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

function App() {
  const navigate = useNavigate();
  const activeSection = useScrollspy(SECTION_IDS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const sectionId = hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.subject?.trim() || !formData.message?.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }
    setIsSubmitting(true);
    try {
      const { serviceId, templateId, publicKey } = emailjsConfig;
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'mjunaid2282001@gmail.com',
        },
        publicKey
      );
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    } else {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  const projects: Project[] = [
    {
      title: 'Cogit Saas',
      description:
        'Developing AI agents for automated business workflows using Python, FastAPI, Next.js, PostgreSQL, and OpenRouter. Engineered an Invoice Processor that transcribes calls, extracts entities, and automates credit note posting to Lexoffice. Enabled widget generation and email-processing automation.',
      technologies: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'OpenRouter', 'AI Agents'],
      icon: Bot,
      gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      link: '#',
    },
    {
      title: 'SEObot',
      description:
        'Designed an AI-driven SEO analysis platform with automated website audits, issue detection, and AI-generated SEO-friendly article generation. Delivered customizable article editing and optimization controls.',
      technologies: ['Next.js', 'Supabase', 'OpenRouter', 'PostHog', 'AI'],
      icon: Zap,
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
      link: '#',
    },
    {
      title: 'LocalSEO',
      description:
        'Built a Local SEO analytics platform to evaluate business visibility in local markets. Generated AI-powered optimization recommendations and implemented editable recommendation workflows to improve local search presence.',
      technologies: ['Next.js', 'Supabase', 'OpenRouter', 'PostHog', 'Local SEO'],
      icon: MapPin,
      gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      link: '#',
    },
    {
      title: 'Flexify',
      description:
        'Architected an AI-powered WhatsApp automation agent handling hotel, restaurant, and flight bookings alongside email automation. Leveraged FastAPI and LangGraph to orchestrate AI tools integrated with Booking.com, Stripe, Google, and Meta APIs.',
      technologies: ['FastAPI', 'LangGraph', 'Meta APIs', 'Stripe', 'Booking.com', 'Google APIs'],
      icon: Phone,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
      link: '#',
    },
    {
      title: 'AI Registrar',
      description:
        'Developed a RAG-based AI chatbot that organized and retrieved doctor-patient records from medical conversations. Structured patient datasets and strengthened end-to-end encrypted workflows for healthcare data privacy.',
      technologies: ['RAG', 'LLM', 'Python', 'PostgreSQL', 'Healthcare AI'],
      icon: Award,
      gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
      link: '#',
    },
    {
      title: 'Medical Exambot & Chatbot',
      description:
        'Built an AI medical chatbot with real-time speech-to-speech using FastAPI and ReactJS. Dual modules: Exam Bot for Q&A evaluation and Medical Assistant Bot powered by RAG and LLM. Integrated ElevenLabs, Deepgram, and LiveKit for low-latency voice interactions.',
      technologies: ['FastAPI', 'ReactJS', 'ElevenLabs', 'Deepgram', 'LiveKit', 'RAG'],
      icon: Brain,
      gradient: 'bg-gradient-to-br from-red-500 to-orange-600',
      link: '#',
    },
  ];

  const skillCategories = [
    {
      title: 'AI & Machine Learning',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'LangGraph', 'RAG', 'AI Agents', 'Generative AI'],
      icon: Brain,
    },
    {
      title: 'Backend Development',
      skills: ['FastAPI', 'Flask', 'Django', 'PostgreSQL', 'SQL', 'OpenAI APIs', 'AI Integrations', 'Fine Tuning'],
      icon: Code,
    },
    {
      title: 'Frontend Development',
      skills: ['ReactJS', 'Next.js', 'TypeScript', 'TailwindCSS', 'MERN Stack', 'JavaScript', 'HTML5', 'CSS3'],
      icon: Zap,
    },
    {
      title: 'Data & Tools',
      skills: ['Power BI', 'Tableau', 'Pandas', 'NumPy', 'Data Analysis', 'OOP', 'DSA', 'AI Project Management'],
      icon: Award,
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      university: 'NCBA&E University',
      duration: '2021 - 2025',
      cgpa: '3.34/4.00',
    },
  ];

  const experience = [
    { position: 'AI Engineer', company: 'Nuclieos', duration: 'April 2025 – Present', isCurrent: true },
    { position: 'AI/ML Intern', company: 'MindRind', duration: 'Jan 2025 – April 2025', isCurrent: false },
  ];

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#080C14' }}>
      {!isTouchDevice && <CustomCursor />}
      <ScrollProgress />
      <BackToTopButton />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Hero */}
      <HeroSection onNavigate={scrollToSection} />

      {/* About */}
      <section id="about" className="py-24" style={{ backgroundColor: '#0D1117' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="About Me" subtitle="Passionate about creating intelligent solutions" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a dedicated Full Stack AI Engineer with a passion for developing innovative solutions
                using cutting-edge technologies. My expertise spans across machine learning, natural language
                processing, and full-stack web development.
              </p>

              <motion.div
                className="grid grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                {[
                  { number: 'AI', label: 'Specialist' },
                  { number: '9+', label: 'Projects Built' },
                  { number: '1+', label: 'Years Experience' },
                  { number: '100%', label: 'Dedication' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    custom={index * 0.1}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 hover:border-electric-500/20 transition-colors duration-300"
                  >
                    <div className="text-3xl font-display font-bold text-electric-500 mb-2">{stat.number}</div>
                    <div className="text-gray-400 font-medium text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-electric-500/20 to-violet-600/20 blur-3xl scale-110" />
                <div
                  className="relative w-72 h-72 rounded-full p-[2px]"
                  style={{
                    background: 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)',
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-base-900">
                    <img
                      src="/image.jpg"
                      alt="Muhammad Junaid Sarfraz"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-24" style={{ backgroundColor: '#080C14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Education" subtitle="My academic journey" />

          <div className="max-w-2xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={index * 0.1}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-electric-500/20 transition-colors duration-300 border-l-2 border-l-electric-500/40"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-electric-500 font-medium">{edu.university}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-sm">{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-sm">
                      CGPA: <span className="text-electric-500 font-semibold">{edu.cgpa}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24" style={{ backgroundColor: '#0D1117' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Professional Experience" subtitle="My career journey in AI engineering" />
          <ExperienceTimeline experience={experience} />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24" style={{ backgroundColor: '#080C14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Featured Projects" subtitle="Latest projects · AI solutions built at scale" />

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={fadeInUp} custom={index * 0.08}>
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3 mt-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-gray-500 text-sm">Showing 6 of 9 projects</p>
            <motion.button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-electric-500 text-base-900 rounded-2xl font-display font-semibold glow-electric hover:bg-electric-400 transition-colors shadow-2xl"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Projects
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24" style={{ backgroundColor: '#0D1117' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Skills & Technologies" subtitle="Technologies I work with" />

          <div className="grid lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={index * 0.1}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-electric-500/20 transition-colors duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-electric-500/20 to-violet-600/20 border border-electric-500/20 rounded-xl flex items-center justify-center group-hover:border-electric-500/40 transition-colors duration-300">
                    <category.icon className="w-6 h-6 text-electric-500" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{category.title}</h3>
                </div>
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={scaleIn}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,217,255,0.1)' }}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-center cursor-default"
                    >
                      <span className="text-gray-300 font-medium text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24" style={{ backgroundColor: '#080C14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Let's Connect" subtitle="Ready to discuss your next project" />

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {[
                { icon: Mail, title: 'Email', value: 'mjunaid2282001@gmail.com' },
                { icon: Clock, title: 'Availability', value: 'Mon - Fri, 9AM - 6PM, UTC +05:00' },
                { icon: MapPin, title: 'Location', value: 'Pakistan' },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  variants={fadeInLeft}
                  custom={index * 0.1}
                  className="flex items-center gap-6"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-electric-500/20 to-violet-600/20 border border-electric-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <contact.icon className="w-6 h-6 text-electric-500" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-white mb-1">{contact.title}</h4>
                    <p className="text-gray-400">{contact.value}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeInLeft} custom={0.3} className="flex gap-4 pt-2">
                {[
                  { href: 'https://github.com/mjunaidsays', Icon: Github, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/m-junaid2282001', Icon: Linkedin, label: 'LinkedIn' },
                  { href: 'mailto:mjunaid2282001@gmail.com', Icon: Mail, label: 'Email' },
                ].map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-12 h-12 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-electric-500 hover:border-electric-500/30 hover:bg-electric-500/10 transition-all duration-200"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-electric-500/20 transition-colors duration-300"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: 'name', type: 'text', placeholder: 'Your Name' },
                  { name: 'email', type: 'email', placeholder: 'Your Email' },
                  { name: 'subject', type: 'text', placeholder: 'Subject' },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-electric-500/40 focus:bg-white/8 transition-all duration-300"
                  />
                ))}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Your Message"
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-electric-500/40 focus:bg-white/8 transition-all duration-300 resize-none"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-2xl font-display font-semibold transition-colors shadow-2xl ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : 'bg-electric-500 text-base-900 hover:bg-electric-400 glow-electric'
                  }`}
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-green-400 text-sm p-3 bg-green-400/10 rounded-xl border border-green-400/20"
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center text-red-400 text-sm p-3 bg-red-400/10 rounded-xl border border-red-400/20"
                    >
                      Please fill all fields and try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/8" style={{ backgroundColor: '#0D1117' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="font-display text-3xl font-bold gradient-text-electric mb-4">MJ</div>
                <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                  Full Stack AI Engineer passionate about creating intelligent solutions that solve real-world problems.
                </p>
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
                      className="w-10 h-10 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-electric-500 hover:bg-electric-500/10 hover:border-electric-500/30 transition-all duration-200"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-white mb-5">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { name: 'Home', section: 'home' },
                  { name: 'About', section: 'about' },
                  { name: 'Education', section: 'education' },
                  { name: 'Experience', section: 'experience' },
                  { name: 'Projects', section: 'projects' },
                  { name: 'Skills', section: 'skills' },
                  { name: 'Contact', section: 'contact' },
                ].map((link) => (
                  <button
                    key={link.section}
                    onClick={() => scrollToSection(link.section)}
                    className="block text-gray-400 hover:text-electric-500 transition-colors text-sm text-left"
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={() => navigate('/projects')}
                  className="block text-electric-500 hover:text-electric-400 transition-colors text-sm text-left font-medium"
                >
                  All Projects →
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-white mb-5">Contact Info</h3>
              <div className="space-y-3">
                {[
                  { Icon: Mail, text: 'mjunaid2282001@gmail.com' },
                  { Icon: Clock, text: 'Mon-Fri, 9AM-6PM, UTC +05:00' },
                  { Icon: MapPin, text: 'Pakistan' },
                  { Icon: GraduationCap, text: 'NCBA&E University' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-electric-500 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-white mb-5">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">Subscribe to get updates on my latest projects and insights.</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electric-500/40 transition-all duration-300 text-sm"
                />
                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-electric-500 text-base-900 rounded-xl font-display font-semibold hover:bg-electric-400 transition-colors text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
                <AnimatePresence mode="wait">
                  {newsletterStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-green-400 text-xs"
                    >
                      Successfully subscribed!
                    </motion.div>
                  )}
                  {newsletterStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs"
                    >
                      Please enter a valid email.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          <div className="border-t border-white/8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>© 2026 Muhammad Junaid Sarfraz. Made with</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Heart className="w-4 h-4 text-red-500" />
                </motion.span>
                <span>All rights reserved.</span>
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-500 hover:text-electric-500 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-electric-500 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-electric-500 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
