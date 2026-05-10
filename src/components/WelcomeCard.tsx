import { motion } from 'motion/react';
import { CardData } from '../types';
import { Cpu, Globe, GraduationCap, Shield } from 'lucide-react';
import React from 'react';

interface WelcomeCardProps {
  data: CardData;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function WelcomeCard({ data, cardRef }: WelcomeCardProps) {
  const deptThemes: Record<string, { primary: string; secondary: string; text: string }> = {
    'CSE': { primary: '#06b6d4', secondary: '#0891b2', text: '#ffffff' },
    'Civil': { primary: '#f59e0b', secondary: '#d97706', text: '#ffffff' },
    'Electrical': { primary: '#ef4444', secondary: '#dc2626', text: '#ffffff' },
    'Electronics': { primary: '#8b5cf6', secondary: '#7c3aed', text: '#ffffff' },
    'Mechanical': { primary: '#6b7280', secondary: '#4b5563', text: '#ffffff' },
    'BCA': { primary: '#10b981', secondary: '#059669', text: '#ffffff' },
    'BBA': { primary: '#ec4899', secondary: '#db2777', text: '#ffffff' },
    'BMLT': { primary: '#3b82f6', secondary: '#2563eb', text: '#ffffff' },
    'BBAHM': { primary: '#6366f1', secondary: '#4f46e5', text: '#ffffff' },
  };

  const theme = deptThemes[data.department] || deptThemes['CSE'];
  const authId = Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="flex justify-center p-0 md:p-4">
      <div
        ref={cardRef}
        id="welcome-card"
        style={{
          backgroundColor: '#050505',
          borderColor: `${theme.primary}40`,
          color: '#ffffff',
          width: '600px',
          height: '440px',
        }}
        className="relative overflow-hidden border rounded-[40px] shadow-[0_0_100px_-20px_rgba(0,0,0,1)] transition-all duration-500 scale-[0.6] sm:scale-100 origin-center font-sans"
      >
        {/* Futuristic Background Layers */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center grayscale"
          style={{ backgroundImage: 'url(/tech-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90 pointer-events-none" />
        
        {/* Glowing Accents */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-transparent to-cyan-500/10 blur-[120px] pointer-events-none" />
        <div 
          className="absolute -bottom-20 -left-20 w-80 h-80 blur-[150px] rounded-full opacity-10" 
          style={{ backgroundColor: theme.primary }}
        />

        {/* Top Header Section - Increased Height & Spacing */}
        <div className="absolute top-0 left-0 right-0 h-28 flex items-center px-10 justify-between border-b border-white/10 bg-white/[0.05] backdrop-blur-md z-20">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2.5 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-[15px] font-black tracking-tight leading-none uppercase text-white">
                Global Institute of Management & Technology
              </h2>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[12px] font-black tracking-[0.25em] uppercase text-cyan-400">
                  National Technology Day
                </span>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-cyan-500" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/80 font-black italic">Hosted by Department of CSE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Identity Content - Adjusted for no footer */}
        <div className="absolute inset-0 flex items-start px-12 pt-36 pb-12">
          <div className="flex items-start gap-12 w-full pt-2">
            {/* Photo Section with Scanning Effect */}
            <div className="relative shrink-0 pt-2">
              <div 
                className="w-40 h-40 rounded-[32px] border-4 overflow-hidden shadow-2xl relative z-20 bg-black"
                style={{ borderColor: theme.primary }}
              >
                {data.photo ? (
                  <img src={data.photo} alt={data.name} className="w-full h-full object-cover scale-x-[-1]" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-30">
                    <Globe className="w-16 h-16 text-white" />
                  </div>
                )}
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent h-1.5 w-full animate-[scan_3s_linear_infinite] shadow-[0_0_20px_cyan] pointer-events-none" />
              </div>
              
              {/* Decorative Frame Elements */}
              <div className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2" style={{ borderColor: theme.primary }} />
              <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2" style={{ borderColor: theme.primary }} />
            </div>

            {/* Info Section - Vertical Spacing Fixed */}
            <div className="flex-1 flex flex-col gap-5 pt-1">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                   <div className="h-[2px] w-10" style={{ backgroundColor: theme.primary }} />
                   <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/70">Welcoming Participant</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter leading-none uppercase text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] truncate max-w-[320px]">
                  {data.name || 'GUEST_PARTICIPANT'}
                </h1>
              </div>

              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-black">Affiliation Status</span>
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4" style={{ color: theme.primary }} />
                    <span className="text-[16px] font-black uppercase tracking-tight text-white leading-none">
                      Proud to be {data.department}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-black">Identity ID</span>
                    <span className="text-[14px] font-mono font-black tracking-[0.2em] block" style={{ color: theme.primary }}>
                      #{authId}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 font-black">Event Date</span>
                    <span className="text-[14px] font-mono font-black tracking-widest block text-white/90">
                      MAY 11, 2026
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                 <div className="w-full h-[1px] opacity-20" style={{ backgroundImage: `linear-gradient(to right, ${theme.primary}, transparent)` }} />
                 <p className="text-[11px] font-mono leading-relaxed text-white/95 uppercase tracking-[0.05em] font-black">
                   Celebrating Bharat's technological excellence. <br />
                   <span className="text-white/60">Innovation Unit • GIMT Innovation Cell</span>
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Keyframe Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
        `}} />
      </div>
    </div>
  );
}
