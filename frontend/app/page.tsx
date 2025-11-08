'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, FileText, Code, Lock, User, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  const handleSignIn = () => {
    // Friend ke auth context ko use kar sakte ho
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              SentraSec AI
            </span>
          </div>
          <button 
            onClick={handleSignIn}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            AI-Powered Cybersecurity Platform
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Protect Your Digital
            <span className="block bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 bg-clip-text text-transparent">
              Assets with AI
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced threat detection for phishing, malware, code vulnerabilities, and configuration risks. 
            Get instant AI-powered analysis with confidence scores.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <button 
              onClick={handleSignIn}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <User className="w-5 h-5" />
              Sign in with Google
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => router.push('/about')}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            {[
              { icon: Shield, label: 'Phishing Detection', color: 'from-blue-500 to-blue-600' },
              { icon: Code, label: 'Code Analysis', color: 'from-green-500 to-green-600' },
              { icon: Lock, label: 'Config Security', color: 'from-red-500 to-red-600' }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-900">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
