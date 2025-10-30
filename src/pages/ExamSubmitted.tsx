import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


const ExamSubmitted = () => {
  const navigate = useNavigate();
  const { examId } = useParams();


  // Mock data - replace with actual data
  const submissionData = {
    examTitle: "Mid-Term Mathematics Examination",
    studentName: "John Doe",
    rollNumber: "2025/CS/101",
    subject: "Mathematics",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    time: new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    totalQuestions: 25,
    answered: 23,
    totalMarks: 100,
  };


  // Download PDF function
  const handleDownload = () => {
    const input = document.getElementById('submission-receipt');
    
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${submissionData.studentName}_Submission_Receipt.pdf`);
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
      {/* Paper-like submission receipt */}
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-2xl border-2 border-gray-300 overflow-hidden">
        
        {/* Main content - Non-selectable */}
        <div 
          id="submission-receipt" 
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
        >
          {/* Logo Section */}
          <div className="pt-6 px-6 pb-2 text-center bg-white border-b border-gray-200">
            <div className="flex justify-center">
              <img 
                src="/image-removebg-preview (28).png" 
                alt="Institution Logo" 
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>


          {/* Header - Institution style */}
          <div className="border-b-4 border-double border-gray-800 pt-4 px-8 pb-8 text-center bg-white">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Examination Submitted
            </h1>
            <div className="w-32 h-1 bg-gray-800 mx-auto"></div>
          </div>


          {/* Submission Details - Question Paper Style */}
          <div className="p-10 bg-white">
            <div className="border-2 border-gray-300 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                Examination Details
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Student Name
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {submissionData.studentName}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Roll Number
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {submissionData.rollNumber}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Subject
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {submissionData.subject}
                    </p>
                  </div>
                </div>


                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Examination
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {submissionData.examTitle}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Submission Date
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {submissionData.date}
                    </p>
                  </div>


                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Submission Time
                    </p>
                    <p className="text-base font-bold text-gray-900">
                      {submissionData.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* Statistics Box */}
            <div className="border-2 border-gray-300 rounded-lg p-6 mb-6 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                Submission Summary
              </h2>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-2xl font-bold text-blue-600 mb-1">
                    {submissionData.totalQuestions}
                  </p>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Total Questions
                  </p>
                </div>


                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-2xl font-bold text-green-600 mb-1">
                    {submissionData.answered}
                  </p>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Answered
                  </p>
                </div>


                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-2xl font-bold text-purple-600 mb-1">
                    {submissionData.totalMarks}
                  </p>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Total Marks
                  </p>
                </div>
              </div>
            </div>


            {/* Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-bold text-gray-900">Note:</span> Your examination has been submitted successfully. 
                Results will be published once the evaluation is completed by the instructor. 
                You will be notified via email when the results are available.
              </p>
            </div>


            {/* Signature Section - Traditional Paper Style */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t-2 border-gray-200">
              <div>
                <div className="border-t-2 border-gray-800 pt-2 mt-12">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide text-center">
                    Student's Signature
                  </p>
                </div>
              </div>
              <div>
                <div className="border-t-2 border-gray-800 pt-2 mt-12">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide text-center">
                    Examiner's Signature
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Footer with Buttons - Selectable (outside non-selectable div) */}
        <div className="border-t-2 border-gray-300 p-6 bg-gray-50 flex justify-center gap-4">
          <Button
            onClick={handleDownload}
            className="px-10 py-6 rounded-lg font-bold text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Result
          </Button>
          
          <Button
            onClick={() => navigate("/dashboard")}
            className="px-10 py-6 rounded-lg font-bold text-base bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};


export default ExamSubmitted;
