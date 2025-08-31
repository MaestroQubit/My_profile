import React from 'react';

const SkillBar = ({ skill, index }) => {
  return (
    <div className="space-y-2" key={`skill-${index}`}>
      <div className="flex justify-between items-center">
        <span className="text-slate-300 font-medium">{skill.name}</span>
        <span className="text-emerald-400 font-semibold">{skill.level}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
};

const SoftSkillCard = ({ skill, index }) => {
  return (
    <div 
      key={`soft-skill-${index}`}
      className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
    >
      <span className="text-slate-300 font-medium">{skill}</span>
    </div>
  );
};

const Skills = ({ data }) => {
  const learningTech = ['Node.js', 'MongoDB', 'Python', 'Data Structures & Algorithms'];

  return (
    <section id="skills" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-emerald-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Here are the technologies and tools I work with
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Technical Skills</h3>
            <div className="space-y-6">
              {data.skills.technical.map((skill, idx) => (
                <SkillBar skill={skill} index={idx} key={skill.name} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Soft Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.soft.map((skill, idx) => (
                <SoftSkillCard skill={skill} index={idx} key={skill} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-slate-800 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Currently Learning</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {learningTech.map((tech, idx) => (
                <span 
                  key={`learning-${idx}`}
                  className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;