const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log(`Connecting to: ${supabaseUrl}`);
console.log(`Service Key length: ${supabaseServiceKey?.length || 0}`);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verify() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
        console.error('Error fetching products:', error.message);
    } else {
        console.log(`Found ${data.length} products in the database.`);
        data.forEach(p => {
            console.log(`- ${p.name} (${p.id})`);
            console.log(`  Images: ${JSON.stringify(p.images)}`);
        });
    }
}

verify();
