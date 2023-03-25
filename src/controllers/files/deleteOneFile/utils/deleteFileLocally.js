const fs = require("fs");

module.exports = function deleteFileLocally(path) {
  try {
    fs.unlinkSync(path);
    return true;
  } catch (err) {
    console.error(err);
    return err.code === "ENOENT" && err.errno === -4058;
  }
};
