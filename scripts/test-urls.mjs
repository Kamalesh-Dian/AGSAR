import https from 'https';

const testUrls = [
  'https://assets.mixkit.co/videos/42416/42416-720.mp4',
  'https://assets.mixkit.co/videos/41644/41644-720.mp4',
  'https://assets.mixkit.co/videos/42415/42415-720.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://images.unsplash.com/photo-1508873696983-2df570464756?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80'
];

for (const url of testUrls) {
  https.get(url, (res) => {
    console.log(res.statusCode, url.substring(0, 50));
  }).on('error', (e) => {
    console.log('ERR', url.substring(0, 50), e.message);
  });
}

