import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import seeksyLogo from "@/assets/seeksy-logo-orange.png";

export default function AppDirectoryAccess() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setLoading(true);

    try {
      await (supabase.from("directory_access_logs") as any).insert({
        email: email.trim(),
        source: "app-directory",
      });
    } catch (err) {
      console.error("Failed to log access:", err);
    }

    navigate("/app-directory");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[440px] text-center"
      >
        {/* Logo */}
        <img src={seeksyLogo} alt="Seeksy" className="h-12 w-12 mx-auto mb-6" />

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2" style={{ color: "#0B1220" }}>
          Get Access to the App Directory
        </h1>

        {/* Subtitle */}
        <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
          A suite of 35+ AI-first workplace applications — available for
          enterprise licensing, partnership, or strategic acquisition.
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px]" style={{ color: "#9CA3AF" }} />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-[52px] text-base rounded-xl border"
              style={{ borderColor: "#E5E7EB" }}
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl font-bold text-sm h-[52px]"
            style={{ background: "#2C6BED" }}
            disabled={loading || !email.includes("@")}
          >
            {loading ? "Loading..." : "View Apps"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {/* Trust line */}
        <p className="mt-4 text-xs" style={{ color: "#9CA3AF" }}>
          No signup required · We just want to know who's interested.
        </p>
      </motion.div>
    </div>
  );
}
