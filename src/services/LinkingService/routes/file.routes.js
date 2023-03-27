const express = require("express");
const uploadManyFiles = require("../controllers/files/uploadManyFiles");
const getManyFiles = require("../controllers/files/getManyFiles");
const downloadOneFile = require("../controllers/files/downloadOneFile");
const deleteOneFile = require("../controllers/files/deleteOneFile");

const fileRouter = express.Router();

fileRouter
  .post("/:groupId/files/upload", uploadManyFiles)
  .get("/:groupId/files/", getManyFiles)
  .get("/:groupId/files/:fileId", downloadOneFile)
  .delete("/:groupId/files/:fileId", deleteOneFile);

module.exports = fileRouter;
