const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Supabase credentials missing.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const productsData = [
    { name: 'Orange Premix', file: '02 ORANGE.jpg', category: 'Specialty' },
    { name: 'Pink Premix', file: '02 PINK.jpg', category: 'Specialty' },
    { name: 'Purple Premix', file: '02 PURPLE.jpg', category: 'Specialty' },
    { name: 'Red Premix', file: '02 RED.jpg', category: 'Specialty' },
    { name: 'Yellow Premix', file: '02 YELLOW.jpg', category: 'Specialty' },
    { name: 'Evermix Kesar Mix', file: '1.jpg', category: 'Regular' },
    { name: 'Evermix Hot Chocolate', file: '2.jpg', category: 'Regular' },
    { name: 'Evermix Rasam', file: '3.jpg', category: 'Regular' },
    { name: 'Evermix Payasum', file: '4.jpg', category: 'Regular' },
    { name: 'Evermix Methi Gota', file: '5.jpg', category: 'Regular' },
    { name: 'Evermix Podi Masala', file: '6.jpg', category: 'Regular' },
    { name: 'Evermix Sambhar Masala Kit', file: '7.jpg', category: 'Regular' },
    { name: 'Evermix Idli Chutney', file: '8.jpg', category: 'Regular' },
    { name: 'Evermix Masala Chai', file: '9.jpg', category: 'Regular' },
    { name: 'Evermix Sambhar Kit', file: '10.jpg', category: 'Regular' },
    { name: 'Evermix Upma', file: '11.jpg', category: 'Regular' },
    { name: 'Evermix Sweet Kesari', file: '12.jpg', category: 'Regular' }
];

const videoName = 'upma video .mp4';

async function seed() {
    console.log('Clearing existing products...');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('Seeding products...');
    for (const item of productsData) {
        const publicUrl = `https://umalswpelyzoqzxjgjzf.supabase.co/storage/v1/object/public/product-assets/${encodeURIComponent(item.file)}`;
        const videoUrl = item.file === '1.jpg' || item.file === '02 ORANGE.jpg' || item.file === '5.jpg' // Example logic for video assignment
            ? [`https://umalswpelyzoqzxjgjzf.supabase.co/storage/v1/object/public/product-assets/${encodeURIComponent(videoName)}`]
            : [];

        const { error } = await supabase.from('products').insert({
            name: item.name,
            category: item.category,
            description: `Premium ${item.name} from Evermix. Authentic flavor, consistent quality.`,
            images: [publicUrl],
            videos: videoUrl
        });

        if (error) console.error(`Error inserting ${item.name}:`, error.message);
        else console.log(`Inserted ${item.name}`);
    }
}

seed();
