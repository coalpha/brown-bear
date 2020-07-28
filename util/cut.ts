// The names have no meaning but they needed to be different lol.
/** [0, i) [i len) */
export function cut(s: string, i: number): [string, string] {
   return [s.slice(0, i|0), s.slice(i|0)];
}

/** [0, i) i (i len) */
export function cutM(s: string, i: number): [string, string, string] {
   return [s.slice(0, i|0), s[i|0], s.slice(i + 1|0)];
}

/** [0, i) (i len) */
export function cutD(s: string, i: number): [string, string] {
   return [s.slice(0, i), s.slice(i + 1|0)];
}
