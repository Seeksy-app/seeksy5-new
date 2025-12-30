// Global module augmentation to override the empty Database type
// This intercepts the @/integrations/supabase/types import and provides our complete types

import type { Database as CustomDatabase } from './database';

// Override the Database type exported from integrations/supabase/types
declare module '../integrations/supabase/types' {
  export type Database = CustomDatabase;
  
  export type Tables<
    DefaultSchemaTableNameOrOptions extends
      | keyof (CustomDatabase["public"]["Tables"] & CustomDatabase["public"]["Views"])
      | { schema: keyof CustomDatabase },
    TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof CustomDatabase
    }
      ? keyof (CustomDatabase[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          CustomDatabase[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
      : never = never,
  > = DefaultSchemaTableNameOrOptions extends { schema: keyof CustomDatabase }
    ? (CustomDatabase[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        CustomDatabase[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
        Row: infer R
      }
      ? R
      : never
    : DefaultSchemaTableNameOrOptions extends keyof (CustomDatabase["public"]["Tables"] &
          CustomDatabase["public"]["Views"])
      ? (CustomDatabase["public"]["Tables"] &
          CustomDatabase["public"]["Views"])[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R
        }
        ? R
        : never
      : never;
}

// Also augment the path alias version
declare module '@/integrations/supabase/types' {
  export type Database = CustomDatabase;
}
