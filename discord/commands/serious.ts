import CommandFn = require("../CommandFn");

const serious: CommandFn = text => [...text.join(" ")].join(" ");

export = serious;
