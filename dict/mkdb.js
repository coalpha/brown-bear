const fs = require("fs");
const dbdriver = require("better-sqlite3");
const parse = require("csv-parse/lib/sync");
const dbfilename = require("./dbfilename");
const tagOneToken = require("../tag/oneToken");

process.chdir(__dirname);

const sourceFiles = "source";
const inFiles = fs.readdirSync(sourceFiles);

if (fs.existsSync(dbfilename)) {
   fs.unlinkSync(dbfilename);
}

const db = dbdriver(dbfilename);

db.exec(/* sql */ `
   create table tokens (
      string text primary key,
      token_type text not null
   ) without rowid;

   create table tags (
      string text not null,
      tag text not null,

      primary key (string, tag),
      foreign key (string) references tokens(string)
   ) without rowid;

   create table arrows (
      string text not null,
      tag_in text not null,
      tag_out text not null,

      primary key (string, tag_in, tag_out)
   ) without rowid;
`);

const db_token = db.prepare(/* sql */ `
   insert or ignore into tokens (string, token_type)
   values (?, ?);
`);

const db_tag = db.prepare(/* sql */ `
   insert or ignore into tags (string, tag)
   values (?, ?);
`);

const db_arrow = db.prepare(/* sql */ `
   insert into arrows (string, tag_in, tag_out)
   values (:string, :tag_in, :tag_out);
`);

const db_begin = db.prepare("begin transaction");
const db_rollback = db.prepare("rollback transaction");
const db_commit = db.prepare("commit transaction");

const dups = Object.create(null);

for (const inFilename of inFiles) {
   let mode;

   if (inFilename.endsWith(".tokens.csv")) {
      console.log(`rdtk ${inFilename}`);
      mode = "tokens";
   } else if (inFilename.endsWith(".arrows.csv")) {
      console.log(`rdar ${inFilename}`);
      mode = "arrows";
   } else {
      console.log(`skip ${inFilename}`);
      continue;
   }

   const relativePath = `${sourceFiles}/${inFilename}`;
   const rawcsv = fs.readFileSync(relativePath, "utf8");
   const records = parse(rawcsv, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
   });

   db_begin.run();
   if (mode === "tokens") {
      for (const record of records) {
         const tag = record.tag || tagOneToken(record.string);
         const token_type = record.token_type || "word";
         const multiplexed = `${record.string},${tag},${token_type}`;

         // duplicate detection
         if (multiplexed in dups) {
            console.log(`dplt ${multiplexed} ${dups[multiplexed]} & ${inFilename}`);
         } else {
            dups[multiplexed] = inFilename;
         }

         db_token.run(record.string, token_type);
         db_tag.run(record.string, tag);
      }
   } else {
      for (const record of records) {
         db_arrow.run(record);
      }
   }
   db_commit.run();
}

db.close();
