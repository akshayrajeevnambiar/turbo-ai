import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const cmsConfigured = Boolean(url && key);
export const cmsPublicEnabled = cmsConfigured && import.meta.env.VITE_CMS_ENABLED === "true";

export const cmsClient: SupabaseClient | null = cmsConfigured
  ? createClient(url!, key!, {
      auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
    })
  : null;

export const mediaBucket = "cms-media";
