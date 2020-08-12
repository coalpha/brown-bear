const { randDict } = require("../../dict");

module.exports = argv => {
   if (argv.length === 0) {
      return "0 arguments is not diversified enough.";
   }
   if (argv.length > 1) {
      return `${argv.length} arguments is not a holistic strategy.`;
   }
   const count = argv[0] || 3 | 0;
   if (count < 1 || count > 10) {
      return `${count} is not agile.`;
   }
   return randDict(count).join(" ");
};
