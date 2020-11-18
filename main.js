const express = require('express');
const bodyParser = require('body-parser');
const flow = require('./flow');
const hubspot = require('./api/hubspot');
const app = express().use(bodyParser.json());
const port = 3000;

require('dotenv').config();

app.get('/auth', async (req, res) => {
  const code = req.query.code;
  try {
    hubspot.handleAuth(code);
    res.status(200).send('Authorization completed.');
  } catch {
    res.status(400).send('Unable to complete auth');
  }
});

app.post('/conversation', (req, res) => {
  try {
    console.log(req.body);
    flow.handleMessageFlow(req);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.post('/hubspot', (req, res) => {
  try {
    if (req.body[0].subscriptionType === 'contact.creation')
      flow.handleOnHubSpotContactCreated(req.body[0].objectId);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
