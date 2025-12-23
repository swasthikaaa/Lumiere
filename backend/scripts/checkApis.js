// Simple script to check API endpoints
(async () => {
  const endpoints = ['/api/products', '/api/orders', '/api/users'];
  for (const p of endpoints) {
    try {
      const res = await fetch('http://127.0.0.1:5000' + p, { method: 'GET' });
      console.log('\n--', p, 'Status:', res.status);
      const text = await res.text();
      try {
        const j = JSON.parse(text);
        console.log('Parsed JSON type:', Array.isArray(j) ? `Array(${j.length})` : typeof j);
        console.log(JSON.stringify(Array.isArray(j) ? j.slice(0,5) : j).slice(0,1000));
      } catch (e) {
        console.log('Response not JSON (truncated):', text.slice(0,1000));
      }
    } catch (err) {
      console.error('Fetch error for', p, err.message);
    }
  }
})();
