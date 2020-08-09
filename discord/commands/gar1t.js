const fs = require("fs");
const { randAry } = require("../../util/rand");

const gar1tdir = `${__dirname}/../../data/gar1t/out`;

const brownBearLines = JSON.parse(
   fs.readFileSync(`${gar1tdir}/brownBearLines.json`, "utf8"),
);

module.exports = () => randAry(brownBearLines);
