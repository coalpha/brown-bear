const fs = require("fs");
const JSONDict = require("../dict/JSONDictionary");

console.log(process.argv);
const jd = new JSONDict(process.argv[2] + ".dict.json");
const file = fs.readFileSync(process.argv[2], "utf8").split("\n");

console.log(file);

file.forEach((line, i) => {
   jd.addPosLine(line, i);
});

jd.close();
