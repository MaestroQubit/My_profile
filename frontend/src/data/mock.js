const portfolioData = {
  name: "Chirag Kumar",
  title: "Web Developer & CSE Student",
  tagline: "I build practical, polished web experiences while learning in public and shipping real projects.",
  
  about: {
    description: "I'm a first-year Computer Science Engineering student at Jaypee Institute of Information Technology who enjoys turning ideas into clean, responsive web apps. I learn best by building real projects, iterating fast, and improving the details that make software feel finished.",
    highlights: [
      "🎓 CSE Undergraduate at JIIT",
      "💻 React and JavaScript Builder",
      "🏆 GitHub Projects in Public",
      "🚀 Always Learning & Growing"
    ]
  },

  skills: {
    technical: [
      { name: "C Programming", level: 85 },
      { name: "HTML/CSS", level: 80 },
      { name: "JavaScript", level: 75 },
      { name: "React.js", level: 70 },
      { name: "AutoCAD", level: 70 },
      { name: "Git/GitHub", level: 65 }
    ],
    soft: [
      "Problem Solving",
      "Team Collaboration",
      "Quick Learning",
      "Attention to Detail",
      "Communication",
      "Time Management"
    ]
  },

  projects: [
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "A responsive portfolio website built with React.js and Tailwind CSS. It presents my work, education, skills, and contact details in a clean single-page experience.",
      technologies: ["React.js", "Tailwind CSS", "JavaScript", "HTML5"],
      github: "#",
      demo: "#",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      status: "Completed"
    },
    {
      id: 2,
      title: "FunHub",
      description: "Interactive mini games and fun activities with multiple playful experiences, including games and creativity-driven pages.",
      technologies: ["HTML", "CSS", "JavaScript", "Vercel"],
      github: "https://github.com/MaestroQubit/FunHub",
      demo: "https://funhub-six.vercel.app/",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
      status: "Completed"
    },
    {
      id: 3,
      title: "Calculator",
      description: "A simple deployed calculator project focused on clean interaction, quick calculations, and a lightweight interface.",
      technologies: ["HTML", "CSS", "JavaScript", "Vercel"],
      github: "https://github.com/MaestroQubit/Calculator",
      demo: "https://calculator-kappa-seven-51.vercel.app/",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
      status: "Completed"
    }
  ],

  education: [
    {
      institution: "Jaypee Institute of Information Technology",
      degree: "Bachelor of Technology in Computer Science Engineering",
      duration: "2025 - 2029",
      status: "Currently Pursuing",
      logo: "🎓"
    },
    {
      institution: "St. Francis Convent School - India",
      degree: "Higher Secondary Education",
      duration: "Apr 2010 - Mar 2023",
      status: "Completed",
      logo: "🏫"
    }
  ],

  achievements: [
    {
      title: "Problem Solver",
      issuer: "CodeChef",
      date: "Aug 2025",
      description: "Recognized for problem-solving skills and algorithmic thinking. First step to dive in the world of codes.",
      badge: "🏆",
      type: "Award"
    },
    {
      title: "CodeChef Bronze Badge",
      issuer: "CodeChef",
      date: "2025",
      description: "Achieved Bronze level rating in competitive programming on CodeChef platform.",
      badge: "🥉",
      type: "Badge"
    }
  ],

  contact: {
    email: "kchirag.gautam.30@gmail.com",
    phone: "7417479862",
    linkedin: "https://www.linkedin.com/in/chirag-kumar-a016b937b/",
    github: "https://github.com/MaestroQubit",
    location: "Noida, Uttar Pradesh, India"
  }
};

export { portfolioData as mockData };