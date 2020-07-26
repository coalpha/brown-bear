import CommandFn from "../CommandFn";
import { add } from "../../zalgo";

const zalgo: CommandFn = inp => add(inp.join(" "));

export default zalgo;
