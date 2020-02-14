const express = require("express");
const Message = require("./model");

const { Router } = express;

const router = Router();

router.post("/message", async function(request, response) {
  try {
    const { body } = request;
    const { text } = body;
    const entity = { text };

    const response = await Message.create(entity);
    console.log(response.dataValues);

    console.log("request body text", body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
