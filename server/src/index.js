import { loadConfig } from './config.js';
import { connectMongo, disconnectMongo } from './db.js';
import { createMongoContactStore } from './stores/mongoContactStore.js';
import { createApp } from './app.js';

const config = loadConfig();

let contactStore = null;
if (config.mongoUri) {
  contactStore = createMongoContactStore();
  // Start serving immediately; the contact form reports "unavailable" until the database is connected.
  connectMongo(config.mongoUri);
} else {
  console.warn('MONGODB_URI is not set: the site will run, but the contact form will be unavailable.');
}

const app = createApp({ config, contactStore });
const server = app.listen(config.port, () => {
  console.log(`Portfolio server listening on port ${config.port} (${config.nodeEnv})`);
});

async function shutdown(signal) {
  console.log(`${signal} received, shutting down`);
  server.close(async () => {
    if (config.mongoUri) await disconnectMongo();
    process.exit(0);
  });
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
