if (module.parent) {
   throw new Error(`${__filename} is not an importable module!`);
}

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

process.chdir(__dirname); // relative to this script file instead of the shell

function inSentenceToOutSentence(sentence) {
   if (sentence.beige) {
      return ["beige", `${sentence.beige}`];
   }

   if (sentence.brown) {
      return ["brown", `${sentence.brown}`];
   }

   throw new TypeError('Sentence should either have a property "beige" or a property "brown"');
}

const inFiles = fs.readdirSync("in");

for (const inFilename of inFiles) {
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

   video.sentences = video.sentences.map(inSentenceToOutSentence);

   const json = JSON.stringify(video);

   const outfile = `out/${inFilename.replace(/\.yml$/, ".json")}`;
   fs.writeFileSync(outfile, json);
   console.info(`Wrote ${outfile}`);
}
