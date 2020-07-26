import { promptLoop } from "readline-sync";
import { add } from "../zalgo";

promptLoop(inp => {
   console.log(add(inp));
   return false;
});
