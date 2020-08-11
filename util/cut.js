// The names have no meaning but they needed to be different lol.
/** [0, i) [i len) */
function cut(s, i) {
   return [s.slice(0, i|0), s.slice(i|0)];
}

/** [0, i) i (i len) */
function cutM(s, i) {
   return [s.slice(0, i|0), s[i|0], s.slice(i + 1|0)];
}

/** [0, i) (i len) */
function cutD(s, i) {
   return [s.slice(0, i), s.slice(i + 1|0)];
}

module.exports = {
   cut, cutM, cutD,
};
