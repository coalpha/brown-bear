class Markov {
   constructor() {
      this.table = {};
   }

   /** @param {string} str */
   train(str) {
      const words = str.split(" ");
      words.push(Markov.end);
      let last = Markov.start;
      for (let i = 0; i < words.length; i++) {
         const current = words[i];
         const ctable = this.table[last] = this.table[last] || Object.create(null);
         ctable[current] = (ctable[current]|0) + 1;
         last = current;
      }
   }

   gen() {
      const out = [];
      let current = Markov.start;
      while (true) {
         if (current === Markov.end || out.length > 300) {
            break;
         }
         let runningsum = 0;
         /** @type {Array<[number, string]>} */
         const wordlist = [];
         for (const [word, occurences] of Object.entries(this.table[current])) { // entries doesn't include Symbols
            runningsum += occurences;
            wordlist.push([runningsum, word]);
         }
         const r = Math.random() * runningsum|0;
         const found = wordlist.find(([top]) => r < top);
         if (!found) {
            break;
         }
         const nextword = found[1];
         out.push(nextword);
         current = nextword;
      }
      return out.filter(e => typeof e !== "symbol").join(" ");
   }
}
Markov.start = Symbol("start");
Markov.end = Symbol("end");

const a = new Markov();
const fs = require("fs");
fs.readFileSync(`${__dirname}/../sources/ben steed cult/index.txt`, "utf8").split("\n").forEach(a.train.bind(a));
console.log(a.gen());
