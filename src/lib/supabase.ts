import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
// For now, using placeholder values - you'll need to update these
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Note: Make sure to create a 'chat_messages' table in your Supabase database with the following schema:
// - id: uuid (primary key, default: uuid_generate_v4())
// - session_id: text
// - user_message: text
// - bot_response: text
// - created_at: timestamp (default: now())

