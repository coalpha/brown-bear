/// <reference path="commands.d.ts" />

const zalgo = require("to-zalgo");

module.exports = {
   zalgo,
   serious(s) {
      return [...s].join(" ");
   },
   enny() {
      return "( ͡° ͜ʖ ͡°)";
   }
};
