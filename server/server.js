import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

let server = null;
const start = ((api, crawler, callback) => {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));
  app.use((err, req, res, next) => {
    callback(new Error(`Something wrong ${err}`), null);
    res.status(500).send('ooops');
  });

  api(app, crawler);
  server = app.listen(parseInt(process.env.PORT), () => {
    callback(null, server);
    console.log(`CORS-enabled web server listening on port ${process.env.PORT}`);
  });
});

const stop = (() => {
  if (server) server.close();
  return true;
});

module.exports = {
  start,
  stop,
}
