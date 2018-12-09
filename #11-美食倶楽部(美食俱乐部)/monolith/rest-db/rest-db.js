const express = require('express');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const commander = require('commander');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const data = {};

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,DELETE");
  next();
});

app.get('/:dataset', (req, res) => {
  const { dataset } = req.params;
  res.json(Object.values(data[dataset] || {}));
});

app.get('/:dataset/:id', (req, res) => {
  const { dataset, id } = req.params;
  const item = data[dataset][id];
  if (!item) {
    res.status(404).end();
    return;
  }

  res.json(item);
});

app.post('/:dataset', (req, res) => {
  const { dataset } = req.params;
  const body = req.body;
  if (!body) {
    res.status(400).json({ error: 'empty body' });
    return;
  }

  const id = uuidv4();
  body.id = id;

  data[dataset] = data[dataset] || {};
  data[dataset][id] = body;
  console.log(body);

  res.json(body);
});

app.put('/:dataset/:id', (req, res) => {
  const { dataset, id } = req.params;
  const body = req.body;
  if (!body) {
    res.status(400).json({ error: 'empty body' });
    return;
  }

  body.id = id;

  data[dataset] = data[dataset] || {};
  data[dataset][id] = body;

  res.json(body);
});

app.delete('/:dataset/:id', (req, res) => {
  const { dataset, id } = req.params;
  if (!data[dataset]) {
    res.status(204).end();
    return;
  }

  delete data[dataset][id];

  res.status(204).end();
});

commander
  .version('0.0.1')
  .option('--port <port>')
  .parse(process.argv);

const port = commander.port || 21983;

app.listen(port, () => {
  console.log(`listen on ${port}`);
});
