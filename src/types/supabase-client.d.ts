// Type declarations for the @/integrations/supabase/client path alias
// This file tells TypeScript to use our properly typed client

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database';

// Re-declare the module that all 768 files import from
declare module '@/integrations/supabase/client' {
  export const supabase: SupabaseClient<Database>;
  export type { Database };
}
