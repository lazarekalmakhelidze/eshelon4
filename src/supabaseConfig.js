// Supabase პროექტის მონაცემები (anon key საჯაროა, საიდუმლო არ არის).
export const SUPABASE_URL = '';
export const SUPABASE_ANON_KEY = '';

// ვის შეუძლია ადმინ პანელიდან ცვლილებების შენახვა
export const ADMIN_EMAILS = ['kalmakhelidzelazare@gmail.com'];

export const IMAGE_BUCKET = 'site-images';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
