const fs = require("fs");

process.chdir(__dirname);
const inFiles = fs.readdirSync("in");

for (const inFilename of inFiles) {
   const relativeInfile = `in/${inFilename}`;
   const outFilename = `out/${inFilename.replace(/dict\.json$/, "token.csv")}`;

   console.log(`prse ${relativeInfile}`);
   const obj = JSON.parse(fs.readFileSync(relativeInfile, "utf8"));

   const outfile = fs.createWriteStream(outFilename);
   outfile.write("string,tag,token_type\n");
   for (const token of obj.tokens) {
      outfile.write(`${token.string},${token.tag}${token.tokentag === "word" ? "" : `,${token.tokentag}`}\n`);
   }
   outfile.close();
}
