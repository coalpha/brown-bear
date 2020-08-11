/**
 * **FANBOYS**:
 *
 * for, and, nor, but, or, yet, so
 */
exports.CoordinatingConjunction = "CC";

/**
 * Spoken numbers:
 *
 * one, two, three, ...etc
 */
exports.CardinalNumber = "CD";

/**
 * Articles: a, an, the
 */
exports.Determiner = "DT";

/** *Example:* mon dieu */
exports.ForeignWord = "FW";

/** *Example:* in, of, by */
exports.Preposition = "IN";

/** *Example:* big */
exports.AdjectiveNormal = "JJ";

/** *Example:* bigger */
exports.AdjectiveComparative = "JJR";

/** *Example:* biggest */
exports.AdjectiveSuperlative = "JJS";

exports.Adjective = [
   exports.AdjectiveNormal,
   exports.AdjectiveComparative,
   exports.AdjectiveSuperlative,
];

exports.ListItemMarker = "LS";

/** *Example:* can, should */
exports.Modal = "MD";

/** Example: :) */
exports.Emoticon = "M";

/** *Example:* cat */
exports.NounSingular = "NN";

/** *Example:* coalpha */
exports.NounProperSingular = "NNP";
exports.NounAnySingular = [exports.NounSingular, exports.NounProperSingular];

/** *Example:* cats */
exports.NounPlural = "NNS";

/** *Example:* Smiths */
exports.NounProperPlural = "NNPS";

exports.NounAnyPlural = [exports.NounPlural, exports.NounProperPlural];

exports.Noun = [exports.NounAnySingular, exports.NounAnyPlural];

/** 's */
exports.PosessiveEnding = "POS"; // lol POS, how meta

/** *Example:* all, both */
exports.Predeterminer = "PDT";

/** *Example:* my, hers */
exports.PossessivePronoun = "PRP$";

/** *Example:* I, she, you */
exports.PersonalPronoun = "PRP";

/** *Example:* quickly */
exports.AdverbNormal = "RB";

/** *Example:* faster */
exports.AdverbComparative = "RBR";

/** *Example:* fastest */
exports.AdverbSuperlative = "RBS";

/** You probably shouldn't use this.
 * These aren't interchangable
 */
exports.Adverb = [
   exports.AdverbNormal,
   exports.AdverbComparative,
   exports.AdverbSuperlative,
];

/** *Example:* up, off */
exports.Particle = "RP";

// I would have called it Symbol but that's already a thing
/** *Example:* +, %, & */
exports.LiteralSymbol = "SYM";

/** **To** */
exports.To = "TO";

/** *Example:* oh, oops, uh, bruh, guh */
exports.Interjection = "UH";

/** *Example:* flense */
exports.VerbBase = "VB";

/** *Example:* ate */
exports.VerbPast = "VBD";

/** *Example:* flensing */
exports.VerbGerund = "VBG";

/** *Example:* flensed */
exports.VerbPastParticle = "VBN";

/** *Example:* flense */
exports.VerbPresentPlural = "VBP";

/** *Example:* flenses */
exports.VerbPresentSingular = "VBZ";

/** *Example:* which, that */
exports.WhDeterminer = "WDT";

/** *Example:* who, what */
exports.WhPronoun = "WP";

/** *Example:* whose */
exports.WhPosessive = "WP$";

/** *Example:* where, how */
exports.WhAdverb = "WRB";

exports.Comma = ",";

/** *Example:* . ! ? */
exports.PunctuationSentenceFinal = ".";

/** *Example:* : ; */
exports.PunctuationSentenceMiddle = ":";

exports.DollarSign = "$";

exports.Hash = "#";

exports.Quote = '"';

exports.ParenLeft = "(";

exports.ParenRight = ")";


const anyTag = [
   "CC", "CD", "DT", "EX", "FW", "IN", "JJ", "JJR", "JJS", "LS",
   "MD", "NN", "NNP", "NNPS", "NNS", "POS", "PDT", "PRP$", "PRP", "RB",
   "RBR", "RBS", "RP", "SYM", "TO", "UH", "VB", "VBD", "VBG", "VBN", "VBP",
   "VBZ", "WDT", "WP", "WP$", "WRB", ",", ".", ":", "$", "#", "\"", "(", ")",
];

exports.anyTag = anyTag;

function isTag(s) {
   return (anyTag as string[]).includes(s);
}

exports.isTag = isTag;

function asTag(s) {
   if (isTag(s)) {
      return s;
   }
   throw new TypeError(`${s} is not a member of ${anyTag.join(", ")}!`);
}

exports.asTag = asTag;
