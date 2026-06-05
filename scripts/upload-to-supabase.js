import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
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

const BUCKET_NAME = 'media';
const VIDEOS_DIR = './public/videos';

async function uploadVideos() {
  console.log('🚀 Starting video sync to Supabase...');
  
  if (!fs.existsSync(VIDEOS_DIR)) {
    console.error('❌ Videos directory not found at:', VIDEOS_DIR);
    return;
  }

  const files = fs.readdirSync(VIDEOS_DIR).filter(f => f.endsWith('.mp4') || f.endsWith('.mov'));
  
  if (files.length === 0) {
    console.log('ℹ️ No videos found in', VIDEOS_DIR);
    return;
  }

  console.log(`📊 Found ${files.length} videos to upload.`);

  for (const file of files) {
    const filePath = path.join(VIDEOS_DIR, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`📤 Uploading ${file}...`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(file, fileBuffer, {
        contentType: 'video/mp4',
        upsert: true
      });

    if (error) {
      console.error(`❌ Failed to upload ${file}:`, error.message);
    } else {
      const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file);
      console.log(`✅ Success! ${file}`);
      console.log(`🔗 URL: ${urlData.publicUrl}\n`);
    }
  }
  
  console.log('✨ All uploads complete!');
  console.log('👉 Copy the URLs above and paste them into your Admin Dashboard > Pages & Content editor.');
}

uploadVideos();
