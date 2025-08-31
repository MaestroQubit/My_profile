import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-400">
            CK
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              Education
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-300 hover:text-emerald-400"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-slate-300 hover:text-emerald-400 transition-colors font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="text-slate-300 hover:text-emerald-400 transition-colors font-medium text-left"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-slate-300 hover:text-emerald-400 transition-colors font-medium text-left"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('education')}
                className="text-slate-300 hover:text-emerald-400 transition-colors font-medium text-left"
              >
                Education
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-slate-300 hover:text-emerald-400 transition-colors font-medium text-left"
              >
                Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;