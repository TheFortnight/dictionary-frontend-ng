import {
  Definition
} from "./definitions.interface"

export interface WordInfo {
links: any
examples: any
    word: any,
    id: number,
    word_id: number,
    language_id: number,
    definitions: Definition[]
}
