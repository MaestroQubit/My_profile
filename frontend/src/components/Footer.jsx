import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();
  const contact = data?.contact || {};

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-emerald-400">
              {data?.name || 'Chirag Kumar'}
            </div>
            <p className="text-slate-400 leading-relaxed">
              {data?.title || 'Web Developer & CSE Student'} passionate about creating meaningful digital experiences.
            </p>
            <div className="flex space-x-4">
              <a 
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href={`mailto:${contact.email}`}
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-slate-400 hover:text-emerald-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Skills
              </button>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}      
                className="block text-slate-400 hover:text-emerald-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Get In Touch</h3>
            <div className="space-y-2">
              <p className="text-slate-400">
                <span className="text-emerald-400">Email:</span> {contact.email}
              </p>
              <p className="text-slate-400">
                <span className="text-emerald-400">Phone:</span> {contact.phone}
              </p>
              <p className="text-slate-400">
                <span className="text-emerald-400">Location:</span> {contact.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} {data?.name || 'Chirag Kumar'}. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>and React.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;