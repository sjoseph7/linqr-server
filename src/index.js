require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const downloadOneFile = require("./controllers/files/downloadOneFile");
const deleteOneFile = require("./controllers/files/deleteOneFile");
const uploadManyFiles = require("./controllers/files/uploadManyFiles");
const getManyFiles = require("./controllers/files/getManyFiles");
const cors = require("cors");
const createGroup = require("./controllers/groups/createGroup");
const app = express();

mongoose.connect(process.env.MONGO_URI);
app.use(cors());

// Files
// app.post("/groups/:id/files/upload", upload.single("file"), uploadOneFile);
app.post("/groups/:id/files/upload", uploadManyFiles);
app.get("/groups/:groupId/files/:fileId", downloadOneFile);
app.get("/groups/:groupId/files", getManyFiles);
app.delete("/groups/:groupId/files/:fileId", deleteOneFile);

// Groups
app.post("/groups", createGroup);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
