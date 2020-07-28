export const Adjective = {
   JJ: "adjective",
   JJR: "adjective: comparative",
   JJS: "adjective: superlative",
};

export const NounSingular = {
   NN: "noun: single or mass",
};

/** like a name */
export const NounProper = {
   NNP: "proper noun or single",
};

export const NounOne = { ...NounSingular, ...NounProper };

export const NounPlural = {
   NNS: "noun: plural",
};

export const NounProperPlural = {
   NNPS: "proper noun: plural",
};

export const NounMany = { ...NounPlural, ...NounProperPlural };

export const Noun = { ...NounOne, ...NounMany };

export const Adverb = {
   RB: "adverb",
   RBR: "adverb: comparative",
   RBS: "adverb: superlative",
};

/** Infinitive without the leading "to" */
export const VerbBase = { VB: "verb: base form" };

export const VerbPresentSingular = { VBZ: "verb: present singular" };
export const VerbPresentPlural = { VBP: "verb: present plural" };
export const VerbPresent = { ...VerbPresentSingular, ...VerbPresentPlural };

export const VerbPast = { VBD: "verb: past" };
export const VerbPastParticiple = { VBN: "verb: past participle " };
export const VerbGerund = { VBG: "verb: gerund" };
const Comma = { };
