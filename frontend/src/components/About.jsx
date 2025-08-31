import React from 'react';
import { Code, Coffee, Lightbulb, Target } from 'lucide-react';

const About = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-emerald-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed">
              {data.about.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {data.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-lg">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a 
                href={`mailto:${data.contact.email}`}
                className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Let's Connect
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl text-center hover:bg-slate-700 transition-colors">
              <Code className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Clean Code</h3>
              <p className="text-slate-400 text-sm">Writing maintainable and efficient code</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl text-center hover:bg-slate-700 transition-colors">
              <Lightbulb className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Problem Solving</h3>
              <p className="text-slate-400 text-sm">Analytical thinking and creative solutions</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl text-center hover:bg-slate-700 transition-colors">
              <Coffee className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Continuous Learning</h3>
              <p className="text-slate-400 text-sm">Always exploring new technologies</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl text-center hover:bg-slate-700 transition-colors">
              <Target className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Goal Oriented</h3>
              <p className="text-slate-400 text-sm">Focused on achieving excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;