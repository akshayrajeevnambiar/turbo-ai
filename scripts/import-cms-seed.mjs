import fs from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';

const url = process.env.CMS_SUPABASE_URL;
const secret = process.env.CMS_SUPABASE_SECRET_KEY;
if (!url || !secret) {
  throw new Error('Set CMS_SUPABASE_URL and CMS_SUPABASE_SECRET_KEY in the local shell. Never use a VITE_ prefix for the secret.');
}
const entries = JSON.parse(await fs.readFile('supabase/seed/cms-entries.json', 'utf8'));
const client = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
let inserted = 0;
for (let index = 0; index < entries.length; index += 25) {
  const batch = entries.slice(index, index + 25);
  const { data, error } = await client.from('cms_entries')
    .upsert(batch, { onConflict: 'kind,slug', ignoreDuplicates: true }).select('id');
  if (error) throw error;
  inserted += data?.length || 0;
}
console.log(`Imported ${inserted} new entries. Existing CMS entries were left unchanged.`);
