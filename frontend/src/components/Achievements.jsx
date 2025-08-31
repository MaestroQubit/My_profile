import React from 'react';
import { Award, Trophy, Star, Calendar } from 'lucide-react';

const Achievements = ({ data }) => {
  return (
    <section id="achievements" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Achievements & <span className="text-emerald-400">Awards</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Recognition and milestones in my coding journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-start space-x-6">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {achievement.badge}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {achievement.title}
                      </h3>
                      <div className="flex items-center text-emerald-400 font-semibold mb-2">
                        <Award size={16} className="mr-2" />
                        <span>{achievement.issuer}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-slate-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed mb-4">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      achievement.type === 'Award' 
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {achievement.type === 'Award' ? <Trophy className="w-3 h-3 inline mr-1" /> : <Star className="w-3 h-3 inline mr-1" />}
                      {achievement.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-500/10 to-emerald-500/10 border border-yellow-500/20 rounded-xl p-8 max-w-4xl mx-auto">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Future Goals</h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I'm working towards achieving higher ratings in competitive programming, 
              participating in hackathons, and contributing to open-source projects. 
              My goal is to continuously improve and make meaningful contributions to the tech community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['CodeChef 3-Star', 'Open Source Contributor', 'Hackathon Winner', 'Technical Blogger'].map((goal, index) => (
                <span 
                  key={index}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full border border-slate-600 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;