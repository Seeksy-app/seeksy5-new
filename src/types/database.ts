// Permissive Database type for Supabase SDK
// Uses a wildcard relationship pattern to prevent SelectQueryError

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// A relationship entry that should match any relation name
type WildcardRelationship = {
  foreignKeyName: string
  columns: [string]
  isOneToOne: false
  referencedRelation: string
  referencedColumns: [string]
}

export interface Database {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      [tableName: string]: {
        Row: Record<string, any>
        Insert: Record<string, any>
        Update: Record<string, any>
        Relationships: [WildcardRelationship]
      }
    }
    Views: {
      [viewName: string]: {
        Row: Record<string, any>
        Relationships: [WildcardRelationship]
      }
    }
    Functions: {
      [fnName: string]: {
        Args: Record<string, any>
        Returns: any
      }
    }
    Enums: {
      [enumName: string]: string
      account_type: 'creator' | 'advertiser' | 'listener'
    }
    CompositeTypes: {
      [typeName: string]: unknown
    }
  }
}
