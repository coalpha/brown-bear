const dbdriver = require("better-sqlite3");
const dbfilename = require("./dbfilename");

const db = dbdriver(dbfilename);

const db_rand_brown_bear = db.prepare(/* sql */ `
   select rand.sentence from (
      select character, sentence from sentences
      where character = 'brown'
      order by random()
      limit ?
   ) rand;
`);

db_rand_brown_bear.raw(true);

const randBrownBear = count => db_rand_brown_bear.all(count).map(row => row[0]);

module.exports = {
   randBrownBear,
};
