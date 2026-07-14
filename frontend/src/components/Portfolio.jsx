import React, { useState } from 'react';
import { mockData } from '../data/mock';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Education from './Education';
import Achievements from './Achievements';
import Contact from './Contact';
import Footer from './Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <Hero data={mockData} />
      <About data={mockData} />
      <Skills data={mockData} />
      <Projects data={mockData} />
      <Education data={mockData} />
      <Achievements data={mockData} />
      <Contact data={mockData} />
      <Footer data={mockData} />
    </div>
  );
};

export default Portfolio;