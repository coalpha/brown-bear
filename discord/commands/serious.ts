import CommandFn from "../CommandFn";

const serious: CommandFn = text => [...text].join(" ");

export = serious;
