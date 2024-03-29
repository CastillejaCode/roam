export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      days: {
        Row: {
          created_at: string
          date: string | null
          id: string
          order_places: string[] | null
          start_time: string | null
          trip_id: number
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: string
          order_places?: string[] | null
          start_time?: string | null
          trip_id: number
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: string
          order_places?: string[] | null
          start_time?: string | null
          trip_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_days_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          }
        ]
      }
      places: {
        Row: {
          category: string | null
          created_at: string
          day_id: string
          duration: number
          id: string
          lat: number
          lng: number
          name: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          day_id: string
          duration?: number
          id: string
          lat: number
          lng: number
          name?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          day_id?: string
          duration?: number
          id?: string
          lat?: number
          lng?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_places_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "days"
            referencedColumns: ["id"]
          }
        ]
      }
      trips: {
        Row: {
          created_at: string
          current_day: string | null
          id: number
          name: string
          order_days: string[]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_day?: string | null
          id?: number
          name: string
          order_days?: string[]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_day?: string | null
          id?: number
          name?: string
          order_days?: string[]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_places:
        | {
            Args: {
              day: string
            }
            Returns: {
              category: string | null
              created_at: string
              day_id: string
              duration: number
              id: string
              lat: number
              lng: number
              name: string | null
            }[]
          }
        | {
            Args: {
              day_id: number
            }
            Returns: {
              category: string | null
              created_at: string
              day_id: string
              duration: number
              id: string
              lat: number
              lng: number
              name: string | null
            }[]
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
