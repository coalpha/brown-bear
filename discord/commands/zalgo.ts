import CommandFn = require("../CommandFn");
import zalgo = require("../../zalgo/mod");

const zalgo_add: CommandFn = inp => zalgo.add(inp.join(" "));

export = zalgo_add;
