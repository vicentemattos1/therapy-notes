// src/types/supabase.ts
export type Database = {
  app: {
    Tables: {
      notes: {
        Row: {
          id: string;                
          client_name: string;
          session_date: string;      
          notes: string;
          duration: number;
          created_at: string;        
          updated_at: string;        
        };
        Insert: {
          id?: string;
          client_name: string;
          session_date: string;      
          notes: string;
          duration: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<{
          client_name: string;
          session_date: string;
          notes: string;
          duration: number;
          created_at: string;
          updated_at: string;
        }>;
        Relationships: [];           
      };
    };
    Views: object;
    Functions: object;
    Enums: object;
    CompositeTypes: object;
  };
};
