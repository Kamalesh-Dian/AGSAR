import fs from 'fs';
import path from 'path';
import https from 'https';

const downloads = [
  {
    url: 'https://assets.mixkit.co/videos/42416/42416-720.mp4',
    dest: 'public/videos/agsar-hero.mp4'
  },
  {
    url: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/solar.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/bess.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/images/pumps-motors.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const file = fs.createWriteStream(dest);
    
    function get(currentUrl) {
      https.get(currentUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          return get(response.headers.location);
        }
        if (response.statusCode !== 200) {
          return reject(new Error(`Status ${response.statusCode} for ${currentUrl}`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(dest));
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    
    get(url);
  });
}

async function run() {
  for (const item of downloads) {
    try {
      console.log(`Downloading ${item.dest}...`);
      await download(item.url, item.dest);
      console.log(`Done ${item.dest}`);
    } catch (e) {
      console.error(`Failed ${item.dest}:`, e.message);
    }
  }
  console.log('ALL DOWNLOADS COMPLETE');
}

run();

