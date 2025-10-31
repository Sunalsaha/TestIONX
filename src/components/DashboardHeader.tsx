import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


interface DashboardHeaderProps {
  onMenuClick?: () => void;
}


const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const placeholders = [
    "How may I help you today?",
    "What's your pain of taking exam?",
    "Let's make your preparation more good for your exam"
  ];

  // Add smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header 
      className="sticky top-0 z-40 relative transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, #d8e3feff 0%, #b8c9e8 40%, #c8d9f0 70%, rgba(245, 249, 255, 0.6) 100%)'
      }}
    >
      {/* Glowing overlay effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6, 72, 255, 1) 0%, transparent 80%)',
          filter: 'blur(20px)'
        }}
      />
      
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="w-32"></div>

        <div className="flex items-center justify-center">
          <div className="bg-blue/80">
            <img 
              src="/image-removebg-preview (27).png" 
              alt="Examly Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-12 rounded-full hover:bg-white/50 transition-all duration-200 px-4"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 border-2 border-white shadow-md">
                  <AvatarImage src="" alt="Mr. Gibson" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold">
                    MG
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-slate-700 hidden sm:block">
                  Mr. Gibson
                </span>
                <svg 
                  className="h-4 w-4 text-slate-600 hidden sm:block" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl">
            <DropdownMenuLabel>
              <div>
                <p className="font-semibold text-slate-800">Mr. Gibson</p>
                <p className="text-xs text-slate-500">gibson@examly.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Result</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div 
        className="relative z-10 px-6 overflow-hidden"
        style={{
          maxHeight: isScrolled ? '0px' : '384px',
          paddingBottom: isScrolled ? '0px' : '80px',
          paddingTop: isScrolled ? '0px' : '48px',
          opacity: isScrolled ? 0 : 1,
          transform: isScrolled ? 'translateY(-20px)' : 'translateY(0)',
          transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          pointerEvents: isScrolled ? 'none' : 'auto'
        }}
      >
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <div className="relative">
            <Input
              placeholder={placeholders[placeholderIndex]}
              className="pl-14 pr-14 h-14 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-full text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400 transition-all duration-700"
            />
          </div>
          <Button
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-full shadow-md transition-all duration-200"
          >
            <Sparkles className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};


export default DashboardHeader;
