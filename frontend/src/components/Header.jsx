import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const navigationItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-emerald-400">
            CK
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => navigateToSection(item.id)}
                className="text-slate-300 hover:text-emerald-400 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-300 hover:text-emerald-400"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button 
                  key={`mobile-${item.id}`}
                  onClick={() => navigateToSection(item.id)}
                  className="text-slate-300 hover:text-emerald-400 transition-colors font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;