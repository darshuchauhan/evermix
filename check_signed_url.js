const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSignedUrl() {
    console.log('Generating signed URL for "1.jpg"...');
    const { data, error } = await supabase.storage.from('product-assets').createSignedUrl('1.jpg', 60);

    if (error) {
        console.error('Error creating signed URL:', error.message);
    } else {
        console.log('Signed URL generated:');
        console.log(data.signedUrl);
    }
}

checkSignedUrl();
