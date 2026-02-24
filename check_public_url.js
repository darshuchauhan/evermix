const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkUrl() {
    const { data } = supabase.storage.from('product-assets').getPublicUrl('1.jpg');
    console.log('Public URL for 1.jpg:');
    console.log(data.publicUrl);
}

checkUrl();
