import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Code, Settings, Search, Activity, CheckCircle, AlertTriangle, Shield, User, XCircle, Upload, ChevronRight } from 'lucide-react';

const mockJobs = [
  { id: '1', type: 'text', status: 'safe', confidence: 95, timestamp: '2 hours ago' },
  { id: '2', type: 'code', status: 'suspicious', confidence: 73, timestamp: '5 hours ago' }
];

export default function Dashboard() {
  const router = useRouter();
  const [activeScan, setActiveScan] = useState<string | null>(null);
  const [scanInput, setScanInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const tools = [
    { 
      id: 'text', 
      icon: FileText, 
      title: 'Phishing Detector', 
      desc: 'Scan text and URLs for phishing attempts',
      gradient: 'from-[#5C00CC] to-[#6A00EB]'
    },
    { 
      id: 'code', 
      icon: Code, 
      title: 'Code Scanner', 
      desc: 'Detect vulnerabilities in your codebase',
      gradient: 'from-[#6A00EB] to-[#5C00CC]'
    },
    { 
      id: 'config', 
      icon: Settings, 
      title: 'Config Analyzer', 
      desc: 'Analyze configuration security risks',
      gradient: 'from-[#5C00CC] to-[#6A00EB]'
    },
    { 
      id: 'classify', 
      icon: Search, 
      title: 'Risk Classifier', 
      desc: 'AI-powered risk level classification',
      gradient: 'from-[#6A00EB] to-[#5C00CC]'
    }
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setActiveScan(null);
      setScanInput('');
      alert('Scan complete! Results would appear here when backend is connected.');
    }, 2500);
  };

  const getPlaceholder = (scanType: string) => {
    switch(scanType) {
      case 'text': return 'Paste text or URLs to scan for phishing...';
      case 'code': return 'Paste your code here for vulnerability analysis...';
      case 'config': return 'Paste configuration files (JSON, YAML, etc.)...';
      case 'classify': return 'Enter content to classify risk level...';
      default: return 'Enter content to analyze...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C0712] via-[#201A26] to-[#0C0712] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#5C00CC] opacity-10 blur-[150px] rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#6A00EB] opacity-10 blur-[150px] rounded-full animate-float-delayed"></div>
      </div>

      <nav className="relative z-50 border-b border-[#2A252F] backdrop-blur-xl bg-[#0C0712]/80">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] blur-lg opacity-50"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#5C00CC] to-[#6A00EB] rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
            <span className="text-2xl font-['Dela_Gothic_One'] bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] bg-clip-text text-transparent">
              SentraSec
            </span>
          </div>
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] blur-md opacity-0 group-hover:opacity-50 transition-opacity rounded-full"></div>
            <div className="relative w-11 h-11 bg-gradient-to-br from-[#5C00CC] to-[#6A00EB] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-20 max-w-7xl mx-auto px-6 py-10">
        <div className="mb-12">
          <h1 className="text-5xl font-['Dela_Gothic_One'] text-white mb-3">Security Dashboard</h1>
          <p className="text-lg font-['Arimo'] text-[#A8A5AB]">Choose a tool to start analyzing your assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveScan(tool.id)}
              className="group relative p-8 bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-3xl cursor-pointer transition-all duration-500 hover:border-[#6A00EB] hover:shadow-[0_0_50px_rgba(106,0,235,0.3)] hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5C00CC]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <ChevronRight className="w-7 h-7 text-[#A8A5AB] group-hover:text-[#6A00EB] group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-['Dela_Gothic_One'] text-white mb-3">{tool.title}</h3>
                <p className="font-['Arimo'] text-[#A8A5AB]">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-3xl p-8">
          <h2 className="text-2xl font-['Dela_Gothic_One'] text-white flex items-center gap-3 mb-8">
            <Activity className="w-7 h-7 text-[#6A00EB]" />
            Recent Scans
          </h2>
          
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div 
                key={job.id} 
                className="group p-6 bg-[#201A26] border border-[#2A252F] rounded-2xl hover:border-[#5C00CC] cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(92,0,204,0.2)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    {job.status === 'safe' ? (
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-green-400" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-7 h-7 text-yellow-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-['Arimo'] font-bold text-white text-lg capitalize">{job.type} Scan</p>
                      <p className="font-['Arimo'] text-sm text-[#A8A5AB]">{job.timestamp}</p>
                    </div>
                  </div>
                  <div className={`px-5 py-2 rounded-xl font-['Arimo'] font-semibold ${
                    job.status === 'safe' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {job.confidence}% Confidence
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeScan && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative bg-[#201A26] border border-[#5C00CC]/30 rounded-3xl shadow-[0_0_60px_rgba(106,0,235,0.3)] max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-8 border-b border-[#2A252F]">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-['Dela_Gothic_One'] text-white">
                  {tools.find(t => t.id === activeScan)?.title}
                </h2>
                <button 
                  onClick={() => setActiveScan(null)}
                  className="w-10 h-10 rounded-xl bg-[#2A252F] hover:bg-[#5C00CC]/20 flex items-center justify-center transition-colors"
                >
                  <XCircle className="w-6 h-6 text-[#A8A5AB]" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <textarea
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder={getPlaceholder(activeScan)}
                className="w-full h-80 p-5 bg-[#0C0712] border-2 border-[#2A252F] rounded-2xl focus:border-[#6A00EB] focus:outline-none resize-none font-mono text-sm text-white placeholder:text-[#A8A5AB] transition-colors"
              />
              
              <button
                onClick={handleScan}
                disabled={!scanInput || isScanning}
                className="w-full py-5 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] rounded-2xl font-['Arimo'] font-bold text-lg hover:shadow-[0_0_40px_rgba(106,0,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
              >
                {isScanning ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield className="w-6 h-6" />
                    Start Scan
                  </>
                )}
              </button>

              <p className="text-sm font-['Arimo'] text-[#A8A5AB] text-center">
                Note: Backend integration pending. Results will be shown once API is connected.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 20s ease-in-out infinite;
          animation-delay: -10s;
        }
      `}</style>
    </div>
  );
}