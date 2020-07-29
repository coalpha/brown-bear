export function randMax_i32(max: number) {
   return Math.random() * max|0;
}

export function randAry(a: any[]) {
   return a[randMax_i32(a.length)];
}
