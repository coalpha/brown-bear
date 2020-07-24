import rl = require("readline-sync");
import zalgo = require("../zalgo/mod");

rl.promptLoop(inp => {
   console.log(zalgo.add(inp));
   return false;
});
