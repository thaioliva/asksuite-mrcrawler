const routes = (app, crawler) => {
  const ret = {
    data: null,
    length: null,
    errors: null
  };

  app.get('/', function (req, res) {
    res.send('Hello Mr. Crawler');
  })
  app.post('/buscar', function (req, res) {
    const body = req.body;
    const validator = crawler.validateDates(body);
    if (!!validator.length) {
      ret.errors = validator;
      res.status(500).send(ret);
    }
    crawler.getRooms(body).then((rooms) => {
      ret.data = rooms;
      ret.length = rooms.length;
      res.status(200).send(ret);
    });
  })
}

export default routes;
