import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Word } from '../interfaces/word.interface';
import { WordInfo } from '../interfaces/wordInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  http = inject(HttpClient)
  baseApiUrl = 'http://127.0.0.1:8051/api/';
  words: Word[] = [];
  wordInfo!: WordInfo;

  searchWord(word: string, language_id: number) {
    
    return this.http.get<Word[]>(`${this.baseApiUrl}search?word=${word}&language_id=${language_id}`)
    
  }

  showSearchResult (event: Event, lang_id: string) {
    const target = event.target as HTMLInputElement;
    const word = target.value;
    const langIdNum: number = parseInt(lang_id)
    if (word.length >= 3) {
      this.searchWord(word, langIdNum).subscribe(result => {
        result.forEach(res => {
          console.log('Search Result: ', res.word)
        });
        this.words = result;
        
      })
    }
    
  }
  getWordInfo (wordId: number) {
    return this.http.get<WordInfo>(`${this.baseApiUrl}word/${wordId}`)
  }

  showWordInfo (word_id: number) {
    this.getWordInfo(word_id).subscribe(result => {
      this.wordInfo = result;
      console.log('Word Definition: ', result.definitions[0].definition);
    })

  }


}
