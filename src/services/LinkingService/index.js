const express = require("express");
const fileRouter = require("./routes/file.routes");
// const groupRouter = require("./routes/group.routes");

module.exports = class LinkingService {
  static init(app) {
    const router = express.Router();

    router.use("/groups/:groupId/files", fileRouter);
    // router.use("/groups", groupRouter);

    return router;
  }
};
