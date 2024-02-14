import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@gooddads/types/database.ts';

export default createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
