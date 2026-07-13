const https = require('https');
const http = require('http');

function fetchWithRedirects(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      }
    };

    lib.get(url, opts, (res) => {
      console.log('Status:', res.statusCode, 'Location:', res.headers.location || 'none');

      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) && res.headers.location && maxRedirects > 0) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const parsed = new URL(url);
          redirectUrl = parsed.origin + redirectUrl;
        }
        console.log('Following redirect to:', redirectUrl);
        fetchWithRedirects(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        require('fs').writeFileSync(__dirname + '/guns-scrape.html', data);
        console.log('Saved', data.length, 'bytes');
        resolve(data);
      });
    }).on('error', reject);
  });
}

fetchWithRedirects('https://guns.lol/0...0')
  .then(data => {
    // Print first 2000 chars
    console.log('--- CONTENT PREVIEW ---');
    console.log(data.substring(0, 2000));
  })
  .catch(err => console.error('Error:', err));