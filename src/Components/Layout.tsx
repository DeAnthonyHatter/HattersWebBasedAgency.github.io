import { useState, useEffect, Fragment } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Transition } from '@headlessui/react';

// Type definitions
interface TechStackItem {
  name: string;
  color: string;
}

interface ServiceItem {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

interface SkillItem {
  name: string;
  level: number;
  color: string;
}

interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  videoUrl: string;
  sourceCode: string;
  gradient: string;
}

interface PortfolioItem {
  title: string;
  desc: string;
  tags: string[];
  icon: string;
  gradient: string;
  demo?: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface ContactItem {
  title: string;
  value: string;
  icon: string;
  gradient: string;
}

interface SocialItem {
  icon: string;
  label: string;
  url: string;
}

interface NavItem {
  id: string;
  label: string;
}

interface StatItem {
  number: string;
  label: string;
  delay: string;
}

// Data constants
const HERO_TECH_STACK: TechStackItem[] = [
  { name: "HTML", color: "hover:border-blue-400/50" },
  { name: "CSS", color: "hover:border-blue-600/50" },
  { name: "SCSS", color: "hover:border-green-500/50" },
  { name: "Tailwind CSS", color: "hover:border-cyan-400/50" },
  { name: "Bootstrap 5.3.8", color: "hover:border-blue-700/50" },
  { name: "Javascript", color: "hover:border-blue-700/50" },
  { name: "ReactJS", color: "hover:border-blue-700/50" }
];

const SERVICES: ServiceItem[] = [
  { title: "HTML Development", desc: "Semantic, accessible HTML5 markup that provides the perfect foundation for modern web applications.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "from-orange-600 to-orange-500" },
  { title: "CSS & SCSS", desc: "Advanced styling with SCSS preprocessor and modern CSS techniques for responsive, maintainable designs.", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0a4 4 0 004-4v-4a2 2 0 012-2h4a2 2 0 012 2v4a4 4 0 01-4 4h-8z", color: "from-slate-700 to-slate-600" },
  { title: "JavaScript Development", desc: "Interactive functionality and dynamic user experiences with modern JavaScript ES6+ and DOM manipulation.", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "from-amber-600 to-amber-500" },
  { title: "ReactJS Applications", desc: "Component-based React applications with hooks, state management, and modern development practices.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", color: "from-cyan-700 to-cyan-600" },
  { title: "Bootstrap 5", desc: "Rapid development with Bootstrap 5 framework for responsive layouts, components, and utility classes.", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z", color: "from-purple-700 to-purple-600" },
  { title: "Responsive Design", desc: "Mobile-first responsive designs that work flawlessly across all devices using modern CSS techniques.", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", color: "from-emerald-700 to-emerald-600" }
];

const SKILLS: SkillItem[] = [
  { name: "HTML5", level: 95, color: "from-orange-600 to-orange-500" },
  { name: "CSS & SCSS", level: 90, color: "from-slate-700 to-slate-600" },
  { name: "JavaScript", level: 88, color: "from-amber-600 to-amber-500" },
  { name: "ReactJS", level: 92, color: "from-cyan-700 to-cyan-600" },
  { name: "Bootstrap 5", level: 85, color: "from-purple-700 to-purple-600" },
  { name: "Responsive Design", level: 93, color: "from-emerald-700 to-emerald-600" }
];

const PROJECTS: ProjectItem[] = [
  { id: 'project1', title: "Formless", desc: "A minimalist web design showcasing modern aesthetics and seamless user experience.", tech: ["ReactJS", "JavaScript", "SCSS", "Tailwind CSS"], videoUrl: "https://www.youtube.com/embed/3bSHBRWxkC8?si=qZg2Inzfw9GeZzav", sourceCode: "https://github.com/DeAnthonyHatter/Formless", gradient: "from-rose-700 to-rose-600" },
  { id: 'project2', title: "Logiq", desc: "Coding and AI Website", tech: ["ReactJS", "Tailwind CSS"], videoUrl: "https://www.youtube.com/embed/hNbkdVKDk8A?si=9T_2y_nX8LCxKoHi", sourceCode: "https://github.com/DeAnthonyHatter/Logiq", gradient: "from-slate-700 to-slate-600" },
  { id: 'project3', title: "Orin", desc: "Another Minimalism Design", tech: ["ReactJS", "JavaScript"], videoUrl: "https://www.youtube.com/embed/5MZqPqkpgvc?si=9_fCLGXkYNhnWXPT", sourceCode: "https://github.com/DeAnthonyHatter/Orin", gradient: "from-purple-700 to-purple-600" },
  { id: 'project4', title: "IronClad Construction", desc: "Modern Construction Based Website", tech: ["SCSS","ReactJS"], videoUrl: "https://www.youtube.com/embed/jl1pY2HcXnw?si=sJvDnYgYsPTwRmRJ", sourceCode: "https://github.com/DeAnthonyHatter/IronClad-Construction", gradient: "from-amber-700 to-amber-600" }
];

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { title: "Landing Pages", desc: "High-converting landing pages designed to capture leads and drive conversions with compelling CTAs and optimized user flows.", tags: ["HTML5", "SCSS", "Bootstrap 5"], icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", gradient: "from-rose-700 to-rose-600", demo: "https://example.com/landing" },
  { title: "E-commerce Websites", desc: "Full-featured online stores with shopping carts, payment integration, and responsive product catalogs for seamless shopping experiences.", tags: ["ReactJS", "Javascript", "CSS3"], icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", gradient: "from-slate-700 to-slate-600", demo: "https://example.com/ecommerce" },
  { title: "Responsive Image Conversion", desc: "Converting static designs into pixel-perfect responsive websites that adapt beautifully across all devices and screen sizes.", tags: ["HTML", "SCSS", "CSS Grid"], icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", gradient: "from-purple-700 to-purple-600", demo: "https://example.com/responsive" },
  { title: "Web Applications", desc: "Interactive web applications with dynamic functionality, user authentication, and real-time features built with modern frameworks.", tags: ["ReactJS", "JavaScript ES6+", "Bootstrap 5"], icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", gradient: "from-amber-700 to-amber-600", demo: "https://example.com/app" },
  { title: "Static Websites", desc: "Fast-loading static websites perfect for portfolios, business sites, and informational pages with clean, maintainable code.", tags: ["HTML5", "CSS3", "JavaScript"], icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", gradient: "from-emerald-700 to-emerald-600", demo: "https://example.com/static" },
  { title: "Corporate Websites", desc: "Professional business websites with content management systems, contact forms, and corporate branding integration.", tags: ["HTML5", "Bootstrap 5", "JavaScript"], icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", gradient: "from-cyan-700 to-cyan-600", demo: "https://example.com/corporate" },
  { title: "Creative Portfolios", desc: "Stunning portfolio websites for artists, designers, and creative professionals with interactive galleries and smooth animations.", tags: ["ReactJS", "SCSS", "CSS3"], icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01", gradient: "from-orange-700 to-orange-600", demo: "https://example.com/portfolio" },
  { title: "Dashboard Applications", desc: "Data visualization dashboards and admin panels with charts, tables, and real-time data management interfaces.", tags: ["ReactJS", "Javascript", "Bootstrap 5"], icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", gradient: "from-indigo-700 to-indigo-600", demo: "https://example.com/dashboard" }
];

const TESTIMONIALS: TestimonialItem[] = [
  { name: "Sarah Johnson", role: "CEO, TechStart", content: "Outstanding work! The team delivered a beautiful, responsive website that exceeded our expectations. Highly professional and creative.", rating: 5 },
  { name: "Michael Chen", role: "Founder, DesignCo", content: "Incredible attention to detail and modern design sensibilities. They transformed our vision into a stunning digital reality.", rating: 5 },
  { name: "Emily Rodriguez", role: "Marketing Director", content: "Fast, reliable, and creative. The perfect partner for our web development needs. Would absolutely recommend!", rating: 5 }
];

const CONTACTS: ContactItem[] = [
  { title: "Email Us", value: "hatterwballc@gmail.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", gradient: "from-slate-700 to-slate-600" },
  { title: "Call Us", value: "+1 (231) 750-6125", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", gradient: "from-emerald-700 to-emerald-600" },
  { title: "Business Hours", value: "6:00 AM - 10:00 PM", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", gradient: "from-purple-700 to-purple-600" },
  { title: "Response Time", value: "Within 24 Hours", icon: "M13 10V3L4 14h7v7l9-11h-7z", gradient: "from-amber-700 to-amber-600" }
];

const SOCIALS: SocialItem[] = [
  { icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", label: "GitHub", url: "https://github.com/DeAnthonyHatter" },
  { icon: "M13.5 0h2.97c.216 1.0725.81 2.4255 1.8525 3.768C19.3425 5.0835 20.6955 6 22.5 6v3c-2.6295 0-4.605-1.221-6-2.7435V16.5a7.5 7.5 0 1 1-7.5-7.5v3a4.5 4.5 0 1 0 4.5 4.5z", label: "TikTok", url: "https://www.tiktok.com/@deanthony.hatter" },
  { icon: "M18.9 1.125h3.681l-8.04 9.213L24 22.875h-7.4055l-5.8005-7.605-6.6375 7.605H.474l8.5995-9.855L0 1.125h7.5945l5.2425 6.9495L18.9015 1.125Zm-1.29 19.542h2.04L6.4845 3.2175H4.2975z", label: "X", url: "https://x.com/DeanthonyH42456" },
  { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.196.011-3.577.07-4.849.148-3.215 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", label: "Instagram", url: "https://www.instagram.com/hatterwebbasesagencyllc/" }
];

const NAV_ITEMS: NavItem[] = [{ id: "home", label: "Home" }, { id: "services", label: "Services" }, { id: "projects", label: "Portfolio" }, { id: "contact", label: "Contact" }];

const MOBILE_ITEMS: string[] = ["home", "services", "projects", "contact"];

const STATS: StatItem[] = [
  { number: "50+", label: "Projects Delivered", delay: "0ms" },
  { number: "98%", label: "Client Satisfaction", delay: "100ms" },
  { number: "5+", label: "Years Experience", delay: "200ms" }
];

// Sub-components

// Sub-components
interface NavigationProps {
  isScrolled: boolean;
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  scrollToSection: (id: string) => void;
}

function Navigation({ isScrolled, activeSection, mobileMenuOpen, setMobileMenuOpen, scrollToSection }: NavigationProps) {
  const navClass = `fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${isScrolled ? "bg-white/80 backdrop-blur-2xl shadow-lg border-b border-gray-100" : "bg-transparent"}`;

  return (
    <nav className={navClass}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0">
            <h1 className="relative text-2xl font-black md:text-3xl">
              <span className="text-transparent bg-linear-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text">Hatter's</span>
              <span className="block text-sm font-semibold tracking-widest text-gray-600 uppercase md:inline md:ml-2">Web Based Agency</span>
            </h1>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className={`relative px-4 py-2 font-semibold transition-all duration-300 rounded-lg group ${activeSection === item.id ? "text-slate-700" : "text-gray-700 hover:text-slate-700"}`}>
                  {item.label}
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-slate-700 to-slate-600 transition-all duration-300 ${activeSection === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}></span>
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="relative z-50 inline-flex items-center justify-center w-10 h-10 text-gray-700 transition-all rounded-lg md:hidden hover:bg-gray-100 focus:outline-none" title="Toggle Menu">
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
              <span className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
            </div>
          </button>
        </div>
      </div>
      <Transition show={mobileMenuOpen} as={Fragment} enter="transition ease-out duration-300" enterFrom="opacity-0 max-h-0" enterTo="opacity-100 max-h-screen" leave="transition ease-in duration-200" leaveFrom="opacity-100 max-h-screen" leaveTo="opacity-0 max-h-0">
        <div className="absolute left-0 right-0 overflow-hidden border-b border-gray-200 shadow-xl md:hidden top-full bg-white/95 backdrop-blur-2xl">
          <div className="container px-4 py-6 mx-auto space-y-2 sm:px-6">
            {MOBILE_ITEMS.map((item, idx) => (
              <button key={item} type="button" onClick={() => scrollToSection(item)} className="block w-full px-4 py-3 text-lg font-semibold text-left text-gray-700 transition-all duration-300 rounded-lg hover:text-slate-700 hover:bg-slate-50 hover:translate-x-2" style={{ transitionDelay: `${idx * 50}ms` }}>
                {item === "projects" ? "Portfolio" : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Transition>
    </nav>
  );
}

interface HeroSectionProps {
  animClass: (id: string) => string;
  visibleSections: Set<string>;
  mousePosition: { x: number; y: number };
}

function HeroSection({ animClass, mousePosition }: HeroSectionProps) {
  const cursorStyle = { left: `${mousePosition.x}px`, top: `${mousePosition.y}px`, transform: 'translate(-50%, -50%)' };

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden bg-white">
      {/* Premium Gradient Mesh Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-gray-50"></div>
        
        {/* Animated gradient orbs with glass effect */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30">
          <div 
            className="absolute inset-0 rounded-full bg-linear-to-br from-slate-300/40 via-slate-200/30 to-transparent blur-3xl"
            style={{ animation: 'float-gentle 28s ease-in-out infinite' }}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] opacity-25">
          <div 
            className="absolute inset-0 rounded-full bg-linear-to-tr from-gray-300/30 via-slate-200/25 to-transparent blur-3xl"
            style={{ animation: 'float-gentle 32s ease-in-out infinite reverse', animationDelay: '4s' }}
          />
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-20">
          <div 
            className="absolute inset-0 rounded-full bg-linear-to-br from-slate-200/20 via-transparent to-slate-300/20 blur-3xl"
            style={{ animation: 'float-gentle 36s ease-in-out infinite', animationDelay: '8s' }}
          />
        </div>

        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}></div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-slate-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${15 + Math.random() * 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto ${animClass('home')}`}>
          
          {/* Status Badge */}
          <div className="flex justify-center mb-10">
            <div className="relative inline-flex items-center gap-3 px-6 py-3 transition-all duration-500 border rounded-full shadow-lg group bg-white/60 backdrop-blur-xl border-slate-200/60 shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:scale-105">
              <div className="relative flex items-center justify-center w-2 h-2">
                <div className="absolute inset-0 rounded-full opacity-75 bg-emerald-500 animate-ping"></div>
                <div className="relative w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></div>
              </div>
              <span className="text-sm font-bold tracking-wide text-slate-700">Freelance Web Developer</span>
              <svg className="w-4 h-4 transition-transform duration-300 text-slate-400 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* Hero Heading */}
          <div className="mb-12 space-y-6 text-center">
            <h1 className="text-6xl font-black leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="inline-block mb-4 text-gray-900 transition-all duration-700 hover:scale-105">
                I Build 
              </span>
              <span className="relative block">
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-900 via-slate-700 to-slate-900 animate-gradient-x">
                    Modern & Scalable Websites
                  </span>
                  {/* Premium underline effect */}
                  <span className="absolute -bottom-4 left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-slate-600/60 to-transparent blur-sm"></span>
                  <span className="absolute -bottom-4 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-slate-700 to-transparent"></span>
                </span>
              </span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl font-light leading-relaxed text-gray-600 md:text-2xl lg:text-3xl">
              I Will Transform Your Website from Concept to Reality with Cutting-Edge Designs and Seamless Functionality.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-5 mb-20 sm:flex-row">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="relative inline-flex items-center justify-center px-12 py-5 overflow-hidden text-lg font-bold text-white transition-all duration-500 shadow-2xl group rounded-2xl shadow-slate-500/30 hover:shadow-slate-500/50 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-300"
            >
              <span className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-700 to-slate-900"></span>
              <span className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-r from-slate-700 via-slate-900 to-slate-700 group-hover:opacity-100"></span>
              <span className="absolute inset-0 w-full h-full">
                <span className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-white/10 group-hover:opacity-100"></span>
              </span>
              <span className="relative flex items-center gap-3">
                Start Your Project
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold transition-all duration-500 border-2 shadow-lg group text-slate-700 bg-white/80 backdrop-blur-sm border-slate-300 rounded-2xl hover:border-slate-600 hover:bg-white hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-500 opacity-0 bg-linear-to-r from-slate-50 to-gray-50 rounded-2xl group-hover:opacity-100"></span>
              <span className="relative flex items-center gap-3">
                View Our Work
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-24">
            {HERO_TECH_STACK.map((tech, idx) => (
              <div
                key={tech.name}
                className="relative group"
                style={{ 
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${idx * 100}ms`,
                  opacity: 0
                }}
              >
                <div className="absolute inset-0 transition-opacity duration-500 rounded-full opacity-0 bg-linear-to-r from-slate-600/20 to-slate-700/20 blur-xl group-hover:opacity-100"></div>
                <div className="relative px-6 py-3 text-sm font-bold text-gray-700 transition-all duration-500 border rounded-full shadow-md bg-white/90 backdrop-blur-sm border-gray-200/80 group-hover:shadow-xl group-hover:scale-110 group-hover:border-slate-400 group-hover:text-slate-700 group-hover:-translate-y-1">
                  <span className="relative z-10">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto sm:grid-cols-3">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="relative p-8 overflow-hidden transition-all duration-500 border shadow-lg group bg-white/70 backdrop-blur-xl border-slate-200/60 rounded-3xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 hover:scale-105 hover:-translate-y-2"
                style={{ transitionDelay: stat.delay }}
              >
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-br from-slate-500/5 via-transparent to-slate-600/5 group-hover:opacity-100"></div>
                <div className="relative text-center">
                  <div className="mb-3 text-5xl font-black text-transparent md:text-6xl bg-clip-text bg-linear-to-r from-slate-800 via-slate-600 to-slate-800 tabular-nums">
                    {stat.number}
                  </div>
                  <div className="text-sm font-semibold tracking-wide text-slate-600">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-linear-to-br from-slate-400/10 to-transparent blur-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed z-50 hidden w-6 h-6 transition-all duration-300 ease-out border-2 rounded-full pointer-events-none border-slate-600 md:block mix-blend-difference" style={cursorStyle}></div>
    </section>
  );
}

interface ServicesSectionProps {
  animClass: (id: string) => string;
  visibleSections: Set<string>;
}

function ServicesSection({ animClass, visibleSections }: ServicesSectionProps) {
  return (
    <section id="services" className="py-32 bg-linear-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className={animClass('services')}>
          <div className="mb-6 text-center">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider uppercase rounded-full text-slate-700 bg-slate-100/50">What We Do</span>
            <h2 className="mb-4 text-4xl font-black text-gray-900 md:text-6xl">Our Services</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">Comprehensive web development solutions tailored to your needs</p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <div key={index} className="relative p-8 overflow-hidden transition-all duration-500 bg-white border border-gray-200 shadow-sm group rounded-3xl hover:shadow-2xl hover:-translate-y-2" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-linear-to-br ${service.color}`}></div>
                <div className={`relative inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-linear-to-br ${service.color} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} /></svg>
                </div>
                <h3 className="relative mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-slate-700">{service.title}</h3>
                <p className="relative leading-relaxed text-gray-600">{service.desc}</p>
                <div className="absolute top-0 right-0 w-32 h-32 transition-transform duration-500 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100">
                  <div className={`w-full h-full rounded-full bg-linear-to-br ${service.color} blur-3xl opacity-20`}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto mt-32">
            <h3 className="mb-16 text-3xl font-black text-center text-gray-900 md:text-4xl">Technical Expertise</h3>
            <div className="space-y-8">
              {SKILLS.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">{skill.name}</span>
                    <span className={`font-bold text-transparent bg-linear-to-r ${skill.color} bg-clip-text`}>{skill.level}%</span>
                  </div>
                  <div className="relative h-4 overflow-hidden bg-gray-200 rounded-full">
                    <div className={`h-full transition-all duration-1000 ease-out rounded-full bg-linear-to-r ${skill.color} relative overflow-hidden`} style={{ width: visibleSections.has('services') ? `${skill.level}%` : '0%', transitionDelay: `${index * 150}ms` }}>
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectsSectionProps {
  animClass: (id: string) => string;
  projects: ProjectItem[];
  setActiveVideo: Dispatch<SetStateAction<string | null>>;
}

function ProjectsSection({ animClass, projects, setActiveVideo }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-32 bg-gray-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className={animClass('projects')}>
          <div className="mb-6 text-center">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider uppercase rounded-full text-slate-700 bg-slate-100/50">Our Work</span>
            <h2 className="mb-4 text-4xl font-black text-gray-900 md:text-6xl">Latest Projects</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">Explore a selection of our recent work, showcasing our expertise and creative solutions.</p>
          </div>
          <div className="grid grid-cols-1 gap-12 mt-16 lg:grid-cols-2">
            {projects.map((project, index) => (
              <div key={project.id} className="group overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] bg-white border border-gray-200" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="relative pt-[56.25%] overflow-hidden">
                  <iframe
                    src={project.videoUrl}
                    title={project.title}
                    style={{ border: '0' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-105"
                  ></iframe>
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/30 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setActiveVideo(project.videoUrl)}
                      className="p-4 transition-all duration-300 transform scale-0 rounded-full shadow-lg bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white hover:text-slate-900 group-hover:scale-100"
                      aria-label="Play video"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="mb-3 text-3xl font-bold text-gray-900">{project.title}</h3>
                  <p className="mb-6 leading-relaxed text-gray-600">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">{tech}</span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden text-lg font-bold text-white transition-all duration-300 shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-1 group">
                      <span className="absolute inset-0 bg-linear-to-r from-slate-800 to-slate-600"></span>
                      <span className="relative z-10 flex items-center gap-2">
                        Source Code
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface PortfolioSectionProps {
  animClass: (id: string) => string;
}

function PortfolioSection({ animClass }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className={animClass('portfolio')}>
          <div className="mb-6 text-center">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider uppercase rounded-full text-slate-700 bg-slate-100/50">Specialties</span>
            <h2 className="mb-4 text-4xl font-black text-gray-900 md:text-6xl">What We Build</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">From concept to deployment, we deliver tailored web solutions that drive results.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PORTFOLIO_ITEMS.map((item, index) => (
              <div key={index} className="relative p-8 overflow-hidden transition-all duration-500 bg-white border border-gray-200 shadow-sm group rounded-3xl hover:shadow-2xl hover:-translate-y-2" style={{ transitionDelay: `${index * 50}ms` }}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-linear-to-br ${item.gradient}`}></div>
                <div className={`relative inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-linear-to-br ${item.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                </div>
                <h3 className="relative mb-4 text-2xl font-bold text-gray-900 transition-colors group-hover:text-slate-700">{item.title}</h3>
                <p className="relative leading-relaxed text-gray-600">{item.desc}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">{tag}</span>
                  ))}
                </div>
                {item.demo && (
                  <a href={item.demo} target="_blank" rel="noopener noreferrer" className="relative mt-6 inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group">
                    <span className={`absolute inset-0 bg-linear-to-r ${item.gradient}`}></span>
                    <span className="relative z-10 flex items-center gap-2">
                      View Demo
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialsSectionProps {
  animClass: (id: string) => string;
}

function TestimonialsSection({ animClass }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-32 bg-gray-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className={animClass('testimonials')}>
          <div className="mb-6 text-center">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider uppercase rounded-full text-slate-700 bg-slate-100/50">Testimonials</span>
            <h2 className="mb-4 text-4xl font-black text-gray-900 md:text-6xl">What Clients Say</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">Hear directly from those who have experienced our dedication to excellence.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="relative p-8 transition-all duration-500 bg-white border border-gray-200 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="mb-6 text-lg italic text-gray-700">"{testimonial.content}"</p>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
                <div className="absolute top-0 right-0 w-32 h-32 transform rotate-45 opacity-10 blur-3xl bg-linear-to-br from-amber-400 to-yellow-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactSectionProps {
  animClass: (id: string) => string;
  contacts: ContactItem[];
  socials: SocialItem[];
}

function ContactSection({ animClass, contacts, socials }: ContactSectionProps) {
  return (
    <section id="contact" className="py-32 bg-linear-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className={animClass('contact')}>
          <div className="mb-6 text-center">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-bold tracking-wider uppercase rounded-full text-slate-700 bg-slate-100/50">Get in Touch</span>
            <h2 className="mb-4 text-4xl font-black text-gray-900 md:text-6xl">Contact Us</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">Have a project in mind or a question? Reach out to us!</p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {contacts.map((contact, index) => (
                <div key={index} className="relative p-8 overflow-hidden transition-all duration-500 bg-white border border-gray-200 shadow-sm group rounded-3xl hover:shadow-xl hover:-translate-y-2" style={{ transitionDelay: `${index * 50}ms` }}>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-linear-to-br ${contact.gradient}`}></div>
                  <div className={`relative inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-linear-to-br ${contact.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} /></svg>
                  </div>
                  <h3 className="relative mb-2 text-xl font-bold text-gray-900">{contact.title}</h3>
                  <p className="relative text-gray-600">{contact.value}</p>
                </div>
              ))}
            </div>
            <div className="p-8 transition-all duration-500 bg-white border border-gray-200 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-2" style={{ transitionDelay: '200ms' }}>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-4 py-3 mt-1 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:border-slate-500 focus:ring-slate-500 hover:border-slate-400" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-3 mt-1 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:border-slate-500 focus:ring-slate-500 hover:border-slate-400" placeholder="Your Email" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700">Message</label>
                  <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 mt-1 transition-all duration-300 border border-gray-300 rounded-lg shadow-sm focus:border-slate-500 focus:ring-slate-500 hover:border-slate-400" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="relative inline-flex items-center justify-center w-full px-8 py-4 overflow-hidden text-lg font-bold text-white transition-all duration-500 shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-1 group">
                  <span className="absolute inset-0 bg-linear-to-r from-slate-900 to-slate-700"></span>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
          <div className="flex justify-center mt-20 space-x-6">
            {socials.map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="relative flex items-center justify-center transition-all duration-300 bg-white border border-gray-200 rounded-full shadow-md group w-14 h-14 hover:bg-slate-50 hover:border-slate-300 hover:scale-110" aria-label={social.label}>
                <svg className="text-gray-600 transition-colors duration-300 w-7 h-7 group-hover:text-slate-700" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                <span className="absolute px-3 py-1 text-xs text-white transition-opacity duration-300 -translate-x-1/2 bg-gray-800 rounded-md opacity-0 pointer-events-none -bottom-10 left-1/2 group-hover:opacity-100">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface VideoModalProps {
  activeVideo: string | null;
  setActiveVideo: Dispatch<SetStateAction<string | null>>;
}

function VideoModal({ activeVideo, setActiveVideo }: VideoModalProps) {
  if (!activeVideo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80" onClick={() => setActiveVideo(null)}>
      <div className="relative w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
        <iframe
          src={`${activeVideo}?autoplay=1`}
          title="Project Video"
          style={{ border: '0' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-2xl"
        ></iframe>
        <button
          type="button"
          onClick={() => setActiveVideo(null)}
          className="absolute p-2 text-gray-700 transition-all duration-300 bg-white rounded-full shadow-lg -top-4 -right-4 hover:bg-gray-100"
          aria-label="Close video"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface FooterProps {
  isScrolled: boolean;
  scrollToSection: (id: string) => void;
}

function Footer({ isScrolled, scrollToSection }: FooterProps) {
  return (
    <>
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="relative text-2xl font-black md:text-3xl">
              <span className="text-transparent bg-linear-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text">Hatter's</span>
              <span className="block text-sm font-semibold tracking-widest text-gray-600 uppercase md:inline md:ml-2">Web Based Agency</span>
            </h1>
            <p className="mt-6 text-gray-500">&copy; {new Date().getFullYear()} Hatter's Web Based Agency. All rights reserved.</p>
            <div className="flex justify-center mt-6 space-x-4">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} type="button" onClick={() => scrollToSection(item.id)} className="text-sm font-semibold text-gray-600 transition-colors duration-300 hover:text-slate-700">
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <button type="button" onClick={() => scrollToSection("home")} className={`fixed bottom-8 right-8 p-4 bg-slate-700 text-white rounded-full shadow-lg transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} aria-label="Scroll to top">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
      const sections = ["home", "services", "projects", "portfolio", "testimonials", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setVisibleSections((prev) => new Set([...prev, entry.target.id]))), { threshold: 0.1 });
    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const animClass = (id: string) => `transition-all duration-1000 ${visibleSections.has(id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  const progressStyle = { width: `${scrollProgress}%` };

  return (
    <div className="min-h-screen font-sans antialiased bg-white">
      <style>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 8s ease infinite;
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 z-50 h-1">
        <div className="h-full transition-all duration-300 bg-linear-to-r from-slate-700 via-slate-600 to-slate-500" style={progressStyle}></div>
      </div>

      <Navigation 
        isScrolled={isScrolled}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      <HeroSection 
        animClass={animClass}
        visibleSections={visibleSections}
        mousePosition={mousePosition}
      />

      <ServicesSection 
        animClass={animClass}
        visibleSections={visibleSections}
      />

      <ProjectsSection 
        animClass={animClass}
        projects={PROJECTS}
        setActiveVideo={setActiveVideo}
      />

      <PortfolioSection 
        animClass={animClass}
      />

      <TestimonialsSection 
        animClass={animClass}
      />

      <ContactSection 
        animClass={animClass}
        contacts={CONTACTS}
        socials={SOCIALS}
      />

      <VideoModal 
        activeVideo={activeVideo}
        setActiveVideo={setActiveVideo}
      />

      <Footer 
        isScrolled={isScrolled}
        scrollToSection={scrollToSection}
      />
    </div>
  );
}