import { useState } from "react";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Eye, 
  Send, 
  Calendar, 
  Clock, 
  Shield, 
  ImageIcon, 
  Video,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
  Timer,
  Zap,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  type: "SAQ" | "MCQ";
  options: string[];
  multipleAnswers: boolean;
  marks: number;
  correctAnswer: string;
  image?: string;
  video?: string;
  timeLimit?: number;
}

interface SecuritySettings {
  preventMinimize: boolean;
  preventBrowserSwitch: boolean;
  enableCamera: boolean;
  preventCopyPaste: boolean;
  fullScreenMode: boolean;
}

const QuestionPaperCreator = () => {
  const navigate = useNavigate();
  
  const [examName, setExamName] = useState("");
  const [examSubtitle, setExamSubtitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showDateTimeBar, setShowDateTimeBar] = useState(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  const [totalTimeLimit, setTotalTimeLimit] = useState<number>(0);
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "",
      type: "SAQ",
      options: [""],
      multipleAnswers: false,
      marks: 1,
      correctAnswer: "",
      timeLimit: 0,
    },
  ]);
  
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    preventMinimize: false,
    preventBrowserSwitch: false,
    enableCamera: false,
    preventCopyPaste: false,
    fullScreenMode: false,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [validationError, setValidationError] = useState("");

  const rooms = [
    { id: "1", name: "Class 10-A" },
    { id: "2", name: "Class 10-B" },
    { id: "3", name: "Class 11-A" },
    { id: "4", name: "Mathematics Group" },
    { id: "5", name: "Science Group" },
  ];

  const validateForm = () => {
    if (!examName.trim()) {
      setValidationError("Exam name is required!");
      return false;
    }
    if (!examSubtitle.trim()) {
      setValidationError("Exam subtitle is required!");
      return false;
    }
    if (!startDate) {
      setValidationError("Start date is required!");
      return false;
    }
    if (!startTime) {
      setValidationError("Start time is required!");
      return false;
    }
    if (!endDate) {
      setValidationError("End date is required!");
      return false;
    }
    if (!endTime) {
      setValidationError("End time is required!");
      return false;
    }
    setValidationError("");
    return true;
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      type: "SAQ",
      options: [""],
      multipleAnswers: false,
      marks: 1,
      correctAnswer: "",
      timeLimit: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
          : q
      )
    );
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const toggleRoom = (roomId: string) => {
    if (selectedRooms.includes(roomId)) {
      setSelectedRooms(selectedRooms.filter((id) => id !== roomId));
    } else {
      setSelectedRooms([...selectedRooms, roomId]);
    }
  };

  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    } else {
      setTimeout(() => setValidationError(""), 3000);
    }
  };

  const handlePublishClick = () => {
    if (validateForm()) {
      setShowPublishModal(true);
    } else {
      setTimeout(() => setValidationError(""), 3000);
    }
  };

  const handlePublish = () => {
    setShowPublishModal(false);
    toast.success("Exam published successfully!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen premium-gradient relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Validation Error */}
      {validationError && (
        <div className="fixed top-20 right-6 z-50 animate-slide-down">
          <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-3 glow-effect border border-red-400/50 shadow-xl">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <span className="font-semibold text-red-600 text-sm">{validationError}</span>
          </div>
        </div>
      )}

      {/* Premium Header */}
      <div className="sticky top-0 z-40 glass border-b border-white/20 shadow-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBackClick}
            className="gap-2 glass-card hover:glow-effect hover:scale-105 active:scale-95 transition-all font-semibold px-4 py-2.5 h-auto border-blue-200/60 text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="text-center flex-1 mx-8">
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent flex items-center gap-2 justify-center">
              <Sparkles className="h-6 w-6 text-blue-500" />
              Question Creator
            </h1>
            <p className="text-xs text-blue-600/70 font-medium mt-1 tracking-wide">Craft Premium Exams with AI Power</p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handlePreview}
              variant="outline"
              className="gap-2 glass-card hover:glow-effect hover:scale-105 active:scale-95 transition-all font-semibold text-sm px-4 py-2.5 h-auto border-blue-200/60 text-blue-700"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button
              onClick={handlePublishClick}
              className="gap-2 glass-button hover:glow-effect hover:scale-105 active:scale-95 transition-all font-semibold text-sm px-4 py-2.5 h-auto text-white border-0 shadow-lg"
            >
              <Send className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left Sidebar - Settings */}
          <div className="col-span-3">
            <div className="sticky top-24 glass-card p-6 rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl hover:glow-effect transition-all duration-300 max-h-[calc(100vh-140px)] overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl glass-button flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-blue-700">Exam Settings</h2>
                  <p className="text-xs text-blue-500/60 font-medium">Configure your exam</p>
                </div>
              </div>

              <div className="space-y-4 overflow-y-auto pr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-2.5 flex items-center gap-1 uppercase tracking-wider">
                    Exam Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="e.g., Mid-Term Maths"
                    className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/30 outline-none glass font-medium transition-all text-sm placeholder-blue-400/50 focus:glow-effect shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-700 mb-2.5 flex items-center gap-1 uppercase tracking-wider">
                    Exam Subtitle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={examSubtitle}
                    onChange={(e) => setExamSubtitle(e.target.value)}
                    placeholder="e.g., Chapter 1-5"
                    className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/30 outline-none glass font-medium transition-all text-sm placeholder-blue-400/50 focus:glow-effect shadow-md"
                  />
                </div>

                {/* Date & Time Section */}
                <div>
                  <button
                    onClick={() => setShowDateTimeBar(!showDateTimeBar)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl border border-blue-200/60 glass-card hover:glow-effect hover:scale-105 active:scale-95 transition-all text-sm shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold text-blue-700">Exam Schedule</span>
                      <span className="text-red-500 font-bold">*</span>
                    </div>
                    {showDateTimeBar ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />}
                  </button>

                  {showDateTimeBar && (
                    <div className="mt-3 p-4 rounded-xl glass-card border border-blue-100/50 animate-slide-down space-y-3 shadow-lg">
                      <div>
                        <label className="block text-xs font-semibold text-green-600 mb-2.5 flex items-center gap-1 uppercase tracking-wider">
                          <Clock className="h-3 w-3" />
                          Start Date & Time <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="px-3 py-2.5 rounded-lg border border-green-200/60 focus:border-green-400 focus:ring-2 focus:ring-green-300/30 outline-none glass font-medium text-xs shadow-md"
                          />
                          <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="px-3 py-2.5 rounded-lg border border-green-200/60 focus:border-green-400 focus:ring-2 focus:ring-green-300/30 outline-none glass font-medium text-xs shadow-md"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-red-600 mb-2.5 flex items-center gap-1 uppercase tracking-wider">
                          <Clock className="h-3 w-3" />
                          End Date & Time <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="px-3 py-2.5 rounded-lg border border-red-200/60 focus:border-red-400 focus:ring-2 focus:ring-red-300/30 outline-none glass font-medium text-xs shadow-md"
                          />
                          <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="px-3 py-2.5 rounded-lg border border-red-200/60 focus:border-red-400 focus:ring-2 focus:ring-red-300/30 outline-none glass font-medium text-xs shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-semibold text-purple-700 mb-2.5 flex items-center gap-1 uppercase tracking-wider">
                    <Timer className="h-3.5 w-3.5" />
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={totalTimeLimit}
                    onChange={(e) => setTotalTimeLimit(Number(e.target.value))}
                    placeholder="e.g., 120"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-purple-200/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-300/30 outline-none glass font-medium transition-all text-sm placeholder-purple-400/50 shadow-md"
                  />
                  {totalTimeLimit > 0 && (
                    <p className="text-xs text-purple-600 mt-2.5 font-semibold flex items-center gap-1.5 bg-purple-50/40 px-2.5 py-1.5 rounded-lg">
                      <Zap className="h-3 w-3" />
                      Auto-submit: {totalTimeLimit} min
                    </p>
                  )}
                </div>

                {/* Security Settings */}
                <div>
                  <button
                    onClick={() => setShowSecuritySettings(!showSecuritySettings)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl border border-blue-200/60 glass-card hover:glow-effect hover:scale-105 active:scale-95 transition-all text-sm shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold text-blue-700">Security</span>
                    </div>
                    {showSecuritySettings ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />}
                  </button>

                  {showSecuritySettings && (
                    <div className="mt-3 p-4 rounded-xl glass-card border border-blue-100/50 animate-slide-down space-y-2.5 shadow-lg">
                      {[
                        { key: 'preventMinimize', label: 'Prevent Minimize' },
                        { key: 'preventBrowserSwitch', label: 'Block Browser Switch' },
                        { key: 'enableCamera', label: 'Camera Monitor' },
                        { key: 'preventCopyPaste', label: 'Block Copy/Paste' },
                        { key: 'fullScreenMode', label: 'Force Fullscreen' },
                      ].map((setting) => (
                        <label 
                          key={setting.key}
                          className="flex items-center gap-3 p-2.5 rounded-lg glass-card border border-blue-100/50 hover:border-blue-300 cursor-pointer transition-all hover:glow-effect hover:scale-105 active:scale-95"
                        >
                          <input
                            type="checkbox"
                            checked={securitySettings[setting.key as keyof SecuritySettings]}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                [setting.key]: e.target.checked,
                              })
                            }
                            className="w-4 h-4 text-blue-500 rounded accent-blue-500"
                          />
                          <span className="text-xs text-blue-700 font-semibold">
                            {setting.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Generator Button */}
                <Button
                  onClick={() => navigate("/ai-generator")}
                  className="w-full gap-2 glow-effect font-semibold py-3 text-sm mt-6 glass-button text-white border-0 shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  AI Generator
                </Button>
              </div>
            </div>
          </div>

          {/* Middle Section - Questions */}
          <div className="col-span-6 max-h-[calc(100vh-160px)] overflow-y-auto pr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="space-y-4 pb-6">
              {questions.map((question, qIndex) => (
                <div
                  key={question.id}
                  className="glass-card p-6 rounded-2xl border border-blue-100/50 relative transition-all hover:glow-effect hover:shadow-2xl shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl glass-button flex items-center justify-center font-bold text-white text-sm shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        {qIndex + 1}
                      </div>
                      <span className="text-sm font-bold text-blue-700 tracking-tight">
                        Question {qIndex + 1}
                      </span>
                    </div>
                    {questions.length > 1 && (
                      <button
                        onClick={() => deleteQuestion(question.id)}
                        className="p-2 rounded-lg glass-card text-red-500 transition-all border border-red-200/60 hover:border-red-400 hover:glow-effect hover:scale-110 active:scale-95 shadow-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <textarea
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(question.id, "question", e.target.value)
                    }
                    placeholder="Enter your question here..."
                    className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/30 outline-none glass font-medium mb-4 resize-none transition-all text-sm placeholder-blue-400/50 focus:glow-effect shadow-md"
                    rows={3}
                  />

                  <div className="flex gap-2 mb-4">
                    <button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg glass-card text-blue-600 hover:glow-effect hover:scale-105 active:scale-95 text-xs font-semibold transition-all border border-blue-200/60 hover:border-blue-300 shadow-md">
                      <ImageIcon className="h-4 w-4" />
                      Image
                    </button>
                    <button className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg glass-card text-purple-600 hover:glow-effect hover:scale-105 active:scale-95 text-xs font-semibold transition-all border border-purple-200/60 hover:border-purple-300 shadow-md">
                      <Video className="h-4 w-4" />
                      Video
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => updateQuestion(question.id, "type", "SAQ")}
                      className={`py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200 ${
                        question.type === "SAQ"
                          ? "glass-button text-white border-0 shadow-lg hover:scale-105 active:scale-95"
                          : "glass-card text-blue-600 border border-blue-200/60 hover:border-blue-300 hover:scale-105 active:scale-95"
                      }`}
                    >
                      SAQ
                    </button>
                    <button
                      onClick={() => updateQuestion(question.id, "type", "MCQ")}
                      className={`py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200 ${
                        question.type === "MCQ"
                          ? "glass-button text-white border-0 shadow-lg hover:scale-105 active:scale-95"
                          : "glass-card text-blue-600 border border-blue-200/60 hover:border-blue-300 hover:scale-105 active:scale-95"
                      }`}
                    >
                      MCQ
                    </button>
                  </div>

                  {question.type === "MCQ" && (
                    <div className="mb-4 p-4 rounded-xl glass-card border border-blue-100/50 shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Options</span>
                        <label className="flex items-center gap-1.5 text-xs text-blue-600 glass-card px-3 py-1.5 rounded-lg border border-blue-200/60 cursor-pointer hover:glow-effect transition-all">
                          <input
                            type="checkbox"
                            checked={question.multipleAnswers}
                            onChange={(e) =>
                              updateQuestion(
                                question.id,
                                "multipleAnswers",
                                e.target.checked
                              )
                            }
                            className="w-3.5 h-3.5 text-blue-500 accent-blue-500"
                          />
                          <span className="font-semibold">Multiple Answers</span>
                        </label>
                      </div>

                      <div className="space-y-2.5">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex gap-2.5">
                            <span className="flex items-center justify-center w-9 h-9 rounded-lg glass-button text-white font-bold text-xs flex-shrink-0 shadow-md bg-gradient-to-br from-blue-500 to-blue-600">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                updateOption(question.id, optIndex, e.target.value)
                              }
                              placeholder={`Option ${optIndex + 1}`}
                              className="flex-1 px-4 py-2.5 rounded-lg border border-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/30 outline-none glass font-medium text-xs transition-all placeholder-blue-400/50 shadow-md"
                            />
                            {question.options.length > 1 && (
                              <button
                                onClick={() => removeOption(question.id, optIndex)}
                                className="p-2 rounded-lg glass-card text-red-500 border border-red-200/60 hover:border-red-400 transition-all hover:glow-effect hover:scale-110 active:scale-95 shadow-md"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => addOption(question.id)}
                        className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 glass-card px-3 py-2.5 rounded-lg hover:glow-effect transition-all border border-blue-200/60 hover:border-blue-300 hover:scale-105 active:scale-95 shadow-md"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Option
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-semibold text-blue-700 mb-2.5 uppercase tracking-wide">
                        Marks
                      </label>
                      <select
                        value={question.marks}
                        onChange={(e) =>
                          updateQuestion(question.id, "marks", Number(e.target.value))
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-blue-200/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-300/30 outline-none glass font-semibold transition-all text-xs shadow-md accent-blue-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mark) => (
                          <option key={mark} value={mark}>
                            {mark} Mark{mark !== 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-orange-700 mb-2.5 flex items-center gap-1 uppercase tracking-wide">
                        <Timer className="h-3 w-3" />
                        Time
                      </label>
                      <input
                        type="number"
                        value={question.timeLimit || 0}
                        onChange={(e) =>
                          updateQuestion(question.id, "timeLimit", Number(e.target.value))
                        }
                        placeholder="minutes"
                        min="0"
                        className="w-full px-4 py-2.5 rounded-xl border border-orange-200/60 focus:border-orange-400 focus:ring-2 focus:ring-orange-300/30 outline-none glass font-medium transition-all text-xs placeholder-orange-400/50 shadow-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-green-600 mb-2.5 flex items-center gap-1 uppercase tracking-wide">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Correct Answer
                    </label>
                    <input
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) =>
                        updateQuestion(question.id, "correctAnswer", e.target.value)
                      }
                      placeholder="Enter the correct answer..."
                      className="w-full px-4 py-2.5 rounded-xl border border-green-200/60 focus:border-green-400 focus:ring-2 focus:ring-green-300/30 outline-none glass font-medium transition-all text-xs placeholder-green-400/50 shadow-md"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addQuestion}
                className="w-full py-4 rounded-xl border-2 border-dashed border-blue-300/60 hover:border-blue-400 glass-card hover:glow-effect hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 text-blue-600 font-bold text-sm shadow-lg"
              >
                <div className="w-9 h-9 rounded-lg glass-button flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                Add Question
              </button>
            </div>
          </div>

          {/* Right Sidebar - Stats */}
          <div className="col-span-3">
            <div className="sticky top-24 glass-card p-4 rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl hover:glow-effect transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg glass-button flex items-center justify-center text-base shadow-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  📊
                </div>
                <div>
                  <h2 className="text-xs font-bold text-blue-700">Exam Stats</h2>
                  <p className="text-xs text-blue-500/60 font-medium leading-none">Overview</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg glass-card border border-blue-100/50 hover:glow-effect hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md">
                  <div className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-tight">Questions</div>
                  <div className="text-2xl font-black text-blue-700">{questions.length}</div>
                </div>

                <div className="p-3 rounded-lg glass-card border border-purple-100/50 hover:glow-effect hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md">
                  <div className="text-xs text-purple-600 font-semibold mb-1 uppercase tracking-tight">Total Marks</div>
                  <div className="text-2xl font-black text-purple-700">
                    {questions.reduce((sum, q) => sum + q.marks, 0)}
                  </div>
                </div>

                <div className="p-3 rounded-lg glass-card border border-pink-100/50 hover:glow-effect hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md">
                  <div className="text-xs text-pink-600 font-semibold mb-1 uppercase tracking-tight">MCQs</div>
                  <div className="text-2xl font-black text-pink-700">
                    {questions.filter((q) => q.type === "MCQ").length}
                  </div>
                </div>

                <div className="p-3 rounded-lg glass-card border border-cyan-100/50 hover:glow-effect hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md">
                  <div className="text-xs text-cyan-600 font-semibold mb-1 uppercase tracking-tight">SAQs</div>
                  <div className="text-2xl font-black text-cyan-700">
                    {questions.filter((q) => q.type === "SAQ").length}
                  </div>
                </div>

                {totalTimeLimit > 0 && (
                  <div className="p-3 rounded-lg glass-card border border-orange-100/50 hover:glow-effect hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md">
                    <div className="text-xs text-orange-600 font-semibold mb-1 flex items-center gap-1 uppercase tracking-tight">
                      <Timer className="h-3 w-3" />
                      Duration
                    </div>
                    <div className="text-2xl font-black text-orange-700">{totalTimeLimit}</div>
                    <div className="text-xs text-orange-500/70 font-medium mt-0.5">minutes</div>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 rounded-lg glass-card border border-amber-100/50 shadow-md">
                <h3 className="text-xs font-bold text-amber-700 mb-2.5 flex items-center gap-1.5 uppercase tracking-tight">
                  <span>💡</span> Tips
                </h3>
                <ul className="text-xs text-amber-600 space-y-1.5 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    <span>Fill all required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    <span>Write clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                    <span>Set answers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-blue-900/40 p-4 animate-slide-up">
          <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl glass-card shadow-2xl border border-white/20" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="sticky top-0 glass-button backdrop-blur-lg p-5 border-b border-white/20 flex items-center justify-between rounded-t-2xl z-10 shadow-lg">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-white" />
                <h2 className="text-lg font-bold text-white">Preview</h2>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-lg hover:bg-white/20 text-white border border-white/30 transition-all hover:scale-110 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center mb-8 p-6 rounded-2xl glass-card border border-blue-200/50 glow-effect shadow-lg">
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {examName || "Untitled Exam"}
                </h1>
                <p className="text-sm text-blue-600 font-semibold mb-4">
                  {examSubtitle || "No subtitle"}
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-blue-600 font-semibold flex-wrap mb-4">
                  {startDate && startTime && (
                    <div className="flex items-center gap-1.5 glass-card px-3.5 py-1.5 rounded-lg border border-green-200/50 shadow-md">
                      <span className="text-green-500 text-sm">▶</span>
                      <span>{startDate} {startTime}</span>
                    </div>
                  )}
                  {endDate && endTime && (
                    <div className="flex items-center gap-1.5 glass-card px-3.5 py-1.5 rounded-lg border border-red-200/50 shadow-md">
                      <span className="text-red-500 text-sm">⏹</span>
                      <span>{endDate} {endTime}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="text-xs glass-button text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    Marks: {questions.reduce((sum, q) => sum + q.marks, 0)}
                  </span>
                  {totalTimeLimit > 0 && (
                    <span className="text-xs glass-button text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600">
                      <Timer className="h-3 w-3" />
                      {totalTimeLimit} min
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={q.id} className="p-4 rounded-xl glass-card border border-blue-100/50 hover:glow-effect transition-all shadow-md">
                    <div className="flex gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg glass-button flex items-center justify-center font-bold text-white text-xs shadow-md flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-blue-700 mb-2.5 text-sm leading-relaxed">
                          {q.question || "No question"}
                        </p>
                        <div className="flex gap-2 flex-wrap text-xs">
                          <span className="glass-card text-blue-600 px-3 py-1.5 rounded-full font-semibold border border-blue-200/50 shadow-sm">
                            {q.marks} Mark{q.marks !== 1 ? 's' : ''}
                          </span>
                          {q.timeLimit && q.timeLimit > 0 && (
                            <span className="glass-card text-orange-600 px-3 py-1.5 rounded-full font-semibold flex items-center gap-1 border border-orange-200/50 shadow-sm">
                              <Timer className="h-3 w-3" />
                              {q.timeLimit} min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {q.type === "MCQ" && (
                      <div className="ml-11 space-y-2">
                        {q.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-lg glass-card text-xs border border-blue-100/50 shadow-sm">
                            <input
                              type={q.multipleAnswers ? "checkbox" : "radio"}
                              className="w-4 h-4"
                              disabled
                            />
                            <span className="w-6 h-6 rounded-lg glass-button text-white font-bold flex items-center justify-center text-xs shadow-sm">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-blue-700 font-medium">{opt || `Option ${i + 1}`}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {q.type === "SAQ" && (
                      <div className="ml-11">
                        <div className="border-2 border-dashed border-blue-200/60 rounded-lg p-4 glass-card shadow-sm">
                          <span className="text-xs text-blue-500/60 font-semibold">Answer space (SAQ)</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-blue-900/40 p-4 animate-slide-up">
          <div className="max-w-2xl w-full rounded-2xl glass-card shadow-2xl border border-white/20">
            <div className="p-6 border-b border-blue-200/50 shadow-md">
              <div className="flex items-center gap-3 mb-1">
                <Send className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-bold text-blue-700">Publish Exam</h2>
              </div>
              <p className="text-xs text-blue-500/70 font-semibold tracking-wide">Select rooms to share this exam</p>
            </div>

            <div className="p-6 max-h-64 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="space-y-2.5">
                {rooms.map((room) => (
                  <label
                    key={room.id}
                    className="flex items-center gap-3 p-3.5 rounded-xl glass-card border border-blue-200/60 hover:border-blue-300 cursor-pointer transition-all hover:glow-effect hover:scale-105 active:scale-95 shadow-md"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRooms.includes(room.id)}
                      onChange={() => toggleRoom(room.id)}
                      className="w-4 h-4 text-blue-500 accent-blue-500"
                    />
                    <span className="font-semibold text-blue-700 text-sm">{room.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-blue-200/50 flex gap-3 justify-end shadow-md">
              <Button
                variant="outline"
                className="glass-card border-blue-200/60 text-blue-700 font-semibold hover:glow-effect transition-all hover:scale-105 active:scale-95"
                onClick={() => setShowPublishModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePublish}
                disabled={selectedRooms.length === 0}
                className="glass-button text-white border-0 font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publish to {selectedRooms.length} room{selectedRooms.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPaperCreator;
