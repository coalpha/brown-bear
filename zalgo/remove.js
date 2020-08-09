const chars = require("./chars");
const allZalgo = new RegExp(`[${chars.all.join("")}]`, "g");

/** @type {(str: string) => string} */
module.exports = (str => str.replace(allZalgo, ""));
