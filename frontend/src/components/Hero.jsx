import React from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const Hero = ({ data }) => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {data.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-300 font-medium">
              {data.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {data.tagline}
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            <a 
              href={`mailto:${data.contact.email}`}
              className="p-3 bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white rounded-full transition-all duration-300 hover:scale-110"
            >
              <Mail size={24} />
            </a>
            <a 
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white rounded-full transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white rounded-full transition-all duration-300 hover:scale-110"
            >
              <Github size={24} />
            </a>
          </div>

          <div className="flex justify-center space-x-4 pt-8">
            <button 
              onClick={scrollToAbout}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              View My Work
            </button>
            <a 
              href={`mailto:${data.contact.email}`}
              className="border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToAbout} className="text-slate-400 hover:text-emerald-400 transition-colors">
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;