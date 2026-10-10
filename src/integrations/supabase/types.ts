export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      booking_requests: {
        Row: {
          additional_information: string
          city: string
          company_name: string
          country: string
          created_at: string
          email: string
          estimated_budget: string
          full_name: string
          id: string
          language: string
          objectives: string
          phone: string
          preferred_contact_method: string
          preferred_date: string
          project_description: string
          project_timeline: string
          project_title: string
          requirements: string
          service_title: string
          status: string
        }
        Insert: {
          additional_information?: string
          city: string
          company_name?: string
          country: string
          created_at?: string
          email: string
          estimated_budget?: string
          full_name: string
          id?: string
          language?: string
          objectives: string
          phone: string
          preferred_contact_method: string
          preferred_date: string
          project_description: string
          project_timeline: string
          project_title: string
          requirements?: string
          service_title: string
          status?: string
        }
        Update: {
          additional_information?: string
          city?: string
          company_name?: string
          country?: string
          created_at?: string
          email?: string
          estimated_budget?: string
          full_name?: string
          id?: string
          language?: string
          objectives?: string
          phone?: string
          preferred_contact_method?: string
          preferred_date?: string
          project_description?: string
          project_timeline?: string
          project_title?: string
          requirements?: string
          service_title?: string
          status?: string
        }
        Relationships: []
      }
      collaborators: {
        Row: {
          biography: string
          country: string
          created_at: string
          id: string
          image: string
          name: string
          occupation: string
          profile_url: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          biography?: string
          country: string
          created_at?: string
          id?: string
          image?: string
          name: string
          occupation: string
          profile_url?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          biography?: string
          country?: string
          created_at?: string
          id?: string
          image?: string
          name?: string
          occupation?: string
          profile_url?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          availability: string
          created_at: string
          email: string
          experience: string
          full_name: string
          id: string
          location: string
          message: string
          opportunity_type: string
          phone: string
          portfolio_url: string
          service_title: string
          status: string
        }
        Insert: {
          availability?: string
          created_at?: string
          email: string
          experience: string
          full_name: string
          id?: string
          location: string
          message: string
          opportunity_type: string
          phone: string
          portfolio_url?: string
          service_title: string
          status?: string
        }
        Update: {
          availability?: string
          created_at?: string
          email?: string
          experience?: string
          full_name?: string
          id?: string
          location?: string
          message?: string
          opportunity_type?: string
          phone?: string
          portfolio_url?: string
          service_title?: string
          status?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          category: string
          created_at: string
          id: string
          image: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          image?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          image?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          categories: string[]
          created_at: string
          demo_link: string
          description: string
          featured: boolean
          github_link: string
          id: string
          image: string
          sort_order: number
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          categories?: string[]
          created_at?: string
          demo_link?: string
          description?: string
          featured?: boolean
          github_link?: string
          id?: string
          image?: string
          sort_order?: number
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Update: {
          categories?: string[]
          created_at?: string
          demo_link?: string
          description?: string
          featured?: boolean
          github_link?: string
          id?: string
          image?: string
          sort_order?: number
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          id: string
          num: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          num?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          num?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_text: string
          competition_image: string
          contact_email: string
          content: Json
          facebook: string
          github: string
          hero_stats: Json
          hero_subtitle: string
          hero_title: string
          id: boolean
          instagram: string
          linkedin: string
          location: string
          logo_url: string
          phone_number: string
          updated_at: string
        }
        Insert: {
          about_text?: string
          competition_image?: string
          contact_email?: string
          content?: Json
          facebook?: string
          github?: string
          hero_stats?: Json
          hero_subtitle?: string
          hero_title?: string
          id?: boolean
          instagram?: string
          linkedin?: string
          location?: string
          logo_url?: string
          phone_number?: string
          updated_at?: string
        }
        Update: {
          about_text?: string
          competition_image?: string
          contact_email?: string
          content?: Json
          facebook?: string
          github?: string
          hero_stats?: Json
          hero_subtitle?: string
          hero_title?: string
          id?: boolean
          instagram?: string
          linkedin?: string
          location?: string
          logo_url?: string
          phone_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string
          icon: string
          id: string
          level: number
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon?: string
          id?: string
          level?: number
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          level?: number
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          description: string
          id: string
          image: string
          name: string
          role: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          image?: string
          name?: string
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image?: string
          name?: string
          role?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
