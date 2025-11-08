"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Zap, Users, ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  const features = [
    {
      icon: Shield,
      title: 'Advanced Threat Detection',
      desc: 'Leveraging Gemini AI to identify phishing, malware, and vulnerabilities with unprecedented accuracy.'
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      desc: 'Military-grade encryption and security protocols to protect your sensitive data and analysis results.'
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      desc: 'Instant scanning and classification with confidence scores, providing actionable insights immediately.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      desc: 'Share findings, collaborate on security assessments, and maintain comprehensive audit trails.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C0712] via-[#201A26] to-[#0C0712] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-[600px] h-[600px] bg-[#5C00CC] opacity-10 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-[600px] h-[600px] bg-[#6A00EB] opacity-10 blur-[180px] rounded-full animate-pulse delay-1000"></div>
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
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 px-6 py-3 bg-[#2A252F] border border-[#5C00CC]/30 rounded-xl font-['Arimo'] font-semibold hover:border-[#6A00EB] transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-['Dela_Gothic_One'] mb-6">
            <span className="block text-white mb-2">About</span>
            <span className="bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] bg-clip-text text-transparent">
              SentraSec AI
            </span>
          </h1>
          <p className="text-xl font-['Arimo'] text-[#A8A5AB] max-w-3xl mx-auto leading-relaxed">
            A cutting-edge cybersecurity platform powered by Google's Gemini AI, 
            designed to protect organizations from evolving digital threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-8 bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-3xl hover:border-[#6A00EB] transition-all duration-500 hover:shadow-[0_0_50px_rgba(106,0,235,0.3)]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#5C00CC] to-[#6A00EB] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-['Dela_Gothic_One'] text-white mb-4">{feature.title}</h3>
              <p className="font-['Arimo'] text-[#A8A5AB] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#2A252F]/50 backdrop-blur-xl border border-[#5C00CC]/20 rounded-3xl p-12 mb-20">
          <h2 className="text-4xl font-['Dela_Gothic_One'] text-white mb-6 text-center">Our Mission</h2>
          <p className="font-['Arimo'] text-[#A8A5AB] text-lg leading-relaxed text-center max-w-4xl mx-auto">
            We believe that cybersecurity should be accessible, intelligent, and proactive. 
            SentraSec AI combines the power of artificial intelligence with proven security 
            methodologies to provide comprehensive protection against modern cyber threats. 
            Our platform analyzes millions of data points in real-time, delivering actionable 
            insights that help organizations stay one step ahead of attackers.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-['Dela_Gothic_One'] text-white mb-8">Get in Touch</h2>
          <div className="flex gap-6 justify-center">
            {[
              { icon: Github, label: 'GitHub' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Mail, label: 'Email' }
            ].map((social, i) => (
              <button
                key={i}
                className="group relative w-14 h-14 bg-[#2A252F] border border-[#5C00CC]/30 rounded-xl hover:border-[#6A00EB] transition-all duration-300 hover:shadow-[0_0_30px_rgba(106,0,235,0.3)]"
              >
                <social.icon className="w-6 h-6 text-[#A8A5AB] group-hover:text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-colors" />
              </button>
            ))}
          </div>
          <p className="font-['Arimo'] text-[#A8A5AB] mt-8">
            © 2025 SentraSec AI. All rights reserved.
          </p>
        </div>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}