import fs from 'fs';
import path from 'path';

(async () => {
  try {
    const filePath = path.join(process.cwd(), 'backend', 'uploads', '1766030856156-884605021.jpg');
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      process.exit(1);
    }

    const fd = new FormData();
    fd.append('image', fs.createReadStream(filePath));

    const res = await fetch('http://127.0.0.1:5000/api/upload', { method: 'POST', body: fd });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Response:', text.slice(0, 2000));
  } catch (err) {
    console.error('Upload test error:', err.message);
    process.exit(1);
  }
})();
