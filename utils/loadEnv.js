const fs = require('fs');

function loadEnv(path = '.env') {
  const content = fs.readFileSync(path, 'utf8');

  content.split('\n').forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) return;

    const [key, ...rest] = trimmed.split('=');
    const value = rest.join('=').trim();

    process.env[key.trim()] = value;
  });
}

module.exports = loadEnv;
