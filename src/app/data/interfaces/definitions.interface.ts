import { Data } from "@angular/router";

export interface Definition {
            id: number,
            word_id: number,
            definition: string,
            language_id: number,
            created_at: Data,
            updated_at: Data
        }