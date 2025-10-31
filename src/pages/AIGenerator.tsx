import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Sparkles, X, FileUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AIGenerator = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        window.innerHeight * 0.4
      ) + "px";
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/question-results", {
          state: {
            query: searchQuery,
            files: uploadedFiles.map((f) => f.name),
          },
        });
      }, 2500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="min-h-screen w-screen relative overflow-hidden flex flex-col font-poppins select-none"
      style={{
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 10%, #90caf9 20%, #ffffff 30%, #e1f5fe 40%, #b3e5fc 50%, #ffffff 60%, #e0f7fa 70%, #b2ebf2 80%, #ffffff 90%, #e1f5fe 100%)",
        backgroundSize: "400% 400%",
        animation: "glossyFlow 20s ease infinite",
        userSelect: "none",
      }}
    >
      {/* Premium Glossy Overlay */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255, 255, 255, 0.95) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(129, 212, 250, 0.2) 0%, transparent 60%)",
          backdropFilter: "blur(120px)",
        }}
      />

      {/* Animated Premium Glossy Spots */}
      <div
        className="absolute -top-20 -left-20 w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full opacity-35 blur-3xl pointer-events-none select-none"
        style={{
          background:
            "radial-gradient(circle, rgba(100, 181, 246, 0.7) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite",
          userSelect: "none",
        }}
      />
      <div
        className="absolute top-1/3 -right-20 sm:-right-32 w-60 h-60 sm:w-80 sm:h-80 rounded-full opacity-30 blur-3xl pointer-events-none select-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%)",
          animation: "float 12s ease-in-out infinite reverse",
          userSelect: "none",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 w-60 h-60 sm:w-96 sm:h-96 rounded-full opacity-25 blur-3xl pointer-events-none select-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129, 212, 250, 0.6) 0%, transparent 70%)",
          animation: "float 14s ease-in-out infinite",
          userSelect: "none",
        }}
      />

      {/* Premium Loading Overlay */}
      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl font-poppins select-none overflow-hidden p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(240, 248, 255, 0.98) 0%, rgba(227, 242, 253, 0.98) 25%, rgba(187, 222, 251, 0.98) 50%, rgba(144, 202, 249, 0.98) 75%, rgba(227, 242, 253, 0.98) 100%)",
            backgroundSize: "400% 400%",
            animation: "glossyFlow 8s ease infinite",
            userSelect: "none",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.7) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="text-center relative z-10 space-y-4 sm:space-y-6 select-none max-w-sm">
            <div
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mx-auto"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(240, 248, 255, 0.96) 100%)",
                border: "2.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow:
                  "0 30px 80px rgba(100, 181, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.95) inset, inset 0 1px 0 rgba(255, 255, 255, 1)",
                userSelect: "none",
              }}
            >
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.9) 50%, transparent 70%)",
                  animation: "shine 2.5s infinite",
                  userSelect: "none",
                }}
              />

              <img
                src="/result.gif"
                alt="Loading"
                className="w-full h-full object-contain relative z-10 select-none pointer-events-none"
                style={{ userSelect: "none" }}
              />
            </div>

            <div className="space-y-2 sm:space-y-3 select-none">
              <p
                className="text-lg sm:text-2xl font-black tracking-tight drop-shadow-lg font-poppins select-none"
                style={{
                  background: "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  userSelect: "none",
                }}
              >
                Generating Your Questions
              </p>

              <p className="text-xs sm:text-sm text-blue-700 font-medium select-none">
                Our AI is crafting personalized questions for you...
              </p>
            </div>

            <div className="flex justify-center gap-2 select-none">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full select-none"
                  style={{
                    background: "linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)",
                    animation: `pulse 1.6s cubic-bezier(0.4, 0, 0.6, 1) ${i * 0.25}s infinite`,
                    boxShadow: "0 0 12px rgba(100, 181, 246, 0.6)",
                    userSelect: "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-5 relative z-10 min-h-screen flex flex-col select-none overflow-hidden">
        {/* Premium Header Section */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 select-none flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="gap-2 bg-white/50 backdrop-blur-xl border-white/70 hover:bg-white/70 shadow-lg text-slate-700 hover:text-slate-900 transition-all duration-300 text-xs px-3 sm:px-4 py-1.5 sm:py-2 font-poppins font-semibold rounded-lg sm:rounded-xl hover:shadow-2xl select-none"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        {/* Premium Logo Section */}
        <div className="flex-grow flex items-center justify-center select-none">
          <div className="relative select-none">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30 select-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(100, 181, 246, 0.5) 0%, transparent 70%)",
                width: "140px",
                height: "140px",
                animation: "float 8s ease-in-out infinite",
                userSelect: "none",
              }}
            />
            <img
              src="/image-removebg-preview (27).png"
              alt="TestIONX Logo"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 hover:scale-105 select-none pointer-events-none"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(100, 181, 246, 0.3))",
                userSelect: "none",
              }}
            />
          </div>
        </div>

        {/* Premium Bottom Section */}
        <div className="max-w-5xl mx-auto w-full pb-3 sm:pb-4 space-y-2.5 sm:space-y-3 select-none flex-shrink-0">
          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center px-2 sm:px-4 select-none overflow-y-auto max-h-16">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-emerald-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md border border-emerald-300/60 font-poppins backdrop-blur-sm transition-all duration-200 hover:shadow-lg select-none flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
                    border: "1.5px solid rgba(16, 185, 129, 0.3)",
                    userSelect: "none",
                  }}
                >
                  <FileUp className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate max-w-xs select-none">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="hover:bg-emerald-200/50 rounded-full p-0.5 transition-all duration-200 ml-0.5 sm:ml-1 select-none flex-shrink-0"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Premium AI Search Bar - Responsive */}
          <div
            className={`relative rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl font-poppins transition-all duration-300 select-none flex flex-col ${
              isFocused ? "ring-2 ring-blue-400/50" : ""
            }`}
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(227, 242, 253, 0.95) 100%)",
              border: isFocused
                ? "2px solid rgba(33, 150, 243, 0.6)"
                : "2px solid rgba(255, 255, 255, 0.85)",
              boxShadow: isFocused
                ? "0 25px 70px rgba(33, 150, 243, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.85) inset"
                : "0 20px 60px rgba(33, 150, 243, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.85) inset",
              userSelect: "none",
              maxHeight: isFocused ? "calc(50vh - 20px)" : "auto",
            }}
          >
            {/* Textarea - Takes remaining space */}
            <div
              className="flex-grow overflow-y-auto p-2 sm:p-3"
              style={{
                maxHeight: isFocused ? "calc(50vh - 70px)" : "auto",
              }}
            >
              <textarea
                ref={textareaRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Ask AI to generate questions..."
                className="w-full resize-none text-blue-900 placeholder:text-blue-400/70 outline-none bg-transparent text-xs sm:text-sm font-semibold min-h-[36px] sm:min-h-[42px] overflow-y-auto leading-relaxed font-poppins transition-all duration-200 select-none"
                style={{
                  userSelect: "none",
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(100, 181, 246, 0.8) transparent",
                }}
              />
            </div>

            {/* Buttons - Always at Bottom */}
            <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-3 border-t border-blue-100/50 select-none flex-shrink-0 bg-blue-50/30">
              {/* Upload Button */}
              <label className="cursor-pointer flex-shrink-0 group select-none">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
                  multiple
                />
                <div
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl select-none"
                  style={{
                    background: uploadedFiles.length > 0
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      : "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
                    userSelect: "none",
                  }}
                >
                  <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white select-none" />
                </div>
              </label>

              {/* Generate Button */}
              <Button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isLoading}
                className="flex-shrink-0 h-9 sm:h-10 px-4 sm:px-6 rounded-full shadow-xl transition-all duration-300 hover:scale-105 font-bold text-xs gap-1.5 sm:gap-2 border-0 font-poppins select-none ml-auto"
                style={{
                  background: searchQuery.trim()
                    ? "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)"
                    : "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
                  boxShadow: searchQuery.trim()
                    ? "0 12px 35px rgba(33, 150, 243, 0.55)"
                    : "none",
                  cursor: searchQuery.trim() ? "pointer" : "not-allowed",
                  opacity: isLoading ? 0.7 : 1,
                  userSelect: "none",
                  padding: "0.5rem 1rem",
                }}
              >
                <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden sm:inline">Generate</span>
              </Button>
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-center text-xs sm:text-sm text-blue-700/80 font-semibold drop-shadow-sm font-poppins tracking-wide select-none px-2">
            📎 Upload (optional) • 💬 Describe your needs
          </p>
        </div>
      </div>

      {/* Scrollbar Styling - Hidden Globally */}
      <style>{`
        * {
          user-select: none;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        *::-webkit-scrollbar {
          display: none;
        }

        html, body {
          overflow: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }

        @keyframes glossyFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-40px) translateX(25px); }
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.25);
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .container {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default AIGenerator;
