/**
 * Generated Supabase Database Types
 * Schema: identity, geo, catalog, directory, community, commerce, marketing, trust, intelligence, operations, public
 * Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  geo: {
    Tables: {
      countries: {
        Row: {
          id: string;
          iso_alpha2: string;
          iso_alpha3: string;
          iso_numeric: string;
          name: string;
          official_name: string | null;
          currency_code: string;
          currency_symbol: string;
          phone_prefix: string;
          primary_language: string;
          latitude: number | null;
          longitude: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['geo']['Tables']['countries']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['geo']['Tables']['countries']['Insert']>;
      };
      administrative_units: {
        Row: {
          id: string;
          country_id: string;
          parent_id: string | null;
          level_id: number;
          official_code: string | null;
          name: string;
          slug: string;
          type: string;
          latitude: number | null;
          longitude: number | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['geo']['Tables']['administrative_units']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['geo']['Tables']['administrative_units']['Insert']>;
      };
    };
  };
  identity: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          phone_verified: boolean;
          avatar_url: string | null;
          preferred_locale: string;
          is_active: boolean;
          is_verified: boolean;
          last_login_at: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['identity']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['identity']['Tables']['profiles']['Insert']>;
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          legal_name: string | null;
          slug: string;
          gstin: string | null;
          pan: string | null;
          website_url: string | null;
          support_email: string | null;
          support_phone: string | null;
          is_verified: boolean;
          verification_tier: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['identity']['Tables']['organizations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['identity']['Tables']['organizations']['Insert']>;
      };
    };
  };
  community: {
    Tables: {
      groups: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          platform: string;
          invite_url: string;
          status: string;
          category_id: string;
          member_count: number;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['community']['Tables']['groups']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['community']['Tables']['groups']['Insert']>;
      };
    };
  };
  directory: {
    Tables: {
      businesses: {
        Row: {
          id: string;
          name: string;
          slug: string;
          organization_id: string | null;
          category_id: string;
          is_verified: boolean;
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['directory']['Tables']['businesses']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['directory']['Tables']['businesses']['Insert']>;
      };
    };
  };
}
