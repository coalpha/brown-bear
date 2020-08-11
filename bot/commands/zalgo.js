const add = require("../../zalgo/add");

/** @type {(inp: string[]) => string} */
module.exports = (inp => add(inp.join(" ")));
