import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "prospectus_session";
const EMAIL_KEY = "prospectus_email";

interface ProspectusSession {
  id: string;
  email: string;
  startTime: number;
}

export function useProspectusGate() {
  const [email, setEmail] = useState<string | null>(() => {
    return sessionStorage.getItem(EMAIL_KEY);
  });
  const [sessionId, setSessionId] = useState<string | null>(null);

  // On mount, validate any stored session still exists in the DB
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return;

    const parsed = JSON.parse(stored) as ProspectusSession;

    // Verify the session exists in the database
    (supabase.from("prospectus_sessions") as any)
      .select("id")
      .eq("id", parsed.id)
      .single()
      .then(({ data, error }: any) => {
        if (data && !error) {
          setSessionId(parsed.id);
        } else {
          // Session doesn't exist in DB (e.g., after remix) — clear and re-gate
          sessionStorage.removeItem(SESSION_KEY);
          sessionStorage.removeItem(EMAIL_KEY);
          setEmail(null);
          setSessionId(null);
        }
      });
  }, []);

  const startSession = useCallback(async (inputEmail: string) => {
    const trimmed = inputEmail.trim().toLowerCase();
    
    const { data, error } = await (supabase.from("prospectus_sessions") as any)
      .insert({
        email: trimmed,
        session_start: new Date().toISOString(),
        user_agent: navigator.userAgent,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to start session:", error);
      // Still let them in
      sessionStorage.setItem(EMAIL_KEY, trimmed);
      setEmail(trimmed);
      return;
    }

    const session: ProspectusSession = {
      id: data.id,
      email: trimmed,
      startTime: Date.now(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    sessionStorage.setItem(EMAIL_KEY, trimmed);
    setSessionId(data.id);
    setEmail(trimmed);
  }, []);

  return { email, sessionId, startSession };
}

export function useProspectusPageView(sessionId: string | null, pageName: string) {
  const startTimeRef = useRef(Date.now());
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || !pageName) return;

    startTimeRef.current = Date.now();
    trackedRef.current = false;

    // Log the page view — must await or use .then() to execute
    (supabase.from("prospectus_page_views") as any)
      .insert({
        session_id: sessionId,
        page_name: pageName,
        viewed_at: new Date().toISOString(),
      })
      .then(({ error }: any) => {
        if (error) console.error("Failed to log page view:", error);
        else trackedRef.current = true;
      });

    return () => {
      // Update time spent on unmount
      if (trackedRef.current && sessionId) {
        const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        (supabase.from("prospectus_sessions") as any)
          .update({ 
            duration_seconds: seconds,
            session_end: new Date().toISOString()
          })
          .eq("id", sessionId)
          .then(({ error }: any) => {
            if (error) console.error("Failed to update session duration:", error);
          });
      }
    };
  }, [sessionId, pageName]);
}

export function useUpdateSessionDuration(sessionId: string | null) {
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!sessionId) return;
    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      (supabase.from("prospectus_sessions") as any)
        .update({ duration_seconds: seconds, session_end: new Date().toISOString() })
        .eq("id", sessionId)
        .then(({ error }: any) => {
          if (error) console.error("Failed to update duration:", error);
        });
    }, 30000);

    const handleUnload = () => {
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      // Final update on unload
      (supabase.from("prospectus_sessions") as any)
        .update({ duration_seconds: seconds, session_end: new Date().toISOString() })
        .eq("id", sessionId)
        .then(() => {});
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleUnload);
      // Final update
      const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      (supabase.from("prospectus_sessions") as any)
        .update({ duration_seconds: seconds, session_end: new Date().toISOString() })
        .eq("id", sessionId)
        .then(() => {});
    };
  }, [sessionId]);
}
