if (module.parent === null) {
   throw new Error("This module must be imported");
}

module.exports = function tokenToString(token) {
   return `[${token.value}, ${token.tag}]`;
};
