import { useState } from "react";
import { FileEdit, Plus, Bell, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";
import RoomCard from "@/components/RoomCard";
import ExamCard from "@/components/ExamCard";
import CreateRoomDialog from "@/components/CreateRoomDialog";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"room" | "exam">("room");
  const navigate = useNavigate();

  const rooms = [
    { id: 1, name: "Physics Final Exam", dateCreated: "Jan 15, 2025", participants: 45 },
    { id: 2, name: "Chemistry Midterm", dateCreated: "Jan 10, 2025", participants: 38 },
    { id: 3, name: "Biology Quiz Room", dateCreated: "Jan 5, 2025", participants: 52 },
  ];

  const exams = [
    {
      id: 1,
      title: "Mathematics Final",
      subject: "Advanced Calculus",
      date: "Jan 20, 2025",
      time: "2:00 PM",
      status: "online" as const,
    },
    {
      id: 2,
      title: "Physics Midterm",
      subject: "Quantum Mechanics",
      date: "Jan 25, 2025",
      time: "10:00 AM",
      status: "scheduled" as const,
    },
    {
      id: 3,
      title: "Chemistry Quiz",
      subject: "Organic Chemistry",
      date: "Jan 30, 2025",
      time: "3:00 PM",
      status: "scheduled" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="min-h-screen">
        <DashboardHeader />

        <main className="container mx-auto px-4 py-2 space-y-4">
          
          {/* GIF and Toggle Button Combined Section */}
          <div className="flex flex-col items-center">
            {/* GIF Animation - No margin bottom */}
            <div className="mb-[-5px] z-1">
              <img 
                src="/e274568d-d4df-4a61-814e-cb87d8-unscreen.gif" 
                alt="Animation" 
                className="w-48 h-48 object-contain drop-shadow-2x1"
              />
            </div>

            {/* Toggle Button Section */}
            <div
              className="inline-flex rounded-full p-1 shadow-md"
              style={{
                background: "linear-gradient(135deg, #e8f0fb 0%, #dce8f8 100%)",
              }}
            >
              <button
                onClick={() => setActiveTab("room")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === "room"
                    ? "text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-800"
                }`}
                style={
                  activeTab === "room"
                    ? {
                        background:
                          "linear-gradient(135deg, #4a5f8f 0%, #5668e8 100%)",
                      }
                    : {}
                }
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Created Rooms
                </div>
              </button>

              <button
                onClick={() => setActiveTab("exam")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === "exam"
                    ? "text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-800"
                }`}
                style={
                  activeTab === "exam"
                    ? {
                        background:
                          "linear-gradient(135deg, #4a5f8f 0%, #5668e8 100%)",
                      }
                    : {}
                }
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Exam Rooms
                </div>
              </button>
            </div>
          </div>

          {/* Rounded Box Container */}
          <div 
            className="rounded-3xl shadow-xl p-8 backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
              border: '1px solid rgba(226, 232, 240, 0.5)'
            }}
          >
            {/* Top Right Buttons - Only show when activeTab is "room" */}
            {activeTab === "room" && (
              <div className="flex justify-end items-center gap-2 mb-6">
                <CreateRoomDialog />
                <Button 
                  variant="outline" 
                  className="gap-2 hover:bg-blue-50 border-blue-200 hover:border-blue-300 transition-all duration-200"
                  onClick={() => navigate("/question-paper")}
                >
                  <FileEdit className="h-4 w-4" />
                  Make Question Paper
                </Button>
              </div>
            )}

            {/* Reminder Banner - Only show when activeTab is "exam" */}
            {activeTab === "exam" && (
              <div 
                className="mb-6 p-4 rounded-2xl backdrop-blur-md border-2 animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
                  borderColor: 'rgba(16, 185, 129, 0.3)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="p-3 rounded-xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    }}
                  >
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="h-5 w-5 text-emerald-600" />
                      <h3 className="text-lg font-bold text-slate-800">Exam Reminder</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-emerald-700">Mathematics Final</span> is currently live! 
                      Click "Enter Exam" to join now. Don't miss your scheduled exams.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Content Section */}
            {activeTab === "room" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} {...room} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam) => (
                  <ExamCard key={exam.id} {...exam} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
