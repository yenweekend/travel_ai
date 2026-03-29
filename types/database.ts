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
    PostgrestVersion: '14.4'
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ai_itineraries: {
        Row: {
          budget: number | null
          created_at: string | null
          destination_name: string | null
          duration_days: number | null
          id: string
          num_people: number | null
          prompt: string
          result: Json
          title: string | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          destination_name?: string | null
          duration_days?: number | null
          id?: string
          num_people?: number | null
          prompt: string
          result: Json
          title?: string | null
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          destination_name?: string | null
          duration_days?: number | null
          id?: string
          num_people?: number | null
          prompt?: string
          result?: Json
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'ai_itineraries_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      ai_prompt_logs: {
        Row: {
          created_at: string | null
          id: string
          model: string | null
          prompt: string
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          model?: string | null
          prompt: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          model?: string | null
          prompt?: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'ai_prompt_logs_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      amenities: {
        Row: {
          category: string | null
          created_at: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      attractions: {
        Row: {
          created_at: string | null
          description: string | null
          destination_id: string
          entry_fee: number | null
          id: string
          image_url: string | null
          name: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          destination_id: string
          entry_fee?: number | null
          id?: string
          image_url?: string | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          destination_id?: string
          entry_fee?: number | null
          id?: string
          image_url?: string | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'attractions_destination_id_fkey'
            columns: ['destination_id']
            isOneToOne: false
            referencedRelation: 'destinations'
            referencedColumns: ['id']
          },
        ]
      }
      destination_images: {
        Row: {
          caption: string | null
          created_at: string | null
          destination_id: string
          id: string
          image_url: string
          sort_order: number | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          destination_id: string
          id?: string
          image_url: string
          sort_order?: number | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          destination_id?: string
          id?: string
          image_url?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'destination_images_destination_id_fkey'
            columns: ['destination_id']
            isOneToOne: false
            referencedRelation: 'destinations'
            referencedColumns: ['id']
          },
        ]
      }
      destination_tags: {
        Row: {
          destination_id: string
          tag_id: string
        }
        Insert: {
          destination_id: string
          tag_id: string
        }
        Update: {
          destination_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'destination_tags_destination_id_fkey'
            columns: ['destination_id']
            isOneToOne: false
            referencedRelation: 'destinations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'destination_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      destinations: {
        Row: {
          avg_rating: number | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          destination_type:
            | Database['public']['Enums']['destination_type']
            | null
          id: string
          is_featured: boolean | null
          min_price: number | null
          name: string
          province: string | null
          region: string | null
          review_count: number | null
          slug: string
          suggested_days: number | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          avg_rating?: number | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          destination_type?:
            | Database['public']['Enums']['destination_type']
            | null
          id?: string
          is_featured?: boolean | null
          min_price?: number | null
          name: string
          province?: string | null
          region?: string | null
          review_count?: number | null
          slug: string
          suggested_days?: number | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          avg_rating?: number | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          destination_type?:
            | Database['public']['Enums']['destination_type']
            | null
          id?: string
          is_featured?: boolean | null
          min_price?: number | null
          name?: string
          province?: string | null
          region?: string | null
          review_count?: number | null
          slug?: string
          suggested_days?: number | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      hotel_amenities: {
        Row: {
          amenity_id: string
          hotel_id: string
        }
        Insert: {
          amenity_id: string
          hotel_id: string
        }
        Update: {
          amenity_id?: string
          hotel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'hotel_amenities_amenity_id_fkey'
            columns: ['amenity_id']
            isOneToOne: false
            referencedRelation: 'amenities'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'hotel_amenities_hotel_id_fkey'
            columns: ['hotel_id']
            isOneToOne: false
            referencedRelation: 'hotels'
            referencedColumns: ['id']
          },
        ]
      }
      hotel_images: {
        Row: {
          caption: string | null
          created_at: string | null
          hotel_id: string
          id: string
          image_url: string
          sort_order: number | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          hotel_id: string
          id?: string
          image_url: string
          sort_order?: number | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          hotel_id?: string
          id?: string
          image_url?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'hotel_images_hotel_id_fkey'
            columns: ['hotel_id']
            isOneToOne: false
            referencedRelation: 'hotels'
            referencedColumns: ['id']
          },
        ]
      }
      hotel_tags: {
        Row: {
          hotel_id: string
          tag_id: string
        }
        Insert: {
          hotel_id: string
          tag_id: string
        }
        Update: {
          hotel_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'hotel_tags_hotel_id_fkey'
            columns: ['hotel_id']
            isOneToOne: false
            referencedRelation: 'hotels'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'hotel_tags_tag_id_fkey'
            columns: ['tag_id']
            isOneToOne: false
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      hotels: {
        Row: {
          address: string | null
          avg_rating: number | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          destination_id: string | null
          id: string
          is_featured: boolean | null
          latitude: number | null
          longitude: number | null
          min_price: number | null
          name: string
          province: string | null
          review_count: number | null
          slug: string
          star_rating: number | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          address?: string | null
          avg_rating?: number | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          destination_id?: string | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          min_price?: number | null
          name: string
          province?: string | null
          review_count?: number | null
          slug: string
          star_rating?: number | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          address?: string | null
          avg_rating?: number | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          destination_id?: string | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          min_price?: number | null
          name?: string
          province?: string | null
          review_count?: number | null
          slug?: string
          star_rating?: number | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'hotels_destination_id_fkey'
            columns: ['destination_id']
            isOneToOne: false
            referencedRelation: 'destinations'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: Database['public']['Enums']['user_role'] | null
          status: Database['public']['Enums']['user_status'] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database['public']['Enums']['user_role'] | null
          status?: Database['public']['Enums']['user_status'] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database['public']['Enums']['user_role'] | null
          status?: Database['public']['Enums']['user_status'] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      review_likes: {
        Row: {
          created_at: string | null
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'review_likes_review_id_fkey'
            columns: ['review_id']
            isOneToOne: false
            referencedRelation: 'reviews'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'review_likes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      review_reports: {
        Row: {
          admin_note: string | null
          created_at: string | null
          id: string
          reason: string | null
          reporter_id: string
          resolved_at: string | null
          resolved_by: string | null
          review_id: string
          status: Database['public']['Enums']['report_status'] | null
        }
        Insert: {
          admin_note?: string | null
          created_at?: string | null
          id?: string
          reason?: string | null
          reporter_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          review_id: string
          status?: Database['public']['Enums']['report_status'] | null
        }
        Update: {
          admin_note?: string | null
          created_at?: string | null
          id?: string
          reason?: string | null
          reporter_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          review_id?: string
          status?: Database['public']['Enums']['report_status'] | null
        }
        Relationships: [
          {
            foreignKeyName: 'review_reports_reporter_id_fkey'
            columns: ['reporter_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'review_reports_resolved_by_fkey'
            columns: ['resolved_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'review_reports_review_id_fkey'
            columns: ['review_id']
            isOneToOne: false
            referencedRelation: 'reviews'
            referencedColumns: ['id']
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          is_visible: boolean | null
          like_count: number | null
          rating: number
          target_id: string
          target_type: Database['public']['Enums']['review_target_type']
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          is_visible?: boolean | null
          like_count?: number | null
          rating: number
          target_id: string
          target_type: Database['public']['Enums']['review_target_type']
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          is_visible?: boolean | null
          like_count?: number | null
          rating?: number
          target_id?: string
          target_type?: Database['public']['Enums']['review_target_type']
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      room_amenities: {
        Row: {
          amenity_id: string
          room_type_id: string
        }
        Insert: {
          amenity_id: string
          room_type_id: string
        }
        Update: {
          amenity_id?: string
          room_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'room_amenities_amenity_id_fkey'
            columns: ['amenity_id']
            isOneToOne: false
            referencedRelation: 'amenities'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'room_amenities_room_type_id_fkey'
            columns: ['room_type_id']
            isOneToOne: false
            referencedRelation: 'room_types'
            referencedColumns: ['id']
          },
        ]
      }
      room_types: {
        Row: {
          bed_type: string | null
          created_at: string | null
          description: string | null
          hotel_id: string
          id: string
          image_url: string | null
          is_available: boolean | null
          max_guests: number | null
          name: string
          price_per_night: number
          room_size: number | null
          updated_at: string | null
        }
        Insert: {
          bed_type?: string | null
          created_at?: string | null
          description?: string | null
          hotel_id: string
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          max_guests?: number | null
          name: string
          price_per_night: number
          room_size?: number | null
          updated_at?: string | null
        }
        Update: {
          bed_type?: string | null
          created_at?: string | null
          description?: string | null
          hotel_id?: string
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          max_guests?: number | null
          name?: string
          price_per_night?: number
          room_size?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'room_types_hotel_id_fkey'
            columns: ['hotel_id']
            isOneToOne: false
            referencedRelation: 'hotels'
            referencedColumns: ['id']
          },
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      tour_itineraries: {
        Row: {
          created_at: string | null
          day_number: number
          description: string | null
          id: string
          sort_order: number | null
          title: string
          tour_id: string
        }
        Insert: {
          created_at?: string | null
          day_number: number
          description?: string | null
          id?: string
          sort_order?: number | null
          title: string
          tour_id: string
        }
        Update: {
          created_at?: string | null
          day_number?: number
          description?: string | null
          id?: string
          sort_order?: number | null
          title?: string
          tour_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'tour_itineraries_tour_id_fkey'
            columns: ['tour_id']
            isOneToOne: false
            referencedRelation: 'tours'
            referencedColumns: ['id']
          },
        ]
      }
      tours: {
        Row: {
          avg_rating: number | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          destination_id: string | null
          duration_days: number
          id: string
          is_active: boolean | null
          max_group_size: number | null
          name: string
          price: number
          review_count: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          avg_rating?: number | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          destination_id?: string | null
          duration_days: number
          id?: string
          is_active?: boolean | null
          max_group_size?: number | null
          name: string
          price: number
          review_count?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          avg_rating?: number | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          destination_id?: string | null
          duration_days?: number
          id?: string
          is_active?: boolean | null
          max_group_size?: number | null
          name?: string
          price?: number
          review_count?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'tours_destination_id_fkey'
            columns: ['destination_id']
            isOneToOne: false
            referencedRelation: 'destinations'
            referencedColumns: ['id']
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string | null
          id: string
          target_id: string
          target_type: Database['public']['Enums']['wishlist_target_type']
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          target_id: string
          target_type: Database['public']['Enums']['wishlist_target_type']
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          target_id?: string
          target_type?: Database['public']['Enums']['wishlist_target_type']
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'wishlists_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { '': string }; Returns: string[] }
    }
    Enums: {
      destination_type:
        | 'beach'
        | 'mountain'
        | 'culture'
        | 'city'
        | 'countryside'
        | 'island'
      report_status: 'pending' | 'reviewed' | 'dismissed'
      review_target_type: 'destination' | 'hotel' | 'tour'
      user_role: 'user' | 'admin'
      user_status: 'active' | 'banned'
      wishlist_target_type: 'destination' | 'hotel'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      destination_type: [
        'beach',
        'mountain',
        'culture',
        'city',
        'countryside',
        'island',
      ],
      report_status: ['pending', 'reviewed', 'dismissed'],
      review_target_type: ['destination', 'hotel', 'tour'],
      user_role: ['user', 'admin'],
      user_status: ['active', 'banned'],
      wishlist_target_type: ['destination', 'hotel'],
    },
  },
} as const
