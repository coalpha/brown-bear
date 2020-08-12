const { randBrownBear } = require("../../gar1t");

module.exports = (strCount = 1) => {
   const count = strCount|0;
   if (count < 1 || count > 5) {
      return `${count} is not webscale.`;
   }
   return randBrownBear(count).join("\n");
};
