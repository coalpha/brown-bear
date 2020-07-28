import runes from "runes";
import * as chars from "./chars";

const intensityMap = {
   mini: 1,
   normal: 2,
   maxi: 3,
   ultra: 4,
};

type Intensity = keyof typeof intensityMap;

interface Options {
   intensity: Intensity;
   up: boolean;
   middle: boolean;
   down: boolean;
}

const defaultOptions: Options = {
   intensity: "normal",
   up: true,
   middle: true,
   down: true,
};

function addRandomChars(charset: string[], amount: number) {
   const len = charset.length;
   return (rune: string) => {
      let i = amount;
      while (i-- > 0) {
         rune += charset[Math.random() * len | 0];
      }
      return rune;
   };
}

export function add(str: string, options?: Options): string {
   const o = { ...defaultOptions, ...options };

   const charset = [];
   if (o.up) {
      charset.push(...chars.up);
   }
   if (o.middle) {
      charset.push(...chars.middle);
   }
   if (o.down) {
      charset.push(...chars.middle);
   }

   const intensity = intensityMap[o.intensity];
   return runes(str).map(addRandomChars(charset, intensity)).join("");
}

const allZalgo = new RegExp(`[${chars.all.join("")}]`, "g");

export function remove(str: string) {
   return str.replace(allZalgo, "");
}
