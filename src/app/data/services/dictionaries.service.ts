import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dictionary } from '../interfaces/dictionary.interface';
import { Word } from '../interfaces/word.interface';
import { WordInfo } from '../interfaces/wordInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {
  http = inject(HttpClient)
  baseApiUrl = 'https://res8.some-programator.ru/api/' //'http://127.0.0.1:8051/api/';
  words: Word[] = [];
  

  getDictionaries() {
    return this.http.get<Dictionary[]>(`${this.baseApiUrl}dictionaries`)
  }

  searchWord(word: string, language_id: number) {
    return this.http.get<Word[]>(`${this.baseApiUrl}search?word=${word}&language_id=${language_id}`)
  }


}
