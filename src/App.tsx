import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import Webcam from 'react-webcam';
import WelcomeCard from './components/WelcomeCard';
import { CardData, StepType, DEPARTMENTS } from './types';
import { 
  Shield, 
  Cpu, 
  Palette, 
  Download, 
  Printer, 
  Share2, 
  Camera, 
  CheckCircle2, 
  ArrowRight,
  ChevronLeft,
  Linkedin,
  Facebook,
  Instagram,
  User,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<StepType>('welcome');
  const [data, setData] = useState<CardData>({
    name: '',
    photo: null,
    department: 'CSE',
    theme: 'cyber',
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      // Optimization: Scroll to top to ensure no offsets
      window.scrollTo(0, 0);
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 4, // Ultra high-quality for social sharing
        backgroundColor: '#050505',
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          const card = clonedDoc.getElementById('welcome-card');
          if (card) {
            card.style.transform = 'none';
            card.style.scale = '1';
            card.style.margin = '0';
          }
        }
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `GIMT_National_TechDay_Pass_${data.name.replace(/\s+/g, '_') || 'Participant'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Failed to generate image. Please try again or take a screenshot.');
    }
  };

  const getCaption = () => {
    const departmentName = data.department === 'CSE' ? 'Computer Science & Engineering' : data.department;
    return `Excited to participate in the National Technology Day 2026 at Global Institute of Management & Technology! 🚀 

I'm proud to be representing the Department of ${departmentName}. India's technological journey is inspiring, and I'm thrilled to be part of this innovation legacy. 

#NationalTechnologyDay #GIMT #Innovation #TechIndia #BharatTech #ProudStudent #CSE`;
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(getCaption());
    alert('Caption copied to clipboard! Share it with your pass on social media.');
  };

  const shareOnSocial = async (platform: 'linkedin' | 'facebook' | 'instagram' | 'whatsapp') => {
    const text = getCaption();
    const url = window.location.href;
    
    // Check for Web Share API (Mobile Support)
    if (navigator.share && platform === 'whatsapp') {
      try {
        await navigator.share({
          title: 'GIMT National Tech Day Pass',
          text: text,
          url: url,
        });
        return;
      } catch (err) {
        console.error('Share failed:', err);
      }
    }

    let shareUrl = '';
    switch(platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'instagram':
        alert('1. Download your pass\n2. Open Instagram\n3. Upload your pass to your Story or Feed\n4. Paste the caption (we copied it for you!)');
        copyCaption();
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
      // Also copy caption for them just in case
      navigator.clipboard.writeText(text);
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setData({ ...data, photo: imageSrc });
      setStep('department');
    }
  };

  const nextStep = () => {
    if (step === 'welcome') setStep('name');
    else if (step === 'name' && data.name) setStep('photo');
  };

  const prevStep = () => {
    if (step === 'name') setStep('welcome');
    else if (step === 'photo') setStep('name');
    else if (step === 'department') setStep('photo');
    else if (step === 'result') setStep('department');
  };

  return (
    <div className="min-h-screen text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans relative">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-20 bg-[#050505] pointer-events-none" />
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-30 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: 'url(/tech-bg.png)' }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#050505] pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-[scan_10s_linear_infinite] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black/50 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
               <img 
                 src="/logo.png" 
                 alt="GIMT Logo" 
                 className="w-full h-full object-contain"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = "https://api.iconify.design/heroicons:academic-cap-20-solid.svg?color=%230891b2";
                 }}
               />
             </div>
             <span className="font-black tracking-tighter text-lg md:text-xl uppercase">GIMT • National Tech Day</span>
          </div>
          <div className="hidden md:flex items-center gap-4 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Secure Protocol v2.6.0</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-24 pb-12 px-6 flex flex-col items-center min-h-screen">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-[800px] text-center space-y-12"
            >
              <div className="space-y-6">
                 <motion.div 
                    initial={{ y: 20 }} animate={{ y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full mb-4"
                  >
                   <Sparkles className="w-4 h-4" />
                   <span className="text-xs font-black uppercase tracking-widest leading-none">National Technology Day • May 11</span>
                 </motion.div>
                 <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter leading-none uppercase filter drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                   Welcome to <br /> 
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">National Technology Day</span>
                 </h1>
                 <div className="space-y-2 mt-6">
                   <p className="text-xl md:text-2xl font-bold tracking-tight text-white/90 italic">
                     Global Institute of Management & Technology
                   </p>
                   <p className="text-cyan-500 font-black tracking-[0.3em] uppercase text-xs md:text-sm">
                     Hosted by Department of CSE
                   </p>
                 </div>
                 <p className="text-zinc-500 text-lg md:text-xl max-w-[700px] mx-auto font-medium leading-relaxed mt-8">
                   Step into the future! We invite you to celebrate Bharat's innovation legacy. 
                   Generate your exclusive **Digital Identity Pass** and join the technological revolution.
                 </p>
              </div>

              <button 
                onClick={nextStep}
                className="group relative px-12 py-5 bg-cyan-500 text-black font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_40px_rgba(6,182,212,0.4)]"
              >
                Launch Protocol
                <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}

          {step === 'name' && (
            <motion.div 
              key="name"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-[500px] space-y-8"
            >
              <div className="space-y-4">
                <button onClick={prevStep} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                </button>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">First, What's your name?</h2>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-600 group-focus-within:text-cyan-500 transition-colors" />
                  <input 
                    autoFocus
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && data.name && nextStep()}
                    placeholder="Enter full name..."
                    className="w-full pl-16 pr-6 py-6 bg-zinc-900/50 border-2 border-zinc-800 rounded-3xl text-2xl font-bold focus:border-cyan-500 outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>
              <button 
                disabled={!data.name}
                onClick={nextStep}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl disabled:opacity-30 transition-all active:scale-95"
              >
                Proceed to Identity Scan
              </button>
            </motion.div>
          )}

          {step === 'photo' && (
            <motion.div 
              key="photo"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-[500px] space-y-8 text-center"
            >
               <div className="space-y-4 text-left">
                <button onClick={prevStep} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                </button>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Identity Verification</h2>
                <p className="text-zinc-500">Position yourself in the center for the holographic scan.</p>
              </div>

              <div className="relative rounded-3xl overflow-hidden border-4 border-zinc-800 bg-zinc-900 aspect-square group shadow-2xl">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    facingMode: 'user',
                  }}
                  onUserMediaError={(err) => {
                    console.error("Webcam Error:", err);
                    // Standard device not found often means no camera or permission denied
                    if (err instanceof Error && err.name === 'NotFoundError') {
                       alert("Camera not found. Please ensure your device has a camera or use the 'Upload ID Photo' option below.");
                    } else if (err instanceof Error && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
                       alert("Camera permission denied. Please grant camera access in your browser settings to proceed with the holographic scan.");
                    } else {
                       alert("Unable to access camera. Please check your connections and permissions, or upload a photo instead.");
                    }
                  }}
                  className="w-full h-full object-cover scale-x-[-1]"
                  mirrored={false}
                  imageSmoothing={true}
                  forceScreenshotSourceSize={false}
                  disablePictureInPicture={true}
                  onUserMedia={() => {}}
                  screenshotQuality={0.92}
                />
                
                {/* Scanning HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none z-10">
                  <div className="absolute inset-[20px] border border-cyan-500/20 rounded-2xl" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.8)] animate-[hud-scan_3s_ease-in-out_infinite]" />
                  <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-cyan-500" />
                  <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-cyan-500" />
                  <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-cyan-500" />
                  <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-cyan-500" />
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-20">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Live Identity Scan</span>
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={capturePhoto}
                  className="w-full py-6 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all active:scale-95 flex items-center justify-center gap-4"
                >
                  <Camera className="w-6 h-6" />
                  Confirm Holographic Scan
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-zinc-800" />
                  <span className="text-[10px] font-bold text-zinc-600 uppercase">Or</span>
                  <div className="h-[1px] flex-1 bg-zinc-800" />
                </div>

                <button 
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (re) => {
                          setData({ ...data, photo: re.target?.result as string });
                          setStep('department');
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                  className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest rounded-2xl hover:text-white hover:border-zinc-600 transition-all text-xs"
                >
                  Upload ID Photo Instead
                </button>
              </div>
            </motion.div>
          )}

          {step === 'department' && (
            <motion.div 
              key="department"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-[800px] space-y-8"
            >
              <div className="space-y-4">
                <button onClick={prevStep} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                </button>
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Select your Sector</h2>
                <p className="text-zinc-500">Each department carries its own unique tech blueprint.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setData({ ...data, department: dept });
                      setStep('result');
                    }}
                    className={`group relative p-6 rounded-2xl border-2 transition-all text-left overflow-hidden ${
                      data.department === dept 
                        ? 'border-cyan-500 bg-cyan-500/10' 
                        : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                  >
                    <div className="relative z-10">
                      <span className="block text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Sector</span>
                      <h3 className="text-xl font-bold uppercase tracking-tighter">{dept}</h3>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Cpu className="w-12 h-12" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center gap-12"
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg inline-flex">
                   <CheckCircle2 className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Protocol Success • Pass Verified</span>
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tight">Your Digital Identity is Ready</h2>
              </div>

              <div className="relative p-2 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl">
                 <WelcomeCard data={data} cardRef={cardRef} />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-[800px]">
                 <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <button 
                      onClick={handleDownload}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all active:scale-95 text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      <Download className="w-4 h-4" />
                      Save Pass
                    </button>
                    <button 
                      onClick={copyCaption}
                      className="flex items-center justify-center gap-3 px-6 py-4 bg-zinc-800 text-white font-black uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-all active:scale-95 text-xs border border-zinc-700"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      Copy Caption
                    </button>
                 </div>

                 <div className="flex flex-col gap-3 w-full md:w-auto">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center md:text-left">Social Identity Upload</span>
                    <div className="flex items-center justify-center gap-4">
                       {[
                         { id: 'linkedin', icon: Linkedin, color: 'hover:text-blue-500' },
                         { id: 'whatsapp', icon: Share2, color: 'hover:text-green-500' },
                         { id: 'facebook', icon: Facebook, color: 'hover:text-blue-600' },
                         { id: 'instagram', icon: Instagram, color: 'hover:text-pink-500' }
                       ].map((social) => (
                         <button 
                            key={social.id}
                            onClick={() => shareOnSocial(social.id as any)}
                            className={`p-4 bg-zinc-900 border border-zinc-800 rounded-xl ${social.color} transition-all hover:border-zinc-700 active:scale-95`}
                            title={`Share on ${social.id}`}
                         >
                            <social.icon className="w-6 h-6" />
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => setStep('welcome')}
                className="text-zinc-600 hover:text-cyan-500 transition-colors uppercase font-bold tracking-widest text-xs flex items-center gap-2"
              >
                <div className="w-4 h-[1px] bg-zinc-800" />
                Initialize New Pass Session
                <div className="w-4 h-[1px] bg-zinc-800" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes hud-scan {
          0% { transform: translateY(-150px); }
          100% { transform: translateY(150px); }
        }
        .perspective-1000 { perspective: 1000px; }
        @media print {
          @page { margin: 0; }
          body { background: white !important; color: black !important; }
          header, .fixed, main > div:not([key="result"]), button, .share-section {
            display: none !important;
          }
          main { padding: 0 !important; margin: 0 !important; }
          #welcome-card {
            box-shadow: none !important;
            border: 1px solid #000 !important;
            margin: 0 auto !important;
            page-break-inside: avoid;
            scale: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

