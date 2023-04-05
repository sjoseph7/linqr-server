const express = require("express");
const uploadManyFiles = require("../controllers/files/uploadManyFiles");
const getManyFiles = require("../controllers/files/getManyFiles");
const downloadOneFile = require("../controllers/files/downloadOneFile");
const deleteOneFile = require("../controllers/files/deleteOneFile");
const createCollection = require("../controllers/collections/createCollection");
const getCollection = require("../controllers/collections/getCollection");

const fileRouter = express.Router();

fileRouter
  // Collections //
  .post("/", createCollection)
  .get("/:collectionId", getCollection)

  // Files //
  .post("/:collectionId/files/upload", uploadManyFiles)
  .get("/:collectionId/files/", getManyFiles)
  .get("/:collectionId/files/:fileId", downloadOneFile)
  .delete("/:collectionId/files/:fileId", deleteOneFile);

module.exports = fileRouter;
