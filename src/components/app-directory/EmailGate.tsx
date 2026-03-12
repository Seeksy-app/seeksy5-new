import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/app-directory-hero-bg.jpg";
import seeksyLogo from "@/assets/seeksy-logo-orange.png";

interface EmailGateProps {
  onSubmit: (email: string) => void;
}

export function EmailGate({ onSubmit }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heroBg;
    const signal = () => window.dispatchEvent(new CustomEvent("seeksy:hero-ready"));
    if (img.complete) signal();
    else { img.onload = signal; img.onerror = signal; }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);
    await onSubmit(email);
    setLoading(false);
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)", top: "10%", right: "-10%" }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", bottom: "5%", left: "-5%" }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-[640px] w-full text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <img src={seeksyLogo} alt="Seeksy" className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-bold text-white tracking-tight">Seeksy</span>
          </div>
        </motion.div>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[2px] text-amber-300 border border-amber-400/30" style={{ background: "rgba(251,191,36,0.1)" }}>
            <Sparkles className="h-3.5 w-3.5" />
            35+ AI-Powered Apps
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white font-black leading-[1.05]"
          style={{ fontSize: "clamp(36px, 6vw, 64px)", letterSpacing: "-2px" }}
        >
          The Future of Work,
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            All in One Place.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-base sm:text-lg leading-relaxed text-white/70 mt-5 max-w-[480px] mx-auto"
        >
          Enterprise-grade AI applications for creators, teams, and businesses — available for licensing, partnership, or acquisition.
        </motion.p>

        {/* Email form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 max-w-[480px] mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-white/40" />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-[52px] text-base rounded-xl border-0 bg-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-amber-400/40 focus:bg-white/15 transition-all"
                required
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="rounded-xl font-bold w-full sm:w-auto whitespace-nowrap text-white shadow-lg hover:shadow-xl transition-all h-[52px] px-8 text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 border-0"
              disabled={loading || !email.includes("@")}
            >
              {loading ? "Loading..." : "Explore Apps"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.form>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="mt-6 flex items-center justify-center gap-6 text-xs text-white/40"
        >
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            No signup required
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Instant access
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Enterprise ready
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
