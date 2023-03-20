const ObjectId = require("mongoose").Types.ObjectId;

module.exports = function isObjectIdValid(id) {
  // Help from -> https://stackoverflow.com/a/29231016
  if (!ObjectId.isValid(id)) return false;
  if (String(new ObjectId(id)) !== id) return false;
  return true;
};
