import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Send, MessageCircle, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast({
          title: "Message Sent!",
          description: response.data.message,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      let errorMessage = "Failed to send message. Please try again.";
      
      if (error.response?.data?.detail) {
        if (typeof error.response.data.detail === 'string') {
          errorMessage = error.response.data.detail;
        } else if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => err.msg || err).join(', ');
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
          {/* Contact Information */}
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

          {/* Contact Form */}
          <div className="bg-slate-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-300 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
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