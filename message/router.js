const express = require("express");
const Message = require("./model");
const SSE = require("json-sse");

const { Router } = express;

const router = Router();

const stream = new SSE();

//-------sse stuff---------//
router.get("/stream", async (request, response, next) => {
  try {
    const messages = await Message.findAll();

    const json = JSON.stringify(messages); //stringify puts data in an array

    stream.updateInit(json);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});
//-------sse stuff----------//

router.get("/message", async function(request, response, next) {
  try {
    const messages = await Message.findAll();
    response.send(messages);
  } catch (error) {
    next(error);
  }
});

router.post("/message", async function(request, response, next) {
  try {
    const { body } = request;
    const { text } = body;
    const entity = { text };

    const message = await Message.create(entity);
    console.log(message.dataValues); //datavalues removes useless info

    const json = JSON.stringify(message); //stringify puts data in an array

    stream.send(json); // SSE stuff

    response.send(json);
    console.log("request body text", body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
