export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      children: {
        Row: {
          child_support: number;
          contact: string;
          dad_id: string;
          date_of_birth: string;
          id: string;
          name: string;
        };
        Insert: {
          child_support: number;
          contact: string;
          dad_id: string;
          date_of_birth: string;
          id: string;
          name: string;
        };
        Update: {
          child_support?: number;
          contact?: string;
          dad_id?: string;
          date_of_birth?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      class_assignments: {
        Row: {
          class_id: string;
          dad_id: string;
          id: string;
        };
        Insert: {
          class_id: string;
          dad_id: string;
          id: string;
        };
        Update: {
          class_id?: string;
          dad_id?: string;
          id?: string;
        };
        Relationships: [];
      };
      classes: {
        Row: {
          id: string;
          region_id: string;
        };
        Insert: {
          id: string;
          region_id: string;
        };
        Update: {
          id?: string;
          region_id?: string;
        };
        Relationships: [];
      };
      dads: {
        Row: {
          alt_contact_number: string | null;
          cell_phone_number: string | null;
          city: string | null;
          email: string | null;
          employer: string | null;
          ethnicity: Database["public"]["Enums"]["ethnicityenum"] | null;
          home_phone_number: string | null;
          id: string;
          marital_status: Database["public"]["Enums"]["maritalstatus"] | null;
          monthly_child_support: number | null;
          region_id: string | null;
          street_address: string | null;
          user_id: string;
          work_phone_number: string | null;
          zip_code: string | null;
        };
        Insert: {
          alt_contact_number?: string | null;
          cell_phone_number?: string | null;
          city?: string | null;
          email?: string | null;
          employer?: string | null;
          ethnicity?: Database["public"]["Enums"]["ethnicityenum"] | null;
          home_phone_number?: string | null;
          id: string;
          marital_status?: Database["public"]["Enums"]["maritalstatus"] | null;
          monthly_child_support?: number | null;
          region_id?: string | null;
          street_address?: string | null;
          user_id: string;
          work_phone_number?: string | null;
          zip_code?: string | null;
        };
        Update: {
          alt_contact_number?: string | null;
          cell_phone_number?: string | null;
          city?: string | null;
          email?: string | null;
          employer?: string | null;
          ethnicity?: Database["public"]["Enums"]["ethnicityenum"] | null;
          home_phone_number?: string | null;
          id?: string;
          marital_status?: Database["public"]["Enums"]["maritalstatus"] | null;
          monthly_child_support?: number | null;
          region_id?: string | null;
          street_address?: string | null;
          user_id?: string;
          work_phone_number?: string | null;
          zip_code?: string | null;
        };
        Relationships: [];
      };
      module_assignments: {
        Row: {
          description: string;
          event_date: string;
          id: string;
          module_id: string;
        };
        Insert: {
          description: string;
          event_date: string;
          id: string;
          module_id: string;
        };
        Update: {
          description?: string;
          event_date?: string;
          id?: string;
          module_id?: string;
        };
        Relationships: [];
      };
      modules: {
        Row: {
          description: string;
          id: string;
          program_id: string;
        };
        Insert: {
          description: string;
          id: string;
          program_id: string;
        };
        Update: {
          description?: string;
          id?: string;
          program_id?: string;
        };
        Relationships: [];
      };
      program_assignments: {
        Row: {
          class_id: string;
          completed: boolean;
          id: string;
          program_id: string;
          start_date: string;
        };
        Insert: {
          class_id: string;
          completed: boolean;
          id: string;
          program_id: string;
          start_date: string;
        };
        Update: {
          class_id?: string;
          completed?: boolean;
          id?: string;
          program_id?: string;
          start_date?: string;
        };
        Relationships: [];
      };
      programs: {
        Row: {
          description: string;
          id: string;
          length: number;
        };
        Insert: {
          description: string;
          id: string;
          length: number;
        };
        Update: {
          description?: string;
          id?: string;
          length?: number;
        };
        Relationships: [];
      };
      quiz_assignments: {
        Row: {
          answer: string;
          id: string;
          is_correct: boolean;
          quiz_question_id: string;
          quiz_question_option_id: string | null;
          user_id: string;
        };
        Insert: {
          answer: string;
          id: string;
          is_correct: boolean;
          quiz_question_id: string;
          quiz_question_option_id?: string | null;
          user_id: string;
        };
        Update: {
          answer?: string;
          id?: string;
          is_correct?: boolean;
          quiz_question_id?: string;
          quiz_question_option_id?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      quiz_question_options: {
        Row: {
          answer: string;
          id: string;
          is_correct: boolean;
          quiz_question_id: string;
        };
        Insert: {
          answer: string;
          id: string;
          is_correct: boolean;
          quiz_question_id: string;
        };
        Update: {
          answer?: string;
          id?: string;
          is_correct?: boolean;
          quiz_question_id?: string;
        };
        Relationships: [];
      };
      quiz_questions: {
        Row: {
          id: string;
          question: string;
          quiz_id: string;
          type: Database["public"]["Enums"]["quiztype"];
        };
        Insert: {
          id: string;
          question: string;
          quiz_id: string;
          type: Database["public"]["Enums"]["quiztype"];
        };
        Update: {
          id?: string;
          question?: string;
          quiz_id?: string;
          type?: Database["public"]["Enums"]["quiztype"];
        };
        Relationships: [];
      };
      quizzes: {
        Row: {
          description: string;
          id: string;
          module_id: string;
        };
        Insert: {
          description: string;
          id: string;
          module_id: string;
        };
        Update: {
          description?: string;
          id?: string;
          module_id?: string;
        };
        Relationships: [];
      };
      regions: {
        Row: {
          description: string | null;
          id: string;
        };
        Insert: {
          description?: string | null;
          id: string;
        };
        Update: {
          description?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      responsible_parties: {
        Row: {
          id: string;
          phone_number: string;
          role: Database["public"]["Enums"]["roletype"];
          user_id: string;
        };
        Insert: {
          id: string;
          phone_number: string;
          role: Database["public"]["Enums"]["roletype"];
          user_id: string;
        };
        Update: {
          id?: string;
          phone_number?: string;
          role?: Database["public"]["Enums"]["roletype"];
          user_id?: string;
        };
        Relationships: [];
      };
      responsible_party_assignments: {
        Row: {
          dad_id: string;
          id: string;
          responsible_party_id: string;
        };
        Insert: {
          dad_id: string;
          id: string;
          responsible_party_id: string;
        };
        Update: {
          dad_id?: string;
          id?: string;
          responsible_party_id?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: string;
      };
      get_claim: {
        Args: {
          uid: string;
          claim: string;
        };
        Returns: Json;
      };
      get_claims: {
        Args: {
          uid: string;
        };
        Returns: Json;
      };
      get_my_claim: {
        Args: {
          claim: string;
        };
        Returns: Json;
      };
      get_my_claims: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
      is_claims_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      set_claim: {
        Args: {
          uid: string;
          claim: string;
          value: Json;
        };
        Returns: string;
      };
    };
    Enums: {
      ethnicityenum:
        | "white"
        | "africanAmerican"
        | "nativeAmerican"
        | "asian"
        | "pacificIslander";
      maritalstatus: "single" | "married" | "divorced" | "widowed";
      quiztype: "open" | "multipleChoice" | "check";
      roletype: "caseWorker" | "probationOfficer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
