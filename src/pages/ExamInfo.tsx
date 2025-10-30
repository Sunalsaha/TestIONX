import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, FileText, AlertCircle } from "lucide-react";



const ExamInfo = () => {
  const navigate = useNavigate();
  const { examId } = useParams();



  const examData = {
    title: "Mid-Term Mathematics Examination",
    subject: "Mathematics",
    totalQuestions: 25,
    totalMarks: 100,
    duration: 120,
    date: "October 30, 2025",
    time: "2:00 PM - 4:00 PM",
    instructions: [
      "Each question must be answered within the given time limit",
      "Once you move to the next question, you cannot go back",
      "The exam will auto-submit when time expires",
      "Ensure stable internet connection throughout the exam",
    ]
  };



  const handleStartExam = () => {
    navigate(`/exam/${examId}/take`);
  };



  return (
    <div 
      className="h-screen w-screen flex flex-col bg-white overflow-hidden"
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      <style>{`
        .exam-info-content::-webkit-scrollbar {
          display: none;
        }
        .exam-info-content {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>


      {/* Header with Logo */}
      <div className="border-b-2 border-gray-300 px-8 py-4 flex items-center gap-4 flex-shrink-0">
        <img 
          src="/image-removebg-preview (28).png" 
          alt="Institution Logo" 
          className="h-14 w-auto object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            {examData.title}
          </h1>
          <p className="text-sm text-gray-600">
            {examData.subject}
          </p>
        </div>
      </div>


      {/* Main Content - Scrollable with hidden scrollbar */}
      <div className="exam-info-content flex-1 overflow-y-auto px-8 py-6">
        {/* Exam Details Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
          <div className="border-2 border-gray-300 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-500 mb-1">
              {examData.totalQuestions}
            </p>
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Questions
            </p>
          </div>


          <div className="border-2 border-gray-300 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-500 mb-1">
              {examData.totalMarks}
            </p>
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Total Marks
            </p>
          </div>


          <div className="border-2 border-gray-300 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-500 mb-1">
              {examData.duration}
            </p>
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Minutes
            </p>
          </div>


          <div className="border-2 border-gray-300 p-4 rounded-lg text-center">
            <p className="text-lg font-bold text-blue-500 mb-1">
              {examData.date}
            </p>
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Date 
            </p>
          </div>
        </div>


        {/* Instructions */}
        <div className="border-2 border-gray-300 p-5 rounded-lg mb-6 bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <h2 className="text-lg font-bold text-blue-500">Instructions</h2>
          </div>
          <ul className="space-y-2">
            {examData.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700 leading-relaxed pt-0.5">
                  {instruction}
                </span>
              </li>
            ))}
          </ul>
        </div>


        {/* Security Notice */}
        <div className="border-l-4 border-gray-900 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            ⚠️ Security Monitoring
          </p>
          <p className="text-xs text-gray-700">
            This exam is monitored for academic integrity. Your actions will be recorded and reviewed if necessary.
          </p>
        </div>
      </div>


      {/* Footer */}
      <div className="border-t-2 border-gray-300 px-8 py-4 bg-white flex items-center justify-between flex-shrink-0">
        <Button
          onClick={() => navigate(-1)}
          className="px-8 py-3 font-semibold border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          ← Back
        </Button>
        <Button
          onClick={handleStartExam}
          className="px-8 py-3 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
        >
          Start Exam →
        </Button>
      </div>
    </div>
  );
};



export default ExamInfo;
