// Fully permissive Database type - allows any table, any column, any relation
// This is an interim solution until the auto-generated types cover all tables

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTable = {
  Row: Record<string, any> & { [key: string]: any }
  Insert: Record<string, any> & { [key: string]: any }
  Update: Record<string, any> & { [key: string]: any }
  Relationships: any[]
}

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: Record<string, AnyTable> & { [key: string]: AnyTable }
    Views: Record<string, { Row: Record<string, any>; Relationships: any[] }>
    Functions: Record<string, { Args: Record<string, any>; Returns: any }>
    Enums: Record<string, string>
    CompositeTypes: Record<string, any>
  }
}
