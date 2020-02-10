import 'dotenv/config';
import index from './routes/index';
import server from './server/server';
import crawler from './src/index';

server.start(index, crawler, (err, app) => {
  console.log('ok');
  console.error(err);
})

