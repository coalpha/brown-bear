const typescript = require("rollup-plugin-typescript2");

function asInputEntry(str) {
   return [str, `${str}.ts`];
}

const inputs = [
   "discord/index",
   "helpers/pos",
   "helpers/zalgo",
   "synthesis/posf",
];

module.exports = {
   input: Object.fromEntries(inputs.map(asInputEntry)),

   output: {
      dir: "dist",
      format: "cjs",
   },

   plugins: [typescript()],

   external: [
      "eris",
      "readline-sync",
      "runes",
      "wink-pos-tagger",
   ],
};
