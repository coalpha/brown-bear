const typescript = require("rollup-plugin-typescript2");

const helpers = {
   input: ["helpers/pos.ts", "helpers/zalgo.ts"],
   output: {
      dir: "dist/helpers",
      format: "cjs",
   },
   plugins: [typescript()],
};

const discord = {
   input: "discord/bot.ts",
   output: {
      dir: "dist/discord",
      format: "cjs",
   },
   plugins: [typescript()],
};

module.exports = [
   discord,
   helpers,
];
