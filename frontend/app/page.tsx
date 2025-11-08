"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Code, ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(106, 0, 235, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(12, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(92, 0, 204, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0712] text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ opacity: 0.4 }}
      />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Arimo:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arimo', sans-serif;
          background: #0C0712;
          color: #ffffff;
          overflow-x: hidden;
        }

        .font-dela { 
          font-family: 'Dela Gothic One', cursive; 
        }
        
        .font-arimo { 
          font-family: 'Arimo', sans-serif; 
        }
        
        .glow-purple {
          box-shadow: 0 0 20px rgba(92, 0, 204, 0.5);
        }
        
        .gradient-purple {
          background: linear-gradient(135deg, #5C00CC 0%, #6A00EB 100%);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #5C00CC 0%, #6A00EB 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(92, 0, 204, 0.5); }
          50% { box-shadow: 0 0 40px rgba(106, 0, 235, 0.8); }
        }

        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
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

        ::selection {
          background: #5C00CC;
          color: white;
        }
      `}</style>

      <nav className="fixed top-0 w-full z-50 bg-[#0C0712]/80 backdrop-blur-xl border-b border-[#2A252F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
              <span className="text-xl font-dela">
                Sentra<span className="text-gradient">Sec</span>
              </span>
            </div>

            <button 
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 gradient-purple rounded-full font-arimo font-semibold hover:scale-105 transition-transform glow-purple"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#2A252F] border border-[#5C00CC]/30 rounded-full mb-8 float-animation">
              <Sparkles className="w-4 h-4 text-[#6A00EB]" />
              <span className="text-sm font-arimo text-[#A8A5AB]">AI-Powered Security Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-dela leading-tight mb-8">
              <span className="block text-white mb-2">Elevate Your</span>
              <span className="block text-gradient">Cyber Defense</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#A8A5AB] font-arimo max-w-3xl mx-auto leading-relaxed mb-12">
              Advanced threat detection powered by Gemini AI. Analyze phishing attempts, 
              code vulnerabilities, and configuration risks with military-grade precision.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center gap-3 px-10 py-5 gradient-purple rounded-2xl text-lg font-arimo font-bold hover:scale-105 transition-all duration-300 glow-purple group"
              >
                Start Scanning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button 
                onClick={() => router.push('/about')}
                className="px-10 py-5 bg-[#2A252F] border-2 border-[#5C00CC]/50 rounded-2xl font-arimo font-bold text-lg hover:border-[#6A00EB] hover:bg-[#2A252F]/80 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
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
                className="p-6 bg-gradient-to-br from-[#201A26] to-[#2A252F] rounded-2xl border border-[#2A252F] hover:border-[#6A00EB] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 glow-purple`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-dela mb-2 text-white">{feature.title}</h3>
                <p className="text-[#A8A5AB] font-arimo">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-[#5C00CC] to-[#6A00EB] rounded-3xl">
              <div className="bg-[#0C0712] px-12 py-8 rounded-3xl">
                <p className="text-sm font-arimo text-[#A8A5AB] mb-2">Trusted by Security Teams</p>
                <p className="text-4xl font-dela text-gradient">99.8% Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}