const add = require("../../zalgo/add");

module.exports = args => add(args.length === 0 ? "HE COMES" : args.join(" "));
