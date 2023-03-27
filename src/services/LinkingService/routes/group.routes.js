const express = require("express");
const createGroup = require("../controllers/files/groups/createGroup");

const groupRouter = express.Router();
groupRouter.post("/", createGroup);

module.exports = groupRouter;
