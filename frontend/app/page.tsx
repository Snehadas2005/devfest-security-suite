"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Code, FileText, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C0712] via-[#201A26] to-[#0C0712] text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#5C00CC] opacity-20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6A00EB] opacity-20 blur-[120px] rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#5C00CC]/10 to-transparent rounded-full"></div>
      </div>

      <nav className="relative z-50 border-b border-[#2A252F]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] blur-lg opacity-50"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#5C00CC] to-[#6A00EB] rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </div>
            <span className="text-2xl font-['Dela_Gothic_One'] bg-gradient-to-r from-[#5C00CC] via-[#6A00EB] to-[#5C00CC] bg-clip-text text-transparent">
              SentraSec
            </span>
          </div>
          <button 
            onClick={() => router.push('/dashboard')}
            className="group relative px-8 py-3 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] rounded-xl font-['Arimo'] font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(92,0,204,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#6A00EB] to-[#5C00CC] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#2A252F] border border-[#5C00CC]/30 rounded-full">
            <Sparkles className="w-4 h-4 text-[#6A00EB]" />
            <span className="text-sm font-['Arimo'] text-[#A8A5AB]">AI-Powered Security Platform</span>
          </div>
          
          <h1 className="text-7xl font-['Dela_Gothic_One'] leading-tight">
            <span className="block text-white">Elevate Your</span>
            <span className="block bg-gradient-to-r from-[#5C00CC] via-[#6A00EB] to-[#5C00CC] bg-clip-text text-transparent">
              Cyber Defense
            </span>
          </h1>
          
          <p className="text-xl font-['Arimo'] text-[#A8A5AB] max-w-3xl mx-auto leading-relaxed">
            Advanced threat detection powered by Gemini AI. Analyze phishing attempts, 
            code vulnerabilities, and configuration risks with military-grade precision.
          </p>

          <div className="flex gap-6 justify-center pt-8">
            <button 
              onClick={() => router.push('/dashboard')}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] rounded-2xl font-['Arimo'] font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(106,0,235,0.6)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Scanning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => router.push('/about')}
              className="px-10 py-5 bg-[#2A252F] border-2 border-[#5C00CC]/50 rounded-2xl font-['Arimo'] font-bold text-lg hover:border-[#6A00EB] hover:bg-[#2A252F]/80 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { 
              icon: Shield, 
              title: 'Phishing Detection', 
              desc: 'AI-powered analysis of suspicious URLs and text',
              gradient: 'from-[#5C00CC] to-[#6A00EB]'
            },
            { 
              icon: Code, 
              title: 'Code Scanner', 
              desc: 'Deep vulnerability analysis across all languages',
              gradient: 'from-[#6A00EB] to-[#5C00CC]'
            },
            { 
              icon: Lock, 
              title: 'Config Analyzer', 
              desc: 'Security risk assessment for configurations',
              gradient: 'from-[#5C00CC] to-[#6A00EB]'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-3xl hover:border-[#6A00EB] transition-all duration-500 hover:shadow-[0_0_40px_rgba(106,0,235,0.2)] hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5C00CC]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-['Dela_Gothic_One'] text-white mb-3">{feature.title}</h3>
                <p className="font-['Arimo'] text-[#A8A5AB] leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] rounded-3xl">
            <div className="bg-[#0C0712] px-12 py-8 rounded-3xl">
              <p className="text-sm font-['Arimo'] text-[#A8A5AB] mb-2">Trusted by Security Teams</p>
              <p className="text-4xl font-['Dela_Gothic_One'] bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] bg-clip-text text-transparent">
                99.8% Accuracy
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}