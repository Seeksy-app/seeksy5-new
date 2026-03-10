import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

interface EmailGateProps {
  onSubmit: (email: string) => void;
}

export function EmailGate({ onSubmit }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);
    await onSubmit(email);
    setLoading(false);
  };

  return (
    <section
      className="w-full min-h-screen flex items-center justify-center px-6"
      style={{
        background: "linear-gradient(180deg, hsl(var(--muted)/0.25) 0%, hsl(var(--background)) 100%)",
      }}
    >
      <div className="mx-auto max-w-[560px] w-full text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-bold uppercase"
          style={{
            fontSize: "12px",
            letterSpacing: "2px",
            color: "#2C6BED",
            marginBottom: "18px",
          }}
        >
          Explore the platform
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-black"
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.02,
            letterSpacing: "-2px",
            color: "#0B1220",
          }}
        >
          Seeksy App{" "}
          <span style={{ color: "#2C6BED" }}>Directory.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            fontSize: "18px",
            lineHeight: 1.55,
            color: "#667085",
            marginTop: "16px",
            maxWidth: "460px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Enter your email to explore our full suite of 35+ creator tools and 7 curated bundles.
        </motion.p>

        {/* Email Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mx-auto"
          style={{ marginTop: "32px", maxWidth: "440px" }}
        >
          <div className="relative flex-1 w-full">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#9CA3AF" }} />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-[52px] text-base rounded-full border"
              style={{ borderColor: "#E6EAF2" }}
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="rounded-full font-semibold w-full sm:w-auto whitespace-nowrap"
            style={{
              background: "#2C6BED",
              height: "52px",
              paddingLeft: "28px",
              paddingRight: "28px",
              fontSize: "16px",
            }}
            disabled={loading || !email.includes("@")}
          >
            {loading ? "Loading..." : "View Apps"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.form>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="text-xs"
          style={{ color: "#6B7280", marginTop: "14px" }}
        >
          No signup required · We just want to know who's interested
        </motion.p>
      </div>
    </section>
  );
}
