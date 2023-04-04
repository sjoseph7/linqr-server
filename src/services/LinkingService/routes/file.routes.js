const express = require("express");
const uploadManyFiles = require("../controllers/files/uploadManyFiles");
const getManyFiles = require("../controllers/files/getManyFiles");
const downloadOneFile = require("../controllers/files/downloadOneFile");
const deleteOneFile = require("../controllers/files/deleteOneFile");

const fileRouter = express.Router();

fileRouter
  .post("/:collectionId/files/upload", uploadManyFiles)
  .get("/:collectionId/files/", getManyFiles)
  .get("/:collectionId/files/:fileId", downloadOneFile)
  .delete("/:collectionId/files/:fileId", deleteOneFile);

module.exports = fileRouter;
