import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShineBorder } from "@/components/ShineBorder";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiBook, BiCalendarCheck, BiTimeFive } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";

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
    } else if (status === "completed") {
      navigate(`/exam/${id}/results`);
    }
  };

  return (
    <div
      className="w-full max-w-sm h-full relative rounded-xl font-poppins"
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
        className="relative overflow-hidden border-0 group cursor-pointer font-poppins w-full h-full flex flex-col"
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
        
        <CardHeader className="pb-3 pt-5 px-5 relative z-10">
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="text-lg font-semibold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors duration-300 font-poppins line-clamp-2 flex-1">
              {title}
            </CardTitle>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {status === "online" ? (
                <div 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-poppins font-semibold text-xs whitespace-nowrap text-white shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <IoCheckmarkCircle className="h-4 w-4" />
                  <span>Online</span>
                </div>
              ) : (
                <Badge 
                  variant={currentStatus.variant} 
                  className="font-poppins font-semibold text-xs whitespace-nowrap"
                >
                  {currentStatus.label}
                </Badge>
              )}
              <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                {time}
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-2 pb-5 px-5 relative z-10 font-poppins flex-1">
          {/* Subject Info */}
          <div 
            className="flex items-center gap-2 p-2 rounded-lg backdrop-blur-sm border border-indigo-100/50 group-hover:border-indigo-200 transition-all duration-300 font-poppins"
            style={{
              background: 'linear-gradient(135deg, rgba(224, 231, 255, 0.3) 0%, rgba(219, 234, 254, 0.3) 100%)'
            }}
          >
            <div 
              className="p-1.5 rounded-lg shadow-md flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
              }}
            >
              <BiBook className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 font-poppins min-w-0">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide font-poppins">
                Subject
              </p>
              <span className="text-xs font-semibold text-slate-800 font-poppins line-clamp-1">{subject}</span>
            </div>
          </div>
          
          {/* Date Info */}
          <div 
            className="flex items-center gap-2 p-2 rounded-lg backdrop-blur-sm border border-blue-100/50 group-hover:border-blue-200 transition-all duration-300 font-poppins"
            style={{
              background: 'linear-gradient(135deg, rgba(224, 231, 255, 0.3) 0%, rgba(219, 234, 254, 0.3) 100%)'
            }}
          >
            <div 
              className="p-1.5 rounded-lg shadow-md flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #5cb6f6ff 0%, #3a9cedff 100%)'
              }}
            >
              <BiCalendarCheck className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 font-poppins min-w-0">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide font-poppins">
                Date
              </p>
              <span className="text-xs font-semibold text-slate-800 font-poppins line-clamp-1">{date}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-5 px-5 relative z-10 font-poppins mt-auto">
          <Button 
            onClick={handleButtonClick}
            disabled={status === "completed" || status === "scheduled"}
            className="w-full h-10 font-semibold text-xs shadow-lg group-hover:shadow-xl transition-all duration-300 border-0 rounded-lg relative overflow-hidden font-poppins disabled:opacity-50"
            style={{
              background: status === "completed" || status === "scheduled"
                ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
                : 'linear-gradient(135deg, #63c6f1ff 0%, #4f46e5 50%, #4338ca 100%)',
            }}
            onMouseEnter={(e) => {
              if (status !== "completed" && status !== "scheduled") {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (status !== "completed" && status !== "scheduled") {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
              }
            }}
          >
            <span className="relative z-10 font-poppins">
              {status === "completed" ? "View Results" : "Start Exam"}
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
