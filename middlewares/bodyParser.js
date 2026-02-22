// 1 MB limit
const MAX_SIZE = 1000000; 

const bodyParser = (req, res, next) => {
  // Only parse JSON bodies
  const contentType = req.headers['content-type'] || '';

  if (!contentType.includes('application/json')) {
    return next();
  }

  let body = '';
  let received = 0;

  req.on('data', (chunk) => {
    received += chunk.length;

    // Prevent too large payload
    if (received > MAX_SIZE) {
      res.statusCode = 413;
      res.end('Payload Too Large');
      req.destroy();
      return;
    }

    body += chunk;
  });

  req.on('end', () => {
    if (!body) {
      req.body = {};
      return next();
    }

    try {
      req.body = JSON.parse(body);
      next();
    } catch (err) {
      res.statusCode = 400;
      res.end('Invalid JSON');
    }
  });

  req.on('error', () => {
    res.statusCode = 400;
    res.end('Request Error');
  });
};

module.exports = bodyParser;