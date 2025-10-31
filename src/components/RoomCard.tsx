import { Users, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShineBorder } from "@/components/ShineBorder";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineLightbulb } from "react-icons/md";


interface RoomCardProps {
  name: string;
  dateCreated: string;
  participants: number;
  roomId?: string;
}


const RoomCard = ({ name, dateCreated, participants, roomId }: RoomCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleViewDetails = () => {
    navigate('/room-details', { 
      state: { 
        roomName: name, 
        dateCreated, 
        totalStudents: participants,
        roomId: roomId || name.toLowerCase().replace(/\s+/g, '-')
      } 
    });
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
              {name}
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 pb-6 relative z-10 font-poppins">
          {/* Date Info */}
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
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 font-poppins">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-0.5 font-poppins">
                Created On
              </p>
              <span className="text-base font-semibold text-slate-800 font-poppins">{dateCreated}</span>
            </div>
          </div>
          
          {/* Participants Info */}
          <div 
            className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm border border-purple-100/50 group-hover:border-purple-200 transition-all duration-300 font-poppins"
            style={{
              background: 'linear-gradient(135deg, rgba(233, 213, 255, 0.3) 0%, rgba(224, 231, 255, 0.3) 100%)'
            }}
          >
            <div 
              className="p-3 rounded-xl shadow-md"
              style={{
                background: 'linear-gradient(135deg, #5cb6f6ff 0%, #3a9cedff 100%)'
              }}
            >
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 font-poppins">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5 font-poppins">
                Total Students
              </p>
              <div className="flex items-center gap-2 font-poppins">
                <span className="text-base font-semibold text-slate-800 font-poppins">{participants} Students</span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5 font-poppins">
                  <TrendingUp className="h-3 w-3" />
                  +5%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 pb-6 relative z-10 font-poppins">
          <Button 
            onClick={handleViewDetails}
            className="w-full h-12 font-semibold text-base shadow-xl group-hover:shadow-2xl transition-all duration-300 border-0 rounded-xl relative overflow-hidden font-poppins"
            style={{
              background: 'linear-gradient(135deg, #63c6f1ff 0%, #4f46e5 50%, #4338ca 100%)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
            }}
          >
            <span className="relative z-10 font-poppins">View Details</span>
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

export default RoomCard;
