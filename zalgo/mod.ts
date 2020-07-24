import chars = require("./chars");

const regexp = new RegExp(`[${chars.all.join("")}]`, "g");

export = function remove(str: string) {
   return str.replace(regexp, "");
}
