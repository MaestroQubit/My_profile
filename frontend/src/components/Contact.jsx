import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Send, MessageCircle, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL?.trim();

const buildApiBases = () => {
  const bases = [];

  if (BACKEND_URL) {
    bases.push(`${BACKEND_URL.replace(/\/$/, '')}/api`);
  }

  bases.push(`${window.location.origin.replace(/\/$/, '')}/api`);
  bases.push('http://localhost:8001/api');

  return [...new Set(bases)];
};

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateFormField = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const submitContactForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let lastError = null;

      for (const baseUrl of buildApiBases()) {
        try {
          const response = await axios.post(`${baseUrl}/contact`, formData, {
            timeout: 10000,
          });

          if (response.data.success) {
            toast({
              title: "Message Sent!",
              description: response.data.message,
            });
            resetForm();
            return;
          }
        } catch (error) {
          lastError = error;
          const status = error.response?.status;

          if (status && status !== 404) {
            break;
          }
        }
      }

      const mailSubject = encodeURIComponent(formData.subject || 'Portfolio website message');
      const mailBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
      );

      if (data.contact.email) {
        window.location.href = `mailto:${data.contact.email}?subject=${mailSubject}&body=${mailBody}`;
        toast({
          title: "Open your mail app",
          description: "No API backend was reachable, so I opened a pre-filled email draft instead.",
        });
        resetForm();
        return;
      }

      throw lastError || new Error('No contact endpoint was reachable');
    } catch (err) {
      console.error('Contact form submission error:', err);
      
      let errorMsg = "Failed to send message. Please try again.";
      
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (typeof detail === 'string') {
          errorMsg = detail;
        } else if (Array.isArray(detail)) {
          errorMsg = detail.map(error => error.msg || error).join(', ');
        }
      }
      
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-emerald-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just chatting about technology!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'd love to hear from you. Don't hesitate to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="bg-emerald-500/20 p-3 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <a 
                    href={`mailto:${data.contact.email}`}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {data.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="bg-emerald-500/20 p-3 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <span className="text-slate-400">{data.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 group">
                <div className="bg-emerald-500/20 p-3 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                  <MapPin className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <span className="text-slate-400">{data.contact.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a 
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-emerald-500 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-6 h-6 text-slate-300 hover:text-white" />
                </a>
                <a 
                  href={data.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-emerald-500 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-6 h-6 text-slate-300 hover:text-white" />
                </a>
                <a 
                  href={`mailto:${data.contact.email}`}
                  className="bg-slate-800 hover:bg-emerald-500 p-3 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <MessageCircle className="w-6 h-6 text-slate-300 hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={submitContactForm} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-300 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={updateFormField}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-slate-300 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={updateFormField}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-slate-300 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={updateFormField}
                  required
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-300 font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={updateFormField}
                  required
                  rows={5}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;