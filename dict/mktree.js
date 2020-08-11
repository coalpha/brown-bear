const fs = require("fs");
const dbdriver = require("better-sqlite3");
const dbfilename = require("./dbfilename");
const { tokenize } = require("../tokenizer");

process.chdir(__dirname);

const db = dbdriver(dbfilename);

const db_all = db.prepare(/* sql */ `
   select * from tokens;
`);

db_all.raw(true);

const tree = Object.create(null);

const allTokens = db_all.all();

class Node {
   constructor(node, token_type = null) {
      if (node) {
         return node;
      }
      this.token_type = token_type;
      this.next = {};
   }
}

for (const [string, token_type] of allTokens) {
   console.log(`crtk ${string}`);
   let cursor = tree;
   const words = tokenize(string);
   for (const word of words.slice(0, -1)) {
      console.log(`   word ${word}`);
      cursor[word] = new Node(cursor[word]);
      cursor = cursor[word].next;
   }
   const lastword = words[words.length - 1];
   console.log(`   lstw ${lastword}`);
   cursor[lastword] = new Node(null, token_type);
}

fs.writeFileSync("tree.json", JSON.stringify(tree, /* null, 3 */));
