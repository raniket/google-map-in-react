const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

let resource = {};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  next();
});



const port = process.env.PORT || 9000;

app.get('/resource/api', (req, res) => {
  console.log('GET ALL CALLED in SERVER @ ', new Date().toUTCString());
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.json(resource);
});

app.get('/resource/api/:id', (req, res) => {
  console.log('GET RESOURECE BY id CALLED in SERVER @ ', new Date().toUTCString());
  const id = parseInt(req.params.id);
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.json(resource);
});

app.post('/resource/api', (req, res) => {
  console.log('RESOURCE CEATED CALLED in SERVER @ ', new Date().toUTCString());
  const body = req.body;
  if (!body) {
    res.status(400);
    res.json({ error: 'body is required' });
  }
  console.log('body: ', body);
  res.status(201);
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'resource created' });
});

app.put('/resource/api/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('UPDATE RESOURCE CALLED in SERVER @ ', new Date().toUTCString(), ' with id : ', id);
  const body = req.body;
  if (!body) {
    res.status(400);
    res.json({ error: 'body is required' });
  }
  console.log('resource after updaeitng ', resource);
  res.status(201);
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'resource updated' });
});

app.delete('/resource/api/:id', (req, res) => {
  console.log('DELETE RESOURCE CALLED in SERVER @ ', new Date().toUTCString());
  const id = parseInt(req.params.id);
  console.log('id : ', id);
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'resource deleted' })
})

app.listen(port);
console.log('SERVER IS RUNNING ON PORT : ' + port);
