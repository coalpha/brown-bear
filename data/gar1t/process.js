if (module.parent) {
   throw new Error(`${__filename} is not an importable module!`);
}

const fs = require("fs");
const yaml = require("js-yaml");

process.chdir(__dirname); // relative to this script file instead of the shell

const inFiles = fs.readdirSync("in");

const brownBearLines = [];

for (const inFilename of inFiles) {
   console.log(inFilename);
   if (!inFilename.endsWith(".yml")) {
      console.log(`Skipping ${inFilename}`);
      continue;
   }

   console.log(`Reading ${inFilename}`);
   const relativePath = `in/${inFilename}`;
   const rawdata = fs.readFileSync(relativePath);
   const video = yaml.load(rawdata);

   if (video.disabled) {
      console.log(`Was disabled ${inFilename}`);
      continue;
   }

   for (const sentence of video.sentences) {
      if (sentence.beige) {
         return ["beige", `${sentence.beige}`];
      }

      if (sentence.brown) {
         brownBearLines.push(sentence.brown);
         return ["brown", `${sentence.brown}`];
      }

      throw new TypeError('Sentence should either have a property "beige" or a property "brown"');
   }

   const json = JSON.stringify(video);

   const outfile = `out/${inFilename.replace(/\.yml$/, ".json")}`;
   fs.writeFileSync(outfile, json);
   console.info(`Wrote ${outfile}`);
}

const brownBearOutfile = "out/brownBearLines.json";
fs.writeFileSync(brownBearOutfile, JSON.stringify(brownBearLines, null, 3));
