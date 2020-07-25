const Adjective = {
   JJ: "adjective",
   JJR: "adjective: comparative",
   JJS: "adjective: superlative",
};

const NounSingular = {
   NN: "noun: single | or mass",
   NNP: "proper noun or single",
}

const NounPlural = {
   NNS: "noun: plural",
   NNPS: "proper noun: plural",
}

const Noun = Object.assign({}, NounSingular, NounPlural);

const Adverb = {
   RB: "adverb",
   RBR: "adverb: comparative",
   RBS: "adverb: superlative",
};

/** Infinitive without the leading "to" */
const VerbBase = { VB: "verb: base form" };

const VerbPresentSingular = { VBZ: "verb: present singular" };
const VerbPresentPlural = { VBP: "verb: present plural" };
const VerbPresent = Object.assign({}, VerbPresentSingular, VerbPresentPlural);

export type type = (
   "CC" | "CD" | "DT" | "EX" | "FW" | "IN" | "JJ" | "JJR" | "JJS" | "LS" |
   "MD" | "NN" | "NNP" | "NNPS" | "NNS" | "POS"  | "PDT" | "PRP$" | "PRP" | "RB" |
   "RBR" | "RBS" | "RP" | "SYM" | "TO" | "UH" | "VB" | "VBD" | "VBG" | "VBN" | "VBP" |
   "VBZ" | "WDT" | "WP" | "WP$" | "WRB" | " | " | "." | ":" | "$" | "#" | "\"" | "(" | ")"
);
