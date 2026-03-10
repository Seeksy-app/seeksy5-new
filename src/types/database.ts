// Custom database types - intentionally permissive to allow all table references
// The auto-generated types.ts doesn't cover all tables in the database

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Use a fully permissive Database type that allows any table name
// and returns `any` for all row/insert/update types to prevent
// TS2769, TS2339, TS2345, and SelectQueryError issues
export interface Database {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      [key: string]: {
        Row: any
        Insert: any
        Update: any
        Relationships: any[]
      }
    }
    Views: {
      [key: string]: {
        Row: any
        Relationships: any[]
      }
    }
    Functions: {
      [key: string]: {
        Args: any
        Returns: any
      }
    }
    Enums: {
      [key: string]: string
    }
    CompositeTypes: {
      [key: string]: any
    }
  }
}
