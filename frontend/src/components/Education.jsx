import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = ({ data }) => {
  return (
    <section id="education" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-emerald-400">Education</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            My academic journey and educational background
          </p>
        </div>

        <div className="space-y-8">
          {data.education.map((edu, index) => (
            <div 
              key={index}
              className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-start space-x-6">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {edu.logo}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {edu.institution}
                      </h3>
                      <h4 className="text-lg text-emerald-400 font-semibold mb-2">
                        {edu.degree}
                      </h4>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end space-y-2">
                      <div className="flex items-center text-slate-400">
                        <Calendar size={16} className="mr-2" />
                        <span>{edu.duration}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        edu.status === 'Currently Pursuing' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {edu.status}
                      </span>
                    </div>
                  </div>
                  
                  {edu.institution === "Jaypee Institute of Information Technology" && (
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h5 className="text-white font-semibold mb-2">Relevant Coursework</h5>
                      <div className="flex flex-wrap gap-2">
                        {['Data Structures', 'Algorithms', 'Web Development', 'Database Systems', 'Object-Oriented Programming'].map((course, i) => (
                          <span 
                            key={i}
                            className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-8 max-w-4xl mx-auto">
            <GraduationCap className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Academic Goals</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Currently pursuing my Bachelor's degree in Computer Science Engineering, 
              with a focus on web development and software engineering. I'm committed to 
              maintaining academic excellence while building practical skills through 
              hands-on projects and internships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;