const tag = require("../tagger");
const { promptLoop } = require("readline-sync");

promptLoop(inp => {
   console.log(tag(inp).map(tag => `[${tag.value}, ${tag.pos}]`).join(" "));
   return false;
});
