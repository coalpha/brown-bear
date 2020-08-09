if (module.parent) {
   throw new Error(`${__filename} is not an importable module!`);
}

const fs = require("fs");
const dbdriver = require("better-sqlite3");
const dbfilename = require("./dbfilename");

process.chdir(__dirname); // relative to this script file instead of the shell

const sourceFiles = "source";

const inFiles = fs.readdirSync(sourceFiles);

if (fs.existsSync(dbfilename)) {
   fs.unlinkSync(dbfilename);
}
const db = dbdriver(dbfilename);

db.exec(`
   create table videos (
      video_id integer primary key,
      title text
   ) without rowid;

   create table tags (
      video_id integer not null,

      tag text not null,

      primary key (video_id, tag),
      foreign key (video_id) references videos(video_id)
   );

   create table sentences (
      video_id integer not null,

      line_number integer not null,
      character text not null,
      sentence text not null,

      primary key (video_id, line_number),
      foreign key (video_id) references videos(video_id)
   ) without rowid;
`);

const db_begin = db.prepare("begin transaction");
const db_rollback = db.prepare("rollback transaction");
const db_commit = db.prepare("commit transaction");

const db_video = db.prepare(`
   insert into videos (video_id, title)
   values (:video_id, :title);
`);

const db_tag = db.prepare(`
   insert into tags (video_id, tag)
   values (:video_id, :tag);
`);

const db_sentence = db.prepare(`
   insert into sentences (video_id, line_number, character, sentence)
   values (:video_id, :line_number, :character, :sentence);
`);

let video_id = 0;
for (const inFilename of inFiles) {
   if (inFilename.endsWith(".json")) {
      console.log(`read ${inFilename}`);
   } else {
      console.log(`skip ${inFilename}`);
      continue;
   }

   const relativePath = `${sourceFiles}/${inFilename}`;
   const rawdata = fs.readFileSync(relativePath);
   const video = JSON.parse(rawdata);

   if (video.disabled) {
      console.log(`dsbl ${inFilename}`);
      continue;
   } else {
      console.log(`good ${inFilename}`);
   }

   db_begin.run();

   db_video.run({
      video_id,
      title: video.title,
   });

   for (const tag of video.tags) {
      console.log(`   atag ${tag.slice(0, 10)}...`);
      db_tag.run({
         video_id,
         tag,
      });
   }

   console.log("   --- -------------");
   for (const [line_number, [character, sentence]] of video.sentences.entries()) {
      console.log(`   sntc ${sentence.slice(0, 10)}...`);
      db_sentence.run({
         video_id,
         line_number,
         character,
         sentence,
      });
   }

   db_commit.run();
   video_id++;
}

db.close();
console.log("done");
