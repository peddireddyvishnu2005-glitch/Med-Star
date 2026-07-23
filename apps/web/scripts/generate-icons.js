const fs = require('fs');
const path = require('path');

// Simple 1x1 blue PNG buffer scaled/extended for valid PNG file structure
const pngBuffer = Buffer.from(
  'iVBORw50KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), pngBuffer);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), pngBuffer);

console.log('✓ Generated default PWA icon files: icon-192.png and icon-512.png');
