const express = require("express");
const uploadManyFiles = require("../controllers/files/uploadManyFiles");
const getManyFiles = require("../controllers/files/getManyFiles");
const downloadOneFile = require("../controllers/files/downloadOneFile");
const deleteOneFile = require("../controllers/files/deleteOneFile");

const fileRouter = express.Router();

fileRouter
  .post("/upload", uploadManyFiles)
  .get("/", getManyFiles)
  .get("/:fileId", downloadOneFile)
  .delete("/:fileId", deleteOneFile);

module.exports = fileRouter;
