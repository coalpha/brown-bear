import posTagger from "wink-pos-tagger";
import { AnyTag } from "./tags";
import { cutD } from "../../util/cut";

type EntryType = "Normal" | "Transform";
interface Entry {
   type: EntryType;
}

interface EntryNormal extends Entry {
   type: "Normal",
   word: string,
   tag: AnyTag,
}

interface EntryTransform extends Entry {
   type: "Transform",
   inTag: AnyTag,
   outTag: AnyTag,
   subject: string,
}
