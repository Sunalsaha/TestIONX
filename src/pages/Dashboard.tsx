import { useState } from "react";
import { FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import RoomCard from "@/components/RoomCard";
import ExamCard from "@/components/ExamCard";
import CreateRoomDialog from "@/components/CreateRoomDialog";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <DashboardSidebar isOpen={sidebarOpen} />
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="min-h-screen">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="rooms" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="bg-card">
                <TabsTrigger value="rooms">Created Rooms</TabsTrigger>
                <TabsTrigger value="exams">Exam Rooms</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <CreateRoomDialog />
                <Button variant="outline" className="gap-2">
                  <FileEdit className="h-4 w-4" />
                  Make Question Paper
                </Button>
              </div>
            </div>

            <TabsContent value="rooms" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} {...room} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exams" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam) => (
                  <ExamCard key={exam.id} {...exam} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
