const natural = require("natural");
const language = "EN";
const defaultCategory = "N";
const defaultCategoryCapitalized = "NNP";

const lexicon = new natural.Lexicon(language, defaultCategory);
const ruleSet = new natural.RuleSet("EN");
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

const tokenizer = new natural.WordTokenizer();

const fs = require("fs");

const file = fs.readFileSync(__dirname + "/../sources/ben steed cult/index.txt", "utf8");

const tokens = tokenizer.tokenize("we are going to create big things");

const pos = tagger.tag(["They", "are", "outsourcing", "it"]);

console.log(pos);

var nounInflector = new natural.NounInflector();

console.log(nounInflector.singularize("learners"));
