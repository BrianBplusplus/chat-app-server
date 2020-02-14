const express = require("express");
const messageRouter = require("./message/router");
const cors = require("cors");
const app = express();

const port = 4000;

function onListen() {
  console.log(`Listening_on : ${port}`);
}

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.use(messageRouter);

app.listen(port, onListen);
