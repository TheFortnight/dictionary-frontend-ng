import { Definition } from "./definitions.interface"

export interface WordInfo {
    id: number,
    word_id: number,
    language_id: number,
    definitions: Definition []
}