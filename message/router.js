const express = require("express");
const Message = require("./model");

const { Router } = express;

const router = Router();

router.post("/message", async function(request, response) {
  try {
    const { body } = request;
    const { text } = body;
    const entity = { text };

    const message = await Message.create(entity);
    console.log(message.dataValues); //datavalues removes useless info

    response.send(message);
    console.log("request body text", body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
