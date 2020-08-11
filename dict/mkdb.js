const fs = require("fs");
const dbdriver = require("better-sqlite3");
const parse = require("csv-parse/lib/sync");
const dbfilename = require("./dbfilename");

process.chdir(__dirname);

const sourceFiles = "source";
const inFiles = fs.readdirSync(sourceFiles);

if (fs.existsSync(dbfilename)) {
   fs.unlinkSync(dbfilename);
}

const db = dbdriver(dbfilename);

db.exec(/* sql */ `
   create table if not exists tokens (
      string text not null,
      tag text not null,
      token_type text not null,

      primary key (string, tag, token_type)
   ) without rowid;

   create table if not exists arrows (
      string text not null,
      tag_in text not null,
      tag_out text not null,

      primary key (string, tag_in, tag_out)
   ) without rowid;
`);

const db_token = db.prepare(/* sql */ `
   insert or ignore into tokens (string, tag, token_type)
   values (?, ?, ?);
`);

const db_arrow = db.prepare(/* sql */ `
   insert into arrows (string, tag_in, tag_out)
   values (:string, :tag_in, :tag_out);
`);

const db_begin = db.prepare("begin transaction");
const db_rollback = db.prepare("rollback transaction");
const db_commit = db.prepare("commit transaction");

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
         db_token.run(record.string, record.tag, record.token_type || "word");
      }
   } else {
      for (const record of records) {
         db_arrow.run(record);
      }
   }
   db_commit.run();
}

db.close();
