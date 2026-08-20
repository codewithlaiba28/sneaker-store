const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = {
  'hero.jpg': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop',
  'snk1.jpg': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
  'snk2.jpg': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
  'snk3.jpg': 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop',
  'snk4.jpg': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
  'snk5.jpg': 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=800&auto=format&fit=crop',
  'snk6.jpg': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
  'snk7.jpg': 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop',
  'snk8.jpg': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
  'snk9.jpg': 'https://images.unsplash.com/photo-1588099768531-a72d4a198538?q=80&w=800&auto=format&fit=crop',
  'snk10.jpg': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
  'snk11.jpg': 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=800&auto=format&fit=crop',
  'snk12.jpg': 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=800&auto=format&fit=crop',
  'cat1.jpg': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
  'cat2.jpg': 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
  'cat3.jpg': 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=800&auto=format&fit=crop',
  'cat4.jpg': 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  for (const [name, url] of Object.entries(images)) {
    const dest = path.join(dir, name);
    console.log(`Downloading ${name}...`);
    try {
      await download(url, dest);
      console.log(`Saved ${name}`);
    } catch (err) {
      console.error(`Failed to download ${name}: ${err.message}`);
    }
  }
}

main();
