import fs = require("fs");
import yaml = require("js-yaml");

export type Character = "beige" | "brown";

interface Video {
   title: string,
   tags: string[],
   disabled: boolean,
}

type NormalSentence = [Character, string];

export interface VideoAbnormal extends Video {
   sentences: any[],
}

export interface VideoNormal extends Video {
   sentences: NormalSentence[],
}

function readVideo(filename: string): VideoNormal {
   const video: VideoAbnormal = yaml.load(fs.readFileSync(`${__dirname.replace(/dist/g, "")}/${filename}.yml`, "utf8"));
   const normalSentences: (NormalSentence | null)[] = video.sentences.map(sentence => {
      if (sentence.beige) {
         return ["beige", "" + sentence.beige];
      }
      if (sentence.brown) {
         return ["brown", "" + sentence.brown];
      }
      return null;
   });

   (video as VideoNormal).sentences = normalSentences.filter(s => s !== null) as NormalSentence[];
   return video as VideoNormal;
}

const mongo_db_is_web_scale = readVideo("Episode 1 - Mongo DB Is Web Scale");
const nodejs_is_bad_ass_rock_star_tech = readVideo("Node.js Is Bad Ass Rock Star Tech");

console.log(mongo_db_is_web_scale);
