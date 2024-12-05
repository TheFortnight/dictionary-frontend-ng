import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dictionary } from '../interfaces/dictionary.interface';
import { Word } from '../interfaces/word.interface';

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {
  http = inject(HttpClient)
  baseApiUrl = 'http://127.0.0.1:8051/api/';
  words: Word[] = [];

  getDictionaries() {
    return this.http.get<Dictionary[]>(`${this.baseApiUrl}dictionaries`)
  }

  searchWord(word: string, language_id: number) {
    return this.http.get<Word[]>(`${this.baseApiUrl}search?word=${word}&language_id=${language_id}`)
  }

  addSearchBtnListener() {    
  console.log('ADDING A LISTENER');
  const searchBtn = document.querySelector('.search-btn') as HTMLButtonElement;

  searchBtn.addEventListener('click', (event) => {
    console.log('CLICK!');
    event.preventDefault();

    const search = document.querySelector('.search') as HTMLInputElement;
    const word: string = search.value;

    const language = document.querySelector('.languages') as HTMLSelectElement;
    const languageStr: string = language.value;
    const languade_id: number = parseInt(languageStr, 10);

    this.searchWord(word, languade_id).subscribe((resp: Word[]) => {
      this.words = resp;
      console.log('Search results:', this.words); // Log the results
    });
  });
}

}
