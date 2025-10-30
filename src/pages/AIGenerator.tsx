import { useState } from "react";
import { ArrowLeft, Upload, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AIGenerator = () => {
  const navigate = useNavigate();
  const [selectedMarks, setSelectedMarks] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const marksOptions = [1, 2, 3, 4, 5];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/question-results", { 
          state: { 
            query: searchQuery, 
            marks: selectedMarks,
            files: uploadedFiles.map(f => f.name)
          } 
        });
      }, 1000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 10%, #90caf9 20%, #ffffff 30%, #e1f5fe 40%, #b3e5fc 50%, #ffffff 60%, #e0f7fa 70%, #b2ebf2 80%, #ffffff 90%, #e1f5fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'glossyFlow 15s ease infinite'
      }}
    >
      {/* Glossy overlay effect */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.9) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(129, 212, 250, 0.3) 0%, transparent 50%)',
          backdropFilter: 'blur(100px)'
        }}
      />

      {/* Animated glossy spots */}
      <div 
        className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(100, 181, 246, 0.6) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute top-1/3 right-20 w-80 h-80 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse'
        }}
      />
      <div 
        className="absolute bottom-32 left-1/4 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(129, 212, 250, 0.5) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite'
        }}
      />

      {/* Loading Overlay - Whiteish Blue */}
      {isLoading && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(240, 248, 255, 0.98) 0%, rgba(227, 242, 253, 0.98) 25%, rgba(187, 222, 251, 0.98) 50%, rgba(144, 202, 249, 0.98) 75%, rgba(227, 242, 253, 0.98) 100%)',
            backgroundSize: '400% 400%',
            animation: 'glossyFlow 8s ease infinite'
          }}
        >
          {/* Subtle glossy overlay for depth */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />
          
          <div className="text-center relative z-10">
            <div 
              className="w-64 h-64 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 248, 255, 0.95) 100%)',
                border: '2px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 25px 60px rgba(100, 181, 246, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.9) inset'
              }}
            >
              {/* Animated shine effect */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.8) 50%, transparent 70%)',
                  animation: 'shine 2s infinite'
                }}
              />
              
              <img 
                src="/5cf67fc8b00a1-unscreen.gif" 
                alt="Loading" 
                className="w-full h-full object-contain relative z-10"
              />
            </div>
            <p 
              className="mt-6 text-lg font-bold drop-shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Generating Questions...
            </p>
            
            {/* Loading dots animation */}
            <div className="flex justify-center gap-2 mt-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 100%)',
                    animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 relative z-10 flex-grow flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="gap-2 bg-white/40 backdrop-blur-xl border-white/60 hover:bg-white/60 shadow-lg text-slate-700 hover:text-slate-900 transition-all duration-300 text-sm px-4 py-2"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Dashboard
          </Button>
          
          <div 
            className="px-5 py-2 rounded-2xl shadow-xl backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(227, 242, 253, 0.95) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 15px 40px rgba(100, 181, 246, 0.3)'
            }}
          >
            <h1 className="text-xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              AI Question Generator
            </h1>
          </div>

          <div className="w-24"></div>
        </div>

        {/* Spacer to push search bar to bottom */}
        <div className="flex-grow"></div>

        {/* Bottom Section with Marks and Search Bar */}
        <div className="max-w-4xl mx-auto w-full pb-6">
          {/* Compact Marks Selection - Above Search Bar */}
          <div 
            className="mb-4 p-3 rounded-2xl shadow-xl backdrop-blur-2xl inline-flex items-center gap-3 mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(227, 242, 253, 0.9) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 10px 30px rgba(100, 181, 246, 0.3)',
              width: 'fit-content',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex'
            }}
          >
            <label className="text-xs font-bold text-blue-900 whitespace-nowrap">
              Select Marks:
            </label>
            <div className="flex gap-2">
              {marksOptions.map((marks) => (
                <button
                  key={marks}
                  onClick={() => setSelectedMarks(marks)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:scale-105 ${
                    selectedMarks === marks
                      ? 'text-white'
                      : 'text-blue-700 hover:text-blue-900'
                  }`}
                  style={
                    selectedMarks === marks
                      ? {
                          background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                          boxShadow: '0 5px 15px rgba(33, 150, 243, 0.5)'
                        }
                      : {
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(227, 242, 253, 0.9) 100%)',
                          border: '2px solid rgba(33, 150, 243, 0.3)'
                        }
                  }
                >
                  {marks}
                </button>
              ))}
            </div>
          </div>

          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 justify-center">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full shadow-md border border-emerald-200"
                >
                  <span>✓ {file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="hover:bg-emerald-100 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* AI Search Bar - Bottom with Textarea */}
          <div 
            className="relative rounded-3xl shadow-2xl backdrop-blur-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(227, 242, 253, 0.95) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 20px 60px rgba(33, 150, 243, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.8) inset'
            }}
          >
            <div className="flex items-start gap-3 p-4">
              {/* Upload Button */}
              <label className="cursor-pointer flex-shrink-0">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  multiple
                />
                <div 
                  className="p-2.5 rounded-xl shadow-lg hover:scale-110 transition-all duration-300"
                  style={{
                    background: uploadedFiles.length > 0
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'
                  }}
                >
                  <Upload className="h-4 w-4 text-white" />
                </div>
              </label>

              {/* Textarea Input */}
              <textarea
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Ask AI to generate questions... (e.g., 'Create 5 questions on Photosynthesis')"
                className="flex-grow resize-none text-blue-900 placeholder:text-blue-400 outline-none bg-transparent text-sm font-semibold min-h-[60px] max-h-[120px]"
                rows={2}
              />

              {/* Generate Button */}
              <Button
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
                className="flex-shrink-0 h-11 px-6 rounded-full shadow-xl transition-all duration-300 hover:scale-105 font-bold text-sm gap-2 border-0"
                style={{
                  background: searchQuery.trim() 
                    ? 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'
                    : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                  boxShadow: searchQuery.trim() 
                    ? '0 10px 30px rgba(33, 150, 243, 0.5)'
                    : 'none'
                }}
              >
                <Sparkles className="h-4 w-4" />
                Generate
              </Button>
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-center text-xs text-blue-600 mt-4 font-semibold drop-shadow-sm">
            Select marks, upload files (optional), and describe what questions you need
          </p>
        </div>
      </div>

      <style>{`
        @keyframes glossyFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%); }
          100% { transform: translateX(100%) translateY(100%); }
        }
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.5; 
          }
          50% { 
            transform: scale(1.2); 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
};

export default AIGenerator;
