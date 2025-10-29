import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer 
      className="relative mt-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)'
      }}
    >
      {/* Decorative gradient overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)'
        }}
      />

      {/* Top gradient line */}
      <div 
        className="h-1"
        style={{
          background: 'linear-gradient(90deg, #eeeefc0d 0%, #eeeefc52 25%, #eeeefca3 50%, rgba(185, 162, 239, 0.62) 75%, #eeeefcff 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradient-flow 4s linear infinite'
        }}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div 
                className=""
              >
                <img 
                  src="/image-removebg-preview (27).png" 
                  alt="Examly Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transform your exam preparation with AI-powered tools and comprehensive study resources. Your success is our mission.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, color: '#1877f2' },
                { icon: Twitter, color: '#1da1f2' },
                { icon: Instagram, color: '#e4405f' },
                { icon: Linkedin, color: '#0077b5' },
                { icon: Youtube, color: '#ff0000' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <div 
                className="absolute bottom-0 left-0 w-1/2 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, #6366f1 0%, transparent 100%)'
                }}
              />
            </h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Features', 'Pricing', 'Testimonials', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-slate-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span 
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-300"
                      style={{
                        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)'
                      }}
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Resources
              <div 
                className="absolute bottom-0 left-0 w-1/2 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, #6366f1 0%, transparent 100%)'
                }}
              />
            </h4>
            <ul className="space-y-3">
              {['Study Materials', 'Practice Tests', 'Video Tutorials', 'FAQ', 'Support Center', 'API Documentation'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-slate-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span 
                      className="w-0 h-0.5 group-hover:w-4 transition-all duration-300"
                      style={{
                        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)'
                      }}
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Contact Us
              <div 
                className="absolute bottom-0 left-0 w-1/2 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, #6366f1 0%, transparent 100%)'
                }}
              />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div 
                  className="p-2 rounded-lg mt-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                  }}
                >
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Email</p>
                  <a href="mailto:support@examly.com" className="text-slate-300 hover:text-white text-sm transition-colors">
                    support@examly.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div 
                  className="p-2 rounded-lg mt-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                  }}
                >
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Phone</p>
                  <a href="tel:+1234567890" className="text-slate-300 hover:text-white text-sm transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div 
                  className="p-2 rounded-lg mt-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                  }}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Address</p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    123 Education Street,<br />
                    Learning City, LC 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t"
          style={{
            borderColor: 'rgba(148, 163, 184, 0.1)'
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm flex items-center gap-1">
              © 2025 Testonix. Made with <Heart className="h-4 w-4 text-red-500 fill-current inline animate-pulse" /> by Your Team
            </p>
            
            <div className="flex gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link 
                  key={item}
                  to="#" 
                  className="text-slate-400 hover:text-white transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
