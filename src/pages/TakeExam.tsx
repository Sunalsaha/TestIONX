import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, Pause } from "lucide-react";
import { toast } from "sonner";



interface Question {
  id: string;
  question: string;
  type: "SAQ" | "MCQ";
  options?: string[];
  marks: number;
  timeLimit?: number;
  image?: string;
  video?: string;
}



const TakeExam = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const questions: Question[] = [
    {
      id: "1",
      question: "What is the derivative of x² + 3x + 2?",
      type: "SAQ",
      marks: 5,
      timeLimit: 3,
    },
    {
      id: "2",
      question: "Which of the following is a prime number?",
      type: "MCQ",
      options: ["4", "6", "7", "8"],
      marks: 2,
      timeLimit: 2,
    },
    {
      id: "3",
      question: "Solve the equation: 2x + 5 = 15",
      type: "SAQ",
      marks: 3,
      timeLimit: 4,
    },
  ];



  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [mainTimer, setMainTimer] = useState(7200);
  const [questionTimer, setQuestionTimer] = useState(
    (questions[0]?.timeLimit || 0) * 60
  );
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(300); // 5 minutes break
  const [mainTimerFrozen, setMainTimerFrozen] = useState(false);
  const [questionTimerFrozen, setQuestionTimerFrozen] = useState(false);
  const [showOneMinWarning, setShowOneMinWarning] = useState(false);
  const [oneMinWarningShown, setOneMinWarningShown] = useState(false);



  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;



  // Play alert sound
  const playAlertSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  // Play warning sound (higher frequency)
  const playWarningSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 1200;
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.8);
  };



  // Handle window visibility change during break
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isOnBreak && document.hidden) {
        toast.error("You left the exam during break! Exam will be auto-submitted.", {
          duration: 5000,
        });
        playAlertSound();
        setTimeout(() => {
          handleAutoSubmit();
        }, 2000);
      }
    };


    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isOnBreak) {
        e.preventDefault();
        e.returnValue = "";
        toast.error("You cannot exit during break!");
        playAlertSound();
        return false;
      }
    };


    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);


    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isOnBreak]);



  // Check for 1 minute warning
  useEffect(() => {
    if (mainTimer === 60 && !oneMinWarningShown && !isOnBreak) {
      setShowOneMinWarning(true);
      setOneMinWarningShown(true);
      playWarningSound();
    }
  }, [mainTimer, oneMinWarningShown, isOnBreak]);



  // Main timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!mainTimerFrozen) {
        setMainTimer((prev) => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [mainTimerFrozen]);



  // Question timer reset
  useEffect(() => {
    if (currentQuestion.timeLimit) {
      setQuestionTimer(currentQuestion.timeLimit * 60);
    }
  }, [currentQuestionIndex]);



  // Question timer
  useEffect(() => {
    if (currentQuestion.timeLimit && questionTimer > 0 && !questionTimerFrozen) {
      const interval = setInterval(() => {
        setQuestionTimer((prev) => {
          if (prev <= 1) {
            toast.warning("Question time expired! Moving to next question.");
            if (!isLastQuestion) {
              handleNext();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [questionTimer, currentQuestionIndex, questionTimerFrozen]);



  // Break timer
  useEffect(() => {
    if (isOnBreak && breakTime > 0) {
      const interval = setInterval(() => {
        setBreakTime((prev) => {
          if (prev <= 1) {
            toast.success("Break time over! Resuming exam...");
            setIsOnBreak(false);
            setMainTimerFrozen(false);
            setQuestionTimerFrozen(false);
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOnBreak, breakTime]);



  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };



  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };



  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };



  const handleAutoSubmit = () => {
    toast.error("Time's up! Exam auto-submitted.");
    setTimeout(() => {
      navigate(`/exam/${examId}/submitted`);
    }, 2000);
  };



  const handleSubmit = () => {
    setShowSubmitModal(true);
  };



  const handleBreak = () => {
    setIsOnBreak(true);
    setMainTimerFrozen(true);
    setQuestionTimerFrozen(true);
    setBreakTime(300); // Reset to 5 minutes
    toast.info("Break started. Timers are frozen.");
  };



  const handleResumeExam = () => {
    setIsOnBreak(false);
    setMainTimerFrozen(false);
    setQuestionTimerFrozen(false);
    toast.success("Exam resumed!");
  };

  const handleContinueExam = () => {
    setShowOneMinWarning(false);
    toast.info("Continue with your exam.");
  };



  const confirmSubmit = () => {
    toast.success("Exam submitted successfully!");
    setTimeout(() => {
      navigate(`/exam/${examId}/submitted`);
    }, 1500);
  };



  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden select-none">
      <style>{`
        * {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        textarea, input[type="text"], input[type="radio"] {
          user-select: text !important;
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
        }
        @keyframes pulse-warning {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-warning {
          animation: pulse-warning 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>



      {/* Top Bar - Fixed Height */}
      <div className={`${mainTimer <= 60 && !isOnBreak ? 'bg-red-600' : 'bg-slate-800'} text-white px-6 py-3 flex items-center justify-between border-b-2 ${mainTimer <= 60 && !isOnBreak ? 'border-red-700' : 'border-slate-900'} flex-shrink-0 transition-colors duration-300`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${mainTimer <= 60 && !isOnBreak ? 'animate-pulse' : ''}`} />
            <span className="text-sm font-semibold">Time:</span>
            <span className={`font-mono text-base font-bold ${mainTimer <= 60 && !isOnBreak ? 'animate-pulse' : ''}`}>{formatTime(mainTimer)}</span>
          </div>
          {currentQuestion.timeLimit && (
            <>
              <div className="w-px h-5 bg-slate-600"></div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold">Question:</span>
                <span className="font-mono text-base font-bold text-amber-400">{formatTime(questionTimer)}</span>
              </div>
            </>
          )}
        </div>
        <div className="text-sm font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>



      {/* Main Content - Flexible Height */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col p-8 overflow-auto">
          {/* Question Header */}
          <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-slate-200 flex-shrink-0">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 border-2 border-slate-800 flex items-center justify-center font-bold text-xl text-slate-900 flex-shrink-0">
                {currentQuestionIndex + 1}
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {currentQuestion.type === "MCQ" ? "Multiple Choice Question" : "Short Answer Question"}
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>
            </div>
            <div className="text-sm font-bold text-slate-900 border-2 border-slate-800 px-4 py-2 flex-shrink-0">
              [{currentQuestion.marks} Mark{currentQuestion.marks > 1 ? "s" : ""}]
            </div>
          </div>



          {/* Image/Video */}
          {currentQuestion.image && (
            <div className="mb-6 border-2 border-slate-300 p-2 flex-shrink-0">
              <img
                src={currentQuestion.image}
                alt="Question diagram"
                className="w-full max-h-64 object-contain"
              />
            </div>
          )}



          {currentQuestion.video && (
            <div className="mb-6 border-2 border-slate-300 p-2 flex-shrink-0">
              <video
                src={currentQuestion.video}
                controls
                className="w-full max-h-64"
              />
            </div>
          )}



          {/* Answer Section - Takes remaining space */}
          <div className="flex-1 flex flex-col min-h-0">
            {currentQuestion.type === "SAQ" ? (
              <div className="flex flex-col h-full">
                <p className="text-sm font-semibold text-slate-700 mb-3 flex-shrink-0">
                  Write your answer below:
                </p>
                <div className="flex-1 border-2 border-slate-300 focus-within:border-slate-500 transition-colors flex flex-col">
                  <textarea
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Write your answer here..."
                    className="w-full h-full px-4 py-3 outline-none resize-none text-slate-900 bg-white select-text"
                    style={{ lineHeight: "2" }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-700 mb-4">
                  Select the correct answer:
                </p>
                {currentQuestion.options?.map((option, index) => (
                  <label
                    key={index}
                    className={`
                      flex items-start gap-3 p-4 border-2 cursor-pointer transition-all
                      ${
                        answers[currentQuestion.id] === option
                          ? "border-slate-800 bg-slate-50"
                          : "border-slate-300 hover:border-slate-400 bg-white"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="mt-1 w-4 h-4 text-slate-900 accent-slate-900"
                    />
                    <div className="flex items-start gap-3 flex-grow">
                      <span className="w-8 h-8 border-2 border-slate-800 flex items-center justify-center font-bold text-sm text-slate-900 flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-base text-slate-900 leading-relaxed pt-0.5">
                        {option}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>



        {/* Bottom Bar - Fixed Height */}
        <div className="border-t-2 border-slate-200 bg-slate-50 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div className="text-sm text-slate-600">
            <span className="font-semibold">Answered:</span> {answeredCount} / {questions.length}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleBreak}
              disabled={isOnBreak}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded flex items-center gap-2 disabled:opacity-50"
            >
              <Pause className="w-4 h-4" />
              Break
            </Button>
            {!isLastQuestion ? (
              <Button
                onClick={handleNext}
                disabled={isOnBreak}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded disabled:opacity-50"
              >
                Next Question →
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isOnBreak}
                className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded disabled:opacity-50"
              >
                Submit Exam
              </Button>
            )}
          </div>
        </div>
      </div>



      {/* 1 Minute Warning Modal */}
      {showOneMinWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="max-w-md w-full bg-white border-4 border-red-600 shadow-2xl rounded-lg overflow-hidden">
            <div className="bg-red-600 p-6 text-center border-b-2 border-red-700 animate-pulse-warning">
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide">⏰ Time Alert</h2>
            </div>
            <div className="p-12 text-center">
              <div className="mb-8">
                <AlertCircle className="w-20 h-20 text-red-600 mx-auto mb-4 animate-pulse" />
                <p className="text-2xl font-bold text-red-600 mb-2">
                  Only 1 Minute Left!
                </p>
                <p className="text-sm text-slate-600">
                  Please wrap up your exam.
                </p>
              </div>
              <div className="bg-red-100 border-2 border-red-300 p-6 mb-8 rounded">
                <p className="text-lg font-semibold text-red-700">
                  Time Remaining: {formatTime(mainTimer)}
                </p>
                <p className="text-xs text-red-600 mt-2">
                  Submit your exam before time runs out
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleContinueExam}
                  className="flex-1 py-4 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded"
                >
                  Continue Exam
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                >
                  Submit Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Break Modal - Overlay */}
      {isOnBreak && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="max-w-md w-full bg-white border-4 border-orange-600 shadow-2xl rounded-lg overflow-hidden animate-pulse">
            <div className="bg-orange-600 p-6 text-center border-b-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide">On Break</h2>
            </div>
            <div className="p-12 text-center">
              <div className="mb-8">
                <Pause className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  Exam is Paused
                </p>
                <p className="text-sm text-slate-600">
                  All timers are frozen. Take a break!
                </p>
              </div>
              <div className="bg-orange-100 border-2 border-orange-300 p-6 mb-8 rounded">
                <p className="text-4xl font-bold text-orange-600 font-mono">
                  {formatTime(breakTime)}
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  Remaining break time
                </p>
              </div>
              <div className="bg-red-50 border-2 border-red-200 p-4 mb-6 rounded">
                <AlertCircle className="w-5 h-5 text-red-600 mx-auto mb-2" />
                <p className="text-xs text-red-700 font-semibold">
                  ⚠️ Do not exit the browser or minimize the window
                </p>
                <p className="text-xs text-red-600 mt-1">
                  If you exit, the exam will be auto-submitted with sound alert
                </p>
              </div>
              <Button
                onClick={handleResumeExam}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded"
              >
                Resume Exam
              </Button>
            </div>
          </div>
        </div>
      )}



      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60">
          <div className="max-w-md w-full bg-white border-4 border-slate-800 shadow-2xl">
            <div className="bg-slate-800 p-6 text-center border-b-2 border-slate-900">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Confirm Submission</h2>
            </div>
            <div className="p-8">
              <div className="text-center mb-6">
                <p className="text-slate-900 mb-4 text-lg font-semibold">
                  Are you sure you want to submit?
                </p>
                <div className="bg-slate-100 border-2 border-slate-300 p-4 mb-4">
                  <p className="text-sm text-slate-700">
                    Questions Answered: <span className="font-bold text-slate-900">{answeredCount} / {questions.length}</span>
                  </p>
                </div>
                <p className="text-sm text-slate-600">
                  Once submitted, you cannot modify your answers.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowSubmitModal(false)}
                  variant="outline"
                  className="flex-1 py-4 font-semibold border-2 border-slate-800 hover:bg-slate-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmSubmit}
                  className="flex-1 py-4 font-bold bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Confirm & Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}


      <audio ref={audioRef} />
    </div>
  );
};



export default TakeExam;
