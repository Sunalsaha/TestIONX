import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShineBorder } from "@/components/ShineBorder";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiBook, BiCalendarCheck, BiTimeFive } from "react-icons/bi";


interface ExamCardProps {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  status: "online" | "scheduled" | "completed";
}


const ExamCard = ({ id, title, subject, date, time, status }: ExamCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const statusConfig = {
    online: { label: "Online", variant: "default" as const },
    scheduled: { label: "Scheduled", variant: "secondary" as const },
    completed: { label: "Completed", variant: "outline" as const },
  };

  const currentStatus = statusConfig[status];

  const handleButtonClick = () => {
    if (status === "online") {
      navigate(`/exam/${id}/terms`);
    } else if (status === "scheduled") {
      navigate(`/exam/${id}/details`);
    } else {
      navigate(`/exam/${id}/results`);
    }
  };

  return (
    <div
      className="relative rounded-xl font-poppins"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shine Border - Only visible on hover */}
      {isHovered && (
        <ShineBorder 
          borderWidth={2}
          duration={3}
          shineColor={["#63c6f1", "#4f46e5", "#6366f1"]}
          className="rounded-xl"
        />
      )}

      <Card 
        className="relative overflow-hidden border-0 group cursor-pointer font-poppins"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
          boxShadow: '0 20px 60px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(226, 232, 240, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 30px 80px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(226, 232, 240, 0.3)';
        }}
      >
        
        {/* Background decoration */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
        
        <CardHeader className="pb-4 pt-6 relative z-10">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl font-semibold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors duration-300 font-poppins">
              {title}
            </CardTitle>
          </div>
          <Badge 
            variant={currentStatus.variant} 
            className="w-fit mt-2 font-poppins font-semibold"
          >
            {currentStatus.label}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-4 pb-6 relative z-10 font-poppins">
          {/* Subject Info */}
          <div 
            className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm border border-indigo-100/50 group-hover:border-indigo-200 transition-all duration-300 font-poppins"
            style={{
              background: 'linear-gradient(135deg, rgba(224, 231, 255, 0.3) 0%, rgba(219, 234, 254, 0.3) 100%)'
            }}
          >
            <div 
              className="p-3 rounded-xl shadow-md"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
              }}
            >
              <BiBook className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 font-poppins">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-0.5 font-poppins">
                Subject
              </p>
              <span className="text-base font-semibold text-slate-800 font-poppins">{subject}</span>
            </div>
          </div>
          
          {/* Date Info */}
          <div 
            className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm border border-blue-100/50 group-hover:border-blue-200 transition-all duration-300 font-poppins"
            style={{
              background: 'linear-gradient(135deg, rgba(224, 231, 255, 0.3) 0%, rgba(219, 234, 254, 0.3) 100%)'
            }}
          >
            <div 
              className="p-3 rounded-xl shadow-md"
              style={{
                background: 'linear-gradient(135deg, #5cb6f6ff 0%, #3a9cedff 100%)'
              }}
            >
              <BiCalendarCheck className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 font-poppins">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5 font-poppins">
                Date
              </p>
              <span className="text-base font-semibold text-slate-800 font-poppins">{date}</span>
            </div>
          </div>

          {/* Time Info */}
          <div 
            className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm border border-purple-100/50 group-hover:border-purple-200 transition-all duration-300 font-poppins"
            style={{
              background: 'linear-gradient(135deg, rgba(233, 213, 255, 0.3) 0%, rgba(224, 231, 255, 0.3) 100%)'
            }}
          >
            <div 
              className="p-3 rounded-xl shadow-md"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
              }}
            >
              <BiTimeFive className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 font-poppins">
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-0.5 font-poppins">
                Time
              </p>
              <span className="text-base font-semibold text-slate-800 font-poppins">{time}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 pb-6 relative z-10 font-poppins">
          <Button 
            onClick={handleButtonClick}
            disabled={status === "completed"}
            className="w-full h-12 font-semibold text-base shadow-xl group-hover:shadow-2xl transition-all duration-300 border-0 rounded-xl relative overflow-hidden font-poppins disabled:opacity-50"
            style={{
              background: status === "completed" 
                ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                : 'linear-gradient(135deg, #63c6f1ff 0%, #4f46e5 50%, #4338ca 100%)',
            }}
            onMouseEnter={(e) => {
              if (status !== "completed") {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (status !== "completed") {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
              }
            }}
          >
            <span className="relative z-10 font-poppins">
              {status === "online" ? "Start Exam" : status === "scheduled" ? "View Details" : "View Results"}
            </span>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-600"
              style={{
                transform: 'translateX(-100%)',
              }}
            />
          </Button>
        </CardFooter>

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
      </Card>
    </div>
  );
};

export default ExamCard;
