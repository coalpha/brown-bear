const dbdriver = require("better-sqlite3");

class Dictionary {
   constructor(outfile) {
      this.db = new dbdriver(outfile);

      this.db.exec(`
         create table if not exists kv {
            entity string primary key,
            tag string not null,
            category string not null,
         } WITHOUT ROWID
      `);

      this.db.exec(`
         create table if not exists fn {
            text string primary key,
            intype string not null,
            outtype string not null,
         } WITHOUT ROWID
      `);
   }

   close() {
      this.db.close();
   }
}
