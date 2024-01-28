import { createClient as createClientPrimitive } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseStorage = new Map();

export const testClient = createClientPrimitive<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: {
        getItem(key) {
          return supabaseStorage.get(key);
        },
        setItem(key, value) {
          supabaseStorage.set(key, value);
        },
        removeItem(key) {
          supabaseStorage.delete(key);
        },
      },
    },
  }
);
