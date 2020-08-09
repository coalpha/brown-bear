/** @type {(inp: string[]) => string} */
const serious = text => [...text.join(" ")].join(" ");

module.exports = serious;
