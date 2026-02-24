const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listFiles() {
    console.log('Listing files in "product-assets" bucket...');
    const { data, error } = await supabase.storage.from('product-assets').list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
    });

    if (error) {
        console.error('Error listing files:', error.message);
    } else {
        console.log(`Found ${data.length} files:`);
        data.forEach(f => console.log(`- ${f.name}`));
    }
}

listFiles();
