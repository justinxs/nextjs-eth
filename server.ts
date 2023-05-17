import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

async function start() {
  const dev = process.env.NODE_ENV !== 'production';
  const hostname = '0.0.0.0';
  const port = parseInt(process.env.PORT || '3000', 10);
  // when using middleware `hostname` and `port` must be provided below
  const app = next({ dev, hostname, port });
  const nextRequestHandle = app.getRequestHandler();
  await app.prepare();
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    app.setAssetPrefix('http://localhost:3000');
    nextRequestHandle(req, res, parsedUrl);
  }).listen(port);

  console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
}

start();
