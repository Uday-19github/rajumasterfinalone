import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDanceGallery() {
  console.log('🚀 Updating Dance Gallery YouTube URLs...');

  // Goal: ensure Dance Gallery shows the intended “previous videos” list
  // AND the latest two videos (third.mp4 and four.mp4) are included.

  // Adjust this list to match the exact filenames that should appear
  // in the Dance Gallery container.
  const PREVIOUS_DANCE_MEDIA = [
    // “Previous media” bundled in the build output.
    // Added to Supabase so VideoGallerySection can render them.

    // Videos
    '/dist/videos/475521.mp4',
    '/dist/videos/475523 (1).mp4',
    '/dist/videos/475529 (3).mp4',

    // Images (11 more in dist/images)
    '/dist/images/image.png',
    '/dist/images/image copy 2.png',
    '/dist/images/image copy 3.png',
    '/dist/images/image copy 4.png',
    '/dist/images/image copy 5.png',
    '/dist/images/image copy 6.png',
    '/dist/images/image copy 7.png',
    '/dist/images/image copy 8.png',
    '/dist/images/image copy 9.png',
    '/dist/images/image copy 10.png',
    '/dist/images/image copy.png',
  ];



  const { data: currentRow, error: fetchError } = await supabase
    .from('content')
    .select('meta')
    .eq('section_key', 'dance_gallery')
    .single();

  if (fetchError) {
    console.error('❌ Error fetching current dance_gallery row:', fetchError);
    process.exit(1);
  }

  const currentMedia = Array.isArray(currentRow?.meta?.media)
    ? currentRow.meta.media
    : [];

  // Keep anything that already exists in DB (to preserve manually curated entries),
  // but force-add our known previous + latest assets.
  const forced = [
    ...PREVIOUS_DANCE_MEDIA,
    '/src/assets/third.mp4',
    '/src/assets/four.mp4',
  ];


  // De-dupe while preserving order: existing first, then forced additions.
  const seen = new Set();
  const newMedia = [];
  for (const item of [...currentMedia, ...forced]) {
    if (!item) continue;
    if (seen.has(item)) continue;
    seen.add(item);
    newMedia.push(item);
  }



  const { data, error } = await supabase
    .from('content')
    .update({
      meta: {
        media: newMedia
      }
    })
    .eq('section_key', 'dance_gallery');

  if (error) {
    console.error('❌ Error updating database:', error);
    process.exit(1);
  }

  console.log('✅ Successfully updated Dance Gallery media URLs');
  console.log('📊 Updated media array:', newMedia);
}

updateDanceGallery().catch(console.error);