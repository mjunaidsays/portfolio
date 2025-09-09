import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { emailjsConfig } from './config';
import { 
  Brain, 
  Code, 
  Bot, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  Play,
  Star,
  Award,
  Users,
  Zap,
  CloudSun,
  Languages
} from 'lucide-react';

// Particle Component
const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, speed: number }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.speed}s`
          }}
        />
      ))}
    </div>
  );
};

// Cursor Trail Component
const CursorTrail = () => {
  const [trail, setTrail] = useState<Array<{ id: string, x: number, y: number, opacity: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newDot = {
        id: `dot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        x: e.clientX,
        y: e.clientY,
        opacity: 1
      };

      setTrail(prev => [newDot, ...prev.slice(0, 4)]); // Keep only 5 dots max

      // Remove the dot after 100ms
      setTimeout(() => {
        setTrail(prev => prev.filter(dot => dot.id !== newDot.id));
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full transition-all duration-100 ease-out"
          style={{
            left: dot.x - 2,
            top: dot.y - 2,
            opacity: dot.opacity * 0.8,
            transform: `scale(${dot.opacity})`,
          }}
        />
      ))}
    </div>
  );
};

// Floating Card Component
const FloatingCard = ({ icon: Icon, title, delay = 0, position, animation = "float" }: { icon: any, title: string, delay?: number, position: string, animation?: string }) => (
  <div
    className={`absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3 text-white font-semibold shadow-2xl animate-${animation} ${position}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <Icon className="w-6 h-6 text-blue-400" />
    <span>{title}</span>
  </div>
);

// Project Card Component
const ProjectCard = ({
  title,
  description,
  technologies,
  icon: Icon,
  gradient,
  link
}: {
  title: string;
  description: string;
  technologies: string[];
  icon: any;
  gradient: string;
  link?: string;
}) => (
  <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400/30">
    <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
      {title}
    </h3>
    <p className="text-gray-300 leading-relaxed mb-6 text-sm">
      {description}
    </p>
    <div className="flex flex-wrap gap-2 mb-6">
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
        >
          {tech}
        </span>
      ))}
    </div>
    {link && (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors text-sm"
      >
        View Project <ExternalLink className="w-4 h-4" />
      </a>
    )}
  </div>
);

// Skill Category Component
const SkillCategory = ({ title, skills, icon: Icon }: { title: string, skills: string[], icon: any }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 hover:border-blue-400/30 hover:shadow-xl">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 cursor-pointer group hover:scale-105"
        >
          <span className="text-gray-300 group-hover:text-white font-medium text-sm">{skill}</span>
        </div>
      ))}
    </div>
  </div>
);

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form - check for empty strings and whitespace
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.subject?.trim() || !formData.message?.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // EmailJS configuration from config file
      const { serviceId, templateId, publicKey } = emailjsConfig;
      
      // Template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'mjunaid2282001@gmail.com'
      };
      
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setSubmitStatus('idle');
    }, 5000);
  };

  const projects = [
    {
      title: "AI Chatbot for Code Development",
      description: "Built an AI code generator using Next.js, React, and TailwindCSS with modern UI and dark mode. Integrated Google Generative AI for prompt-based code generation with live preview using Sandpack and secure Google OAuth login.",
      technologies: ["Next.js", "React", "TailwindCSS", "Google AI", "Sandpack", "OAuth"],
      icon: Bot,
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      link: "#"
    },
    {
      title: "Desktop Assistant in Python",
      description: "Built an AI desktop assistant using Python and Tkinter with voice command support. Integrated Speech Recognition, Text-to-Speech, and real-world APIs for automation including weather updates, web browsing, and system operations.",
      technologies: ["Python", "Tkinter", "Speech Recognition", "TTS", "APIs"],
      icon: Brain,
      gradient: "bg-gradient-to-br from-green-500 to-teal-600",
      link: "#"
    },
    {
      title: "AI-based WebRTC App",
      description: "Developed a WebRTC-based video conferencing app using ReactJS and FastAPI. Integrated Jitsi for video/audio calling, screen sharing, and real-time messaging with AI-powered meeting transcription using Deepgram API and meeting summaries with OpenAI API.",
      technologies: ["ReactJS", "FastAPI", "WebRTC", "Jitsi", "Deepgram", "OpenAI"],
      icon: Users,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
      link: "#"
    },
    {
      title: "Medical Chatbot with Speech-to-Speech",
      description: "Advanced medical AI system with dual modules: Exam Bot for medical evaluation and Patient Bot for healthcare queries. Features real-time speech-to-speech interaction using RAG and LLM technologies.",
      technologies: ["Python", "NLP", "RAG", "Speech AI", "LLM"],
      icon: Brain,
      gradient: "bg-gradient-to-br from-red-500 to-orange-600",
      link: "#"
    },
    {
      title: "Weather Detection Application",
      description: "Intelligent weather prediction and analysis system with real-time data processing and accurate forecasting capabilities. Built with machine learning algorithms for enhanced accuracy.",
      technologies: ["React", "APIs", "ML", "Data Analysis", "Python"],
      icon: CloudSun,
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-600",
      link: "#"
    },
    {
      title: "RAG-based Chatbots",
      description: "Multiple intelligent chatbot systems utilizing Retrieval-Augmented Generation for enhanced context understanding and response accuracy. Integrated with vector databases for optimal performance.",
      technologies: ["RAG", "LangChain", "Vector DB", "OpenAI", "Python"],
      icon: Bot,
      gradient: "bg-gradient-to-br from-indigo-500 to-purple-600",
      link: "#"
    }
  ];

  const skillCategories = [
    {
      title: "AI & Machine Learning",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "OpenAI", "LLMs"],
      icon: Brain
    },
    {
      title: "Backend Development",
      skills: ["Python", "FastAPI", "Django", "Flask", "PostgreSQL", "Pinecone", "Qdrant", "SQL"],
      icon: Code
    },
    {
      title: "Frontend Development",
      skills: ["ReactJS", "Next.js", "TypeScript", "TailwindCSS", "MERN Stack", "JavaScript", "HTML5", "CSS3"],
      icon: Zap
    },
    {
      title: "Data & Analytics",
      skills: ["Power BI", "Tableau", "Jupyter Notebooks", "Data Analysis", "DSA", "OOP", "AI Project Management"],
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white" style={{ backgroundColor: '#0f172a' }}>
      <ParticleField />
      <CursorTrail />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #334155' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              MJ
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium transition-colors ${activeSection === section ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                    }`}
                  style={{ color: activeSection === section ? '#3b82f6' : '#cbd5e1' }}
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left capitalize font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-xl text-gray-300 font-medium">Hi, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Muhammad Junaid Sarfraz
              </h1>
              <div className="text-2xl lg:text-3xl font-semibold" style={{ color: '#10b981' }}>
                Full Stack AI Engineer
              </div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
              Passionate 24-year-old engineer specializing in AI/ML solutions, full-stack development,
              and cutting-edge technologies. Building intelligent applications that solve real-world problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-white/20 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <FloatingCard icon={Brain} title="AI/ML" delay={0} position="top-16 left-12" animation="float" />
            <FloatingCard icon={Code} title="Full Stack" delay={1} position="top-20 right-16" animation="float2" />
            <FloatingCard icon={Bot} title="LLMs" delay={2} position="bottom-20 left-20" animation="float3" />
            <FloatingCard icon={Languages} title="Python" delay={3} position="top-45 left-1/2 transform -translate-x-1/2" animation="float2" />
            <FloatingCard icon={Zap} title="Databases" delay={4} position="bottom-16 right-12" animation="float2" />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              About Me
            </h2>
            <p className="text-xl text-gray-300">Passionate about creating intelligent solutions</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a dedicated Full Stack AI Engineer with a passion for developing innovative solutions
                using cutting-edge technologies. My expertise spans across machine learning, natural language
                processing, and full-stack web development.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "AI", label: "Specialist" },
                  { number: "10+", label: "Projects" },
                  { number: "6+", label: "Months Experience" },
                  { number: "100%", label: "Dedication" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                    <div className="text-gray-300 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <img
                    src="./src/image.jpg"
                    alt="Muhammad Junaid Sarfraz"
                    className="w-64 h-64 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300">Innovative AI solutions and applications</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-300">Technologies I work with</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCategory key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300">Ready to discuss your next project</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: Mail, title: "Email", value: "mjunaid2282001@gmail.com" },
                { icon: Phone, title: "Phone", value: "+92 321 6602501" },
                { icon: MapPin, title: "Location", value: "Pakistan" }
              ].map((contact, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-1">{contact.title}</h4>
                    <p className="text-gray-300">{contact.value}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-4 pt-4">
                <a href="https://github.com/mjunaidsays" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/m-junaid2282001" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mjunaid2282001@gmail.com" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Your Message"
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-2xl ${
                    isSubmitting 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-blue-500/25'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="text-center text-green-400 text-sm p-3 bg-green-400/10 rounded-lg border border-green-400/20">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="text-center text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                    ❌ Please fill all fields and try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t" style={{ backgroundColor: '#1e293b', borderTop: '1px solid #334155' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Muhammad Junaid Sarfraz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
