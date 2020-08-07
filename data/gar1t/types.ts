export type Character = "beige" | "brown";
export type Sentence = [Character, string];
export interface Video {
   title: string,
   tags: string[],
   disabled: boolean,
   sentence: Sentence,
}
