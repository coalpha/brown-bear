const fs = require("fs");
const { randBrownBear } = require("../../data/gar1t");

module.exports = strCount => {
   const count = strCount|0;
   if (count < 1 || count > 5) {
      return `${count} is not webscale.`;
   }
   return randBrownBear(count).join("\n");
};
