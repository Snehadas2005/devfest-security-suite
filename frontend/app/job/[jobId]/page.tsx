"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, CheckCircle, AlertTriangle, XCircle, ArrowLeft, Download, FileText } from 'lucide-react';

export default function JobResultsPage() {
  const router = useRouter();

  const mockFindings = [
    {
      id: '1',
      type: 'SQL Injection',
      severity: 'high',
      description: 'Potential SQL injection vulnerability detected in user input handling',
      location: 'Line 45, function authenticateUser()',
      recommendation: 'Use parameterized queries or prepared statements'
    },
    {
      id: '2',
      type: 'XSS Vulnerability',
      severity: 'medium',
      description: 'Unescaped user input could lead to cross-site scripting attacks',
      location: 'Line 78, render() method',
      recommendation: 'Sanitize all user inputs before rendering'
    },
    {
      id: '3',
      type: 'Weak Password Policy',
      severity: 'low',
      description: 'Password requirements do not meet security standards',
      location: 'Line 12, validatePassword()',
      recommendation: 'Enforce minimum 12 characters with complexity requirements'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'high': return 'from-orange-500 to-orange-600';
      case 'medium': return 'from-yellow-500 to-yellow-600';
      case 'low': return 'from-blue-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch(severity) {
      case 'critical': return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'high': return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'low': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      default: return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C0712] via-[#201A26] to-[#0C0712] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#5C00CC] opacity-10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#6A00EB] opacity-10 blur-[150px] rounded-full"></div>
      </div>

      <nav className="relative z-50 border-b border-[#2A252F]">
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
          <button 
            onClick={() => router.push('/dashboard')}
            className="group flex items-center gap-2 px-6 py-3 bg-[#2A252F] border border-[#5C00CC]/30 rounded-xl font-['Arimo'] font-semibold hover:border-[#6A00EB] transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-['Dela_Gothic_One'] text-white mb-3">Scan Results</h1>
          <p className="text-lg font-['Arimo'] text-[#A8A5AB]">Job ID: #12345 • Code Scanner • Completed 2 hours ago</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#5C00CC] to-[#6A00EB] rounded-xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-['Arimo'] text-sm text-[#A8A5AB]">Status</p>
                <p className="font-['Dela_Gothic_One'] text-2xl text-white">Safe</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#6A00EB] to-[#5C00CC] rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-['Arimo'] text-sm text-[#A8A5AB]">Confidence</p>
                <p className="font-['Dela_Gothic_One'] text-2xl text-white">87%</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#5C00CC] to-[#6A00EB] rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-['Arimo'] text-sm text-[#A8A5AB]">Findings</p>
                <p className="font-['Dela_Gothic_One'] text-2xl text-white">{mockFindings.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-3xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-['Dela_Gothic_One'] text-white">Detected Issues</h2>
            <button className="px-6 py-3 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] rounded-xl font-['Arimo'] font-semibold hover:shadow-[0_0_30px_rgba(106,0,235,0.5)] transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>

          <div className="space-y-6">
            {mockFindings.map((finding) => (
              <div
                key={finding.id}
                className="group p-6 bg-[#201A26] border border-[#2A252F] rounded-2xl hover:border-[#5C00CC] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getSeverityColor(finding.severity)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Arimo'] font-bold text-white text-lg mb-1">{finding.type}</h3>
                      <p className="font-['Arimo'] text-[#A8A5AB] mb-3">{finding.description}</p>
                      {finding.location && (
                        <p className="font-['Arimo'] text-sm text-[#A8A5AB] mb-2">
                          <span className="text-[#6A00EB]">Location:</span> {finding.location}
                        </p>
                      )}
                      {finding.recommendation && (
                        <p className="font-['Arimo'] text-sm text-[#A8A5AB]">
                          <span className="text-[#6A00EB]">Recommendation:</span> {finding.recommendation}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`px-4 py-2 border rounded-xl font-['Arimo'] font-semibold text-sm capitalize ${getSeverityBg(finding.severity)}`}>
                    {finding.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex-1 px-6 py-4 bg-[#2A252F] border border-[#5C00CC]/30 rounded-xl font-['Arimo'] font-semibold hover:border-[#6A00EB] transition-all"
          >
            Run Another Scan
          </button>
          <button className="flex-1 px-6 py-4 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] rounded-xl font-['Arimo'] font-semibold hover:shadow-[0_0_30px_rgba(106,0,235,0.5)] transition-all">
            Share Results
          </button>
        </div>
      </main>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: #0C0712;
          color: #ffffff;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #0C0712;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #5C00CC, #6A00EB);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #6A00EB, #5C00CC);
        }

        ::selection {
          background: #5C00CC;
          color: white;
        }

        button {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}