if (module.parent === null) {
   throw new Error("This module must be imported");
}

module.exports = function tagToString(tag) {
   return `[${tag.normal}, ${tag.pos}]`;
};
