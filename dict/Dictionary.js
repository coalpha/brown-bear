const dbdriver = require("better-sqlite3");

class DBDictionary {
   constructor(outfile) {
      this.db = new dbdriver(outfile);

      this.db.exec(/* sql */ `
         create table if not exists kv {
            word_group text not null,
            tag text not null,
            category text not null,

            primary key (word_group, tag)
         } without rowid;

         create table if not exists fn {
            string text not null,
            tag_in text not null,
            tag_out text not null,

            primary key (string, tag_in, tag_out)
         } without rowid;
      `);
   }

   close() {
      this.db.close();
   }
}
