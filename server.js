require('./utils').loadEnv();

require('./process').crashHandlers();

const nodeApp = require('../Node-App');
const port = Number(process.env.PORT) || 3000;

const { bodyParser, silence, notFound, errorHandler } = require('./middlewares');

const serverError = require('./errors/serverError');

const routes = require('./routes');

const start = async () => {
  // 1. Create app
  const app = nodeApp();

	// Middlewares
	app.use(bodyParser)

  // Routes
  app.use(silence);
  app.get('/', (req, res) => res.json({ status: 'ok' }));
  app.use('/api', routes);

  // Request error handling
  app.use(notFound);
  app.use(errorHandler);

  // 2. Start server
  const server = app.listen(port, () => {
    console.info('[Server] listening on port', port);
  });

	// Server error handling
  server.on('error', serverError);

  // Graceful shutdown (CLEAN EXIT)
  require('./process').shutdownHandlers(server);
};

// BOOTSTRAP
start().catch((error) => {
  console.error('[Server] startup aborted\n');
  console.error(error);
  process.exit(1);
});
