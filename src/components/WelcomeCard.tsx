import { motion } from 'motion/react';
import { CardData } from '../types';
import { Cpu, Globe, GraduationCap } from 'lucide-react';
import React from 'react';

interface WelcomeCardProps {
  data: CardData;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function WelcomeCard({ data, cardRef }: WelcomeCardProps) {
  // Using HEX colors for stability
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
          backgroundColor: '#09090b',
          borderColor: `${theme.primary}80`,
          color: '#ffffff',
          width: '600px',
          height: '400px',
        }}
        className="relative overflow-hidden border-2 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 scale-[0.6] sm:scale-100 origin-center"
      >
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:15px_15px]" />
          <div 
            className="absolute top-0 left-0 w-full h-full bg-[size:40px_40px]" 
            style={{ 
              backgroundImage: `linear-gradient(90deg,transparent 98%,${theme.primary}11 98%),linear-gradient(transparent 98%,${theme.primary}11 98%)`,
              backgroundColor: 'transparent'
            }}
          />
        </div>

        {/* Decorative corner glow */}
        <div 
          className="absolute -top-24 -right-24 w-64 h-64 blur-3xl rounded-full opacity-20" 
          style={{ backgroundColor: theme.primary }}
        />

        {/* Card Header */}
        <div className="absolute top-6 left-8 right-8 flex justify-between items-start z-10">
          <div 
            className="flex items-center gap-4 p-3 rounded-2xl border backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center p-2 shadow-2xl overflow-hidden shrink-0"
              style={{ backgroundColor: '#ffffff' }}
            >
               <img 
                 src="https://www.gimt-india.com/images/logo.png" 
                 alt="GIMT Logo" 
                 className="w-full h-full object-contain"
                 crossOrigin="anonymous"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = "https://api.iconify.design/heroicons:academic-cap-20-solid.svg?color=%230891b2";
                 }}
               />
            </div>
            <div className="pr-4">
              <h2 
                className="text-[16px] font-[900] tracking-tight leading-none uppercase"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                Global Institute of
              </h2>
              <h2 
                className="text-[16px] font-[900] tracking-tight leading-none uppercase"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                Management & Tech
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="h-[1px] w-4" style={{ backgroundColor: theme.primary }} />
                <span 
                  className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold"
                  style={{ color: '#22d3ee' }} // text-cyan-400 equivalent
                >
                  Tech Day 2026
                </span>
              </div>
            </div>
          </div>
          <div className="text-right pt-2">
            <span 
              className="text-[9px] font-mono block uppercase tracking-widest mb-1"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
            >
              Sector Authority
            </span>
            <span 
              className="text-xs font-black tracking-tighter uppercase block leading-none"
              style={{ color: '#a1a1aa' }} // text-zinc-400 equivalent
            >
              CSE Dept.
            </span>
            <span 
              className="text-[10px] font-bold tracking-widest uppercase block mt-1 italic"
              style={{ color: 'rgba(6, 182, 212, 0.5)' }} // text-cyan-500/50 equivalent
            >
              Innovation Unit
            </span>
          </div>
        </div>

        {/* User Photo & Info Section */}
        <div className="absolute inset-0 flex items-center px-10 pt-28">
          <div className="flex items-center gap-10 w-full relative">
            <div className="relative">
              <div 
                className="w-40 h-40 rounded-full border-4 overflow-hidden shadow-2xl relative z-20"
                style={{ borderColor: theme.primary, backgroundColor: 'transparent' }}
              >
                {data.photo ? (
                  <img src={data.photo} alt={data.name} className="w-full h-full object-cover scale-x-[-1]" />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: '#27272a' }} // text-zinc-800 equivalent
                  >
                    <Globe 
                      className="w-12 h-12" 
                      style={{ opacity: 0.2, color: '#ffffff' }}
                    />
                  </div>
                )}
              </div>
              <div 
                className="absolute -inset-2 border-2 rounded-full animate-spin [animation-duration:8s] opacity-30" 
                style={{ borderColor: theme.primary, borderStyle: 'dashed' }}
              />
            </div>

            <div className="flex-1 space-y-4 text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <div 
                    className="text-[10px] font-mono uppercase tracking-[0.4em] mb-1 text-left"
                    style={{ color: '#06b6d4' }} // text-cyan-500
                  >
                    Welcome Participant
                  </div>
                  <h1 
                    className="text-4xl font-[900] tracking-tighter leading-none uppercase break-words border-l-4 pl-6" 
                    style={{ borderColor: theme.primary, color: '#ffffff' }}
                  >
                    {data.name || 'GUEST_USER'}
                  </h1>
                </div>

                <div className="space-y-2">
                  <div 
                    className="inline-block px-3 py-1 text-[12px] font-black uppercase tracking-widest rounded-sm"
                    style={{ backgroundColor: theme.primary, color: '#000000' }}
                  >
                    PROUD TO BE {data.department}
                  </div>
                  <p 
                    className="text-[10px] font-mono leading-relaxed uppercase max-w-[280px]"
                    style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    Technical Excellence • Global Vision • Innovative Solutions. Celebrating Bharat's technological milestones.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="absolute bottom-6 left-8 right-8 flex justify-between items-end border-t pt-4"
          style={{ borderColor: '#27272a' }} // border-zinc-800 equivalent
        >
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span 
                className="text-[8px] font-mono uppercase"
                style={{ color: 'rgba(255, 255, 255, 0.4)' }}
              >
                Pass ID
              </span>
              <span 
                className="text-[11px] font-mono font-bold tracking-widest"
                style={{ color: '#06b6d4' }} // text-cyan-500
              >
                {authId}
              </span>
            </div>
            <div className="flex flex-col">
              <span 
                className="text-[8px] font-mono uppercase"
                style={{ color: 'rgba(255, 255, 255, 0.4)' }}
              >
                Session
              </span>
              <span 
                className="text-[11px] font-mono font-bold tracking-widest uppercase"
                style={{ color: '#a855f7' }} // text-purple-400 equivalent
              >
                MAY 11, 2026
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <Cpu className="w-5 h-5" style={{ color: '#52525b' }} />
            <GraduationCap className="w-5 h-5" style={{ color: '#52525b' }} />
          </div>
        </div>

        <div 
          className="absolute bottom-0 left-0 w-full h-1 opacity-30" 
          style={{ backgroundImage: 'linear-gradient(to right, transparent, #06b6d4, transparent)' }}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10.0% { opacity: 1; }
          90.0% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
