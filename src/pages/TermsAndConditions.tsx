import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";


interface Term {
  id: string;
  text: string;
}


const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  
  const [acceptedTerms, setAcceptedTerms] = useState<Set<string>>(new Set());


  const terms: Term[] = [
    { id: "1", text: "I understand that this exam must be completed in one sitting without closing the browser." },
    { id: "2", text: "I will not use any unauthorized materials, notes, or external assistance during the exam." },
    { id: "3", text: "I acknowledge that my camera may be monitored for academic integrity purposes." },
    { id: "4", text: "I will not minimize the browser window or switch to other applications during the exam." },
    { id: "5", text: "I understand that any violation of exam rules may result in disqualification." },
    { id: "6", text: "I will maintain a stable internet connection throughout the exam duration." },
  ];


  const toggleTerm = (termId: string) => {
    const newAccepted = new Set(acceptedTerms);
    if (newAccepted.has(termId)) {
      newAccepted.delete(termId);
    } else {
      newAccepted.add(termId);
    }
    setAcceptedTerms(newAccepted);
  };


  const allAccepted = terms.every((term) => acceptedTerms.has(term.id));


  const handleNext = () => {
    if (allAccepted) {
      navigate(`/exam/${examId}/info`);
    }
  };


  return (
    <div 
      className="h-screen w-screen bg-white flex flex-col overflow-hidden"
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* Hide scrollbar for all browsers */}
      <style>{`
        .terms-container::-webkit-scrollbar {
          display: none;
        }
        .terms-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Header with Logo */}
      <div className="border-b-2 border-gray-300 px-8 py-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <img 
            src="/image-removebg-preview (28).png" 
            alt="Institution Logo" 
            className="h-16 w-auto object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-600">
              Please read and accept all terms before proceeding
            </p>
          </div>
        </div>
      </div>

      {/* Terms List - Scrollable with hidden scrollbar */}
      <div className="terms-container flex-grow overflow-y-auto px-8 py-6">
        <div className="space-y-3 max-w-4xl">
          {terms.map((term) => {
            const isAccepted = acceptedTerms.has(term.id);
            return (
              <div
                key={term.id}
                onClick={() => toggleTerm(term.id)}
                className={`
                  flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-150
                  ${isAccepted 
                    ? 'bg-blue-50 border-blue-400' 
                    : 'bg-white border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                {isAccepted ? (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm leading-relaxed ${isAccepted ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                  {term.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-gray-300 px-8 py-6 bg-white flex items-center justify-between flex-shrink-0">
        <p className="text-sm text-gray-700 font-medium">
          {acceptedTerms.size} of {terms.length} terms accepted
        </p>
        <Button
          onClick={handleNext}
          disabled={!allAccepted}
          className={`
            px-8 py-3 rounded-lg font-semibold text-base transition-all duration-200
            ${allAccepted 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Next →
        </Button>
      </div>
    </div>
  );
};


export default TermsAndConditions;
