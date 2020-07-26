import CommandFn from "../CommandFn";

const serious: CommandFn = text => [...text.join(" ")].join(" ");

export default serious;
