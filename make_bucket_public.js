const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function makePublic() {
    console.log('Updating "product-assets" bucket to be PUBLIC...');
    const { data, error } = await supabase.storage.updateBucket('product-assets', {
        public: true
    });

    if (error) {
        console.error('Error updating bucket:', error.message);
    } else {
        console.log('Bucket successfully updated to PUBLIC.');
        console.log(data);
    }
}

makePublic();
