// this file might seem pointless at this stage but it's so
// anything that wants to tokenize uses the same Config

const TokenizerFactory = require("wink-tokenizer");

const tokenizer = new TokenizerFactory();

module.exports = {
   tokenize(s) {
      return tokenizer.tokenize(s).map(t => t.value);
   },
   tokenizeRaw: tokenizer.tokenize.bind(tokenizer),
};
