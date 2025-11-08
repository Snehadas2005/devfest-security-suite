'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Code, Settings, Search, Activity, CheckCircle, AlertTriangle, ChevronRight, Shield, User, XCircle } from 'lucide-react';

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
    { id: 'text', icon: FileText, title: 'Phishing Detector', desc: 'Scan text and URLs for phishing', color: 'from-blue-500 to-blue-600', bgGradient: 'from-blue-50 to-blue-100' },
    { id: 'code', icon: Code, title: 'Code Scanner', desc: 'Detect vulnerabilities in code', color: 'from-green-500 to-green-600', bgGradient: 'from-green-50 to-green-100' },
    { id: 'config', icon: Settings, title: 'Config Analyzer', desc: 'Check configuration risks', color: 'from-purple-500 to-purple-600', bgGradient: 'from-purple-50 to-purple-100' },
    { id: 'classify', icon: Search, title: 'Risk Classifier', desc: 'Classify risk levels', color: 'from-red-500 to-red-600', bgGradient: 'from-red-50 to-red-100' }
  ];

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              SentraSec AI
            </span>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </nav>

      <div className="pt-20 max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Dashboard</h1>
          <p className="text-gray-600">Choose a tool to start analyzing your assets</p>
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveScan(tool.id)}
              className={`group p-8 bg-gradient-to-br ${tool.bgGradient} rounded-2xl border-2 border-transparent hover:border-blue-600 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-gray-600">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-blue-600" />
            Recent Scans
          </h2>
          
          <div className="space-y-4">
            {mockJobs.map((job) => (
              <div key={job.id} className="p-4 border-2 border-gray-100 rounded-xl hover:border-blue-600 cursor-pointer transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {job.status === 'safe' ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-8 h-8 text-yellow-500" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">{job.type} Scan</p>
                      <p className="text-sm text-gray-500">{job.timestamp}</p>
                    </div>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === 'safe' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {job.confidence}% Confidence
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scanner Modal */}
      {activeScan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {tools.find(t => t.id === activeScan)?.title}
                </h2>
                <button 
                  onClick={() => setActiveScan(null)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <textarea
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder={getPlaceholder(activeScan)}
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none resize-none font-mono text-sm"
              />
              
              <button
                onClick={handleScan}
                disabled={!scanInput || isScanning}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isScanning ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Start Scan
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                Note: Backend integration pending. Results will be shown once API is connected.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
