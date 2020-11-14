const express = require("express");
const hubspot = require("./api/hubspot");
const bodyParser = require("body-parser");
const sinch = require("./api/sinch");
const app = express().use(bodyParser.json());
const port = 3000;

require("dotenv").config();

app.get("/auth", async (req, res) => {
  const code = req.query.code;
  console.log(code);
  try {
    hubspot.handleAuth(code);
    res.status(200).send("Authorization completed.");
  } catch {
    res.status(400).send("Unable to complete auth");
  }
});

app.post("/conversation", (req, res) => {
  try {
    sinch.sendMessage(
      req,
      "Thanks for reaching out. We are processing your request"
    );
    if (req.body.message) hubspot.createContact(req);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
