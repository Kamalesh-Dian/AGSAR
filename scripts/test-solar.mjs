import https from 'https';

const solarUrls = [
  'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_1_crop.jpg/1280px-Photovoltaik_Dachanlage_Hannover_-_Schwarze_Heide_1_crop.jpg'
];

for (const url of solarUrls) {
  https.get(url, (res) => {
    console.log(res.statusCode, url.substring(0, 60));
  });
}

