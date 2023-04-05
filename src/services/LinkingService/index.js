const express = require("express");
const fileRouter = require("./routes/file.routes");
const Link = require("./models/Link");
const Collection = require("./models/Collection");
const generateUniqueName = require("../../utils/generateUniqueName");

module.exports = class LinkingService {
  static init() {
    const router = express.Router();

    router.post("/", express.json(), async (req, res) => {
      const { deviceId, collectionId } = req.body;

      if (!deviceId)
        return res
          .status(400)
          .json({ success: false, err: "deviceId not provided" });
      if (!collectionId)
        return res
          .status(400)
          .json({ success: false, err: "collectionId not provided" });

      // Check if the collection exists
      try {
        const existingCollection = await Collection.findOne({
          slug: collectionId,
        }).catch();
        if (!existingCollection)
          await Collection.create({
            name: generateUniqueName(),
            slug: collectionId,
          });
      } catch (err) {
        return res
          .status(500)
          .json({ success: false, err: "something went wrong" });
      }

      try {
        const newLink = await Link.create({
          deviceId,
          collectionId,
        });
        return res.status(200).json({ success: true, link: newLink });
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, err: "something went wrong" });
      }
    });

    router.get("/devices/:id", express.json(), async (req, res) => {
      const { id: deviceId } = req.params;

      if (!deviceId)
        return res
          .status(400)
          .json({ success: false, err: "deviceId not provided" });

      try {
        const link = await Link.findOne({ deviceId });
        if (!link)
          return res.status(404).json({
            success: false,
            err: `no device with id '${deviceId}' found`,
          });

        return res.status(200).json({ success: true, link });
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, err: "something went wrong" });
      }
    });

    router.use("/collections", fileRouter);

    console.log("LinkingService initialized.");
    return router;
  }
};
