function randMax(max) {
   return Math.random() * max|0;
}

function randAry(a) {
   return a[randMax(a.length)];
}

module.exports = {
   randMax,
   randAry,
};
