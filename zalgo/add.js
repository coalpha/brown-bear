const runes = require("runes");
const chars = require("./chars");

const defaultOptions = {
   intensity: 2,
   up: true,
   middle: true,
   down: true,
};

/**
 * @param {string[]} charset
 * @param {number} amount
 * @returns {(rune: string) => string}
 */
function addRandomChars(charset, amount) {
   const len = charset.length;
   return rune => {
      let i = amount;
      while (i-- > 0) {
         rune += charset[Math.random() * len | 0];
      }
      return rune;
   };
}

/**
 * @param {string} str
 * @param {import("open").Options} [options]
 * @returns {string}
 */
module.exports = function add(str, options) {
   const o = { ...defaultOptions, ...options };

   const charset = [];
   if (o.up) {
      charset.push(...chars.up);
   }
   if (o.middle) {
      charset.push(...chars.middle);
   }
   if (o.down) {
      charset.push(...chars.middle);
   }

   return (
      runes(str)
         .map(addRandomChars(charset, o.intensity))
         .join("")
   );
};
