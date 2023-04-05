const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

const colorsAndAdjectives = [...colors, ...adjectives];

module.exports = function generateUniqueName() {
  return uniqueNamesGenerator({
    // (>1400 + 50) * 350 means >500k unique names
    dictionaries: [colorsAndAdjectives, animals],
    length: 2,
    separator: " ",
    style: "capital",
  });
};
