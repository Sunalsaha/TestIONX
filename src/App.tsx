import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuestionPaper from "./pages/QuestionPaperCreator";
import QuestionResults from "./pages/QuestionPaperCreator";
import AIGenerator from "./pages/AIGenerator";
import RoomDetails from "./pages/RoomDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// TypeScript interface for room details state
interface RoomDetailsState {
  roomName: string;
  dateCreated: string;
  totalStudents: number;
  roomId?: string;
}

// Wrapper component for RoomDetails to handle routing state
const RoomDetailsWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as RoomDetailsState | null;

  // Redirect to dashboard if no state is provided
  if (!state) {
    navigate('/dashboard');
    return null;
  }

  return (
    <RoomDetails
      roomName={state.roomName}
      dateCreated={state.dateCreated}
      totalStudents={state.totalStudents}
      onBack={() => navigate('/dashboard')}
    />
  );
};

const AppContent = () => {
  const location = useLocation();
  
  // Hide footer on Login, QuestionPaper, AIGenerator and RoomDetails routes
  const showFooter = 
    location.pathname !== "/" &&
    location.pathname !== "/question-paper" && 
    location.pathname !== "/ai-generator" &&
    location.pathname !== "/room-details";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/question-paper" element={<QuestionPaper />} />
          <Route path="/question-results" element={<QuestionResults />} />
          <Route path="/ai-generator" element={<AIGenerator />} />
          <Route path="/room-details" element={<RoomDetailsWrapper />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
