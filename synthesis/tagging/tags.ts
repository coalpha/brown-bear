/**
 * **FANBOYS**:
 *
 * for, and, nor, but, or, yet, so
 */
export type CoordinatingConjunction = "CC";

/**
 * Spoken numbers:
 *
 * one, two, three, ...etc
 */
export type CardinalNumber = "CD";

/**
 * Articles: a, an, the
 */
export type Determiner = "DT";

/** *Example:* mon dieu */
export type ForeignWord = "FW";

/** *Example:* in, of, by */
export type Preposition = "IN";

/** *Example:* big */
export type AdjectiveNormal = "JJ";

/** *Example:* bigger */
export type AdjectiveComparative = "JJR";

/** *Example:* biggest */
export type AdjectiveSuperlative = "JJS";

export type Adjective = AdjectiveNormal | AdjectiveComparative | AdjectiveSuperlative;

export type ListItemMarker = "LS";

/** *Example:* can, should */
export type Modal = "MD";

/** *Example:* cat */
export type NounSingular = "NN";

/** *Example:* coalpha */
export type NounProperSingular = "NNP";
export type NounAnySingular = NounSingular | NounProperSingular;

/** *Example:* cats */
export type NounPlural = "NNS";

/** *Example:* Smiths */
export type NounProperPlural = "NNPS";

export type NounAnyPlural = NounPlural | NounProperPlural;

export type Noun = NounAnySingular | NounAnyPlural;

/** 's */
export type PosessiveEnding = "POS"; // lol POS, how meta

/** *Example:* all, both */
export type Predeterminer = "PDT";

/** *Example:* my, hers */
export type PossessivePronoun = "PRP$";

/** *Example:* I, she, you */
export type PersonalPronoun = "PRP";

/** *Example:* quickly */
export type AdverbNormal = "RB";

/** *Example:* faster */
export type AdverbComparative = "RBR";

/** *Example:* fastest */
export type AdverbSuperlative = "RBS";

/** You probably shouldn't use this.
 * These aren't interchangable
 */
export type Adverb = AdverbNormal | AdverbComparative | AdverbSuperlative;

/** *Example:* up, off */
export type Particle = "RP";

// I would have called it Symbol but that's already a thing
/** *Example:* +, %, & */
export type LiteralSymbol = "SYM";

/** **To** */
export type To = "TO";

/** *Example:* oh, oops, uh, bruh, guh */
export type Interjection = "UH";

/** *Example:* flense */
export type VerbBase = "VB";

/** *Example:* ate */
export type VerbPast = "VBD";

/** *Example:* flensing */
export type VerbGerund = "VBG";

/** *Example:* flensed */
export type VerbPastParticle = "VBN";

/** *Example:* flense */
export type VerbPresentPlural = "VBP";

/** *Example:* flenses */
export type VerbPresentSingular = "VBZ";

/** *Example:* which, that */
export type WhDeterminer = "WDT";

/** *Example:* who, what */
export type WhPronoun = "WP";

/** *Example:* whose */
export type WhPosessive = "WP$";

/** *Example:* where, how */
export type WhAdverb = "WRB";

export type Comma = ",";

/** *Example:* . ! ? */
export type PunctuationSentenceFinal = ".";

/** *Example:* : ; */
export type PunctuationSentenceMiddle = ":";

export type DollarSign = "$";

export type Hash = "#";

export type Quote = '"';

export type ParenLeft = "(";

export type ParenRight = ")";

export type AnyTag = (
   "CC" | "CD" | "DT" | "EX" | "FW" | "IN" | "JJ" | "JJR" | "JJS" | "LS" |
   "MD" | "NN" | "NNP" | "NNPS" | "NNS" | "POS" | "PDT" | "PRP$" | "PRP" | "RB" |
   "RBR" | "RBS" | "RP" | "SYM" | "TO" | "UH" | "VB" | "VBD" | "VBG" | "VBN" | "VBP" |
   "VBZ" | "WDT" | "WP" | "WP$" | "WRB" | "," | "." | ":" | "$" | "#" | "\"" | "(" | ")"
);

export const anyTag: AnyTag[] = [
   "CC", "CD", "DT", "EX", "FW", "IN", "JJ", "JJR", "JJS", "LS",
   "MD", "NN", "NNP", "NNPS", "NNS", "POS", "PDT", "PRP$", "PRP", "RB",
   "RBR", "RBS", "RP", "SYM", "TO", "UH", "VB", "VBD", "VBG", "VBN", "VBP",
   "VBZ", "WDT", "WP", "WP$", "WRB", ",", ".", ":", "$", "#", "\"", "(", ")",
];

export function isTag(s: string): boolean {
   return (anyTag as string[]).includes(s);
}

export function asTag(s: string): AnyTag {
   if (isTag(s)) {
      return s as AnyTag;
   }
   throw new TypeError(`${s} is not a member of ${anyTag.join(", ")}!`);
}
