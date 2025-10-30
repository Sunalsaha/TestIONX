import { useState } from "react";
import { Plus, Upload, Zap, X, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CreateRoomDialog = () => {
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleEmailInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const email = emailInput.trim();

      if (email && isValidEmail(email)) {
        if (!emails.includes(email)) {
          setEmails([...emails, email]);
          setEmailInput("");
        } else {
          toast({
            title: "Duplicate",
            description: "This email is already added",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
        toast({
          title: "✓ File Uploaded",
          description: `${file.name} uploaded successfully`,
        });
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload Excel or Word files only",
          variant: "destructive",
        });
      }
    }
  };

  const handleAiGenerate = async () => {
    if (!roomName.trim()) {
      toast({
        title: "Room Name Required",
        description: "Please enter a room name before generating participants",
        variant: "destructive",
      });
      return;
    }

    if (!uploadedFile) {
      toast({
        title: "Error",
        description: "Please upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "✓ Generated Successfully!",
        description: "Participant list generated from your file",
      });

      setAiOpen(false);
      setOpen(false);
      setUploadedFile(null);
    }, 2500);
  };

  const handleCreate = () => {
    if (!roomName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a room name",
        variant: "destructive",
      });
      return;
    }

    if (emails.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one participant email",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "✓ Room Created!",
      description: `${roomName} has been created with ${emails.length} participant(s)`,
    });

    setOpen(false);
    setRoomName("");
    setEmails([]);
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
          50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .email-badge {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.2);
        }
        .blue-glow {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        .ai-active {
          animation: float 3s ease-in-out infinite;
        }
        .ai-button-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .divider-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }
        .divider-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.3), transparent);
        }
        .divider-text {
          font-weight: 700;
          font-size: 14px;
          color: rgba(37, 99, 235, 0.6);
          white-space: nowrap;
          letter-spacing: 1px;
        }
      `}</style>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Plus className="h-5 w-5" />
            Create Exam Room
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px] bg-gradient-to-br from-white via-blue-50 to-white backdrop-blur-xl border border-blue-200/60 shadow-2xl rounded-2xl">
          <DialogHeader className="pb-4 border-b border-blue-100/30">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Create New Exam Room
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-2">
                  Set up your examination room with secure participant management
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <Label className="text-gray-900 font-bold text-lg">
                  Room Name <span className="text-red-500">*</span>
                </Label>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-15 transition duration-500"></div>
                <Input
                  id="roomName"
                  placeholder="e.g., Mathematics Final 2025"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="relative glass-effect border-blue-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 h-12 text-base"
                />
              </div>
              {!roomName.trim() && (
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  ⚠️ Room name is required for both email and AI generator
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
                <Label className="text-gray-900 font-bold text-lg">
                  Add Participants <span className="text-red-500">*</span>
                </Label>
                {emails.length > 0 && (
                  <span className="ml-auto text-xs font-semibold px-2 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {emails.length} added
                  </span>
                )}
              </div>
              <div className="glass-effect rounded-xl p-4 min-h-16 max-h-40 overflow-y-auto border-blue-200 hover:border-blue-300 transition-colors">
                <div className="flex flex-wrap gap-2">
                  {emails.map((email, index) => (
                    <div
                      key={index}
                      className="email-badge bg-gradient-to-r from-blue-100 to-blue-150 text-gray-900 px-3 py-2 rounded-full text-sm flex items-center gap-2 border border-blue-200 hover:shadow-md transition-all duration-200"
                    >
                      <Mail className="h-3 w-3 text-blue-600" />
                      <span className="font-medium">{email}</span>
                      <button
                        onClick={() => removeEmail(index)}
                        className="hover:text-red-600 transition-colors hover:bg-red-100 rounded-full p-0.5"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <input
                    type="email"
                    placeholder={
                      emails.length === 0
                        ? "Enter email and press Enter or comma..."
                        : "Add another email..."
                    }
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={handleEmailInput}
                    className="flex-1 min-w-48 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                💡 Tip: Enter multiple emails separated by comma or Enter key
              </p>
            </div>

            <div className="divider-container">
              <div className="divider-line"></div>
              <div className="divider-text">OR</div>
              <div className="divider-line"></div>
            </div>

            <div className="pt-2">
              <Dialog open={aiOpen} onOpenChange={setAiOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={(e) => {
                      if (!roomName.trim()) {
                        e.preventDefault();
                        toast({
                          title: "Room Name Required",
                          description: "Please enter a room name before using the AI generator",
                          variant: "destructive",
                        });
                      }
                    }}
                    className="w-full gap-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group blue-glow text-base relative overflow-hidden ai-button-glow"
                  >
                    <div className="absolute inset-0 shimmer-effect"></div>
                  
                    <span className="relative z-10">✨ AI Generator - Upload & Auto-Generate</span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[550px] bg-gradient-to-br from-white via-blue-50 to-white backdrop-blur-xl border border-blue-200/60 shadow-2xl rounded-2xl">
                  <DialogHeader className="pb-4 border-b border-blue-100/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                          AI Participant Generator
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 mt-2">
                          Upload files to auto-generate participants instantly
                        </DialogDescription>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center blue-glow ai-active">
                       
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-blue-700">Room:</span> <span className="font-semibold">{roomName}</span>
                    </p>
                  </div>

                  {!isGenerating ? (
                    <div className="space-y-6 py-6">
                      <div className="space-y-3">
                        <Label className="text-gray-900 font-bold text-lg">
                          Upload Document
                        </Label>
                        <div className="glass-effect border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-xl p-8 text-center hover-lift cursor-pointer relative group transition-all duration-300">
                          <input
                            type="file"
                            accept=".xlsx,.xls,.doc,.docx"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-xl"
                          />
                          <div className="relative z-10 pointer-events-none">
                            <div className="flex justify-center mb-3">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 blue-glow">
                                <Upload className="h-7 w-7 text-blue-600" />
                              </div>
                            </div>
                            <p className="text-base font-bold text-gray-900 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-gray-600">
                              .xlsx, .xls, .doc, .docx up to 10MB
                            </p>
                          </div>
                          {uploadedFile && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-bounce blue-glow">
                              <CheckCircle2 className="h-3 w-3" />
                              Ready
                            </div>
                          )}
                        </div>
                        {uploadedFile && (
                          <div className="bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 p-3 rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-900">
                              {uploadedFile.name}
                            </span>
                          </div>
                        )}
                      </div>

                      <DialogFooter className="gap-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setAiOpen(false);
                            setUploadedFile(null);
                          }}
                          className="px-6 py-5 border-blue-300 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleAiGenerate}
                          disabled={!uploadedFile}
                          className="px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 blue-glow"
                        >
                          
                          Generate Now
                        </Button>
                      </DialogFooter>
                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center gap-6">
                      <img
                        src="/original-de48646605196ecf52738-unscreen.gif"
                        alt="Loading..."
                        className="w-42 h-42 object-contain"
                      />
                      <p className="text-lg font-bold text-gray-900 text-center">
                        🔄 Generating participants...
                      </p>
                      <p className="text-sm text-gray-600 text-center">
                        Our AI is processing your file with advanced algorithms
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-6 border-t border-blue-100/30">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="px-6 py-5 border-blue-300 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 blue-glow"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Create Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateRoomDialog;
