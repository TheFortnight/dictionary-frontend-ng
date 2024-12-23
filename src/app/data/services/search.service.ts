import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Word } from '../interfaces/word.interface';
import { WordInfo } from '../interfaces/wordInfo.interface';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  http = inject(HttpClient)
  baseApiUrl = 'http://127.0.0.1:8051/api/';
  words: Word[] | null = [];
  

  searchWord(word: string, language_id: number) {
    
    return this.http.get<Word[]>(`${this.baseApiUrl}search?word=${word}&language_id=${language_id}`)
    
  }

  showSearchResult (event: Event, lang_id: string) {
     
  }
  getWordInfo (wordId: number) {
    return this.http.get<WordInfo>(`${this.baseApiUrl}word/${wordId}`)
  }

  wordDetails = new BehaviorSubject<WordInfo | null>(null);
  //wordDetails = new BehaviorSubject('fisrt state');

  getWordDetails = this.wordDetails.asObservable();

  updateDetails(wordDet: WordInfo) {
    this.wordDetails.next(wordDet)
  }
  

  showWordInfo(word_id: number) {
    
   
  }

  res: any | null = null;  

  ngOnInit(): void {
    console.log('Subscribing to wordDetails from Search...');
    this.getWordDetails.subscribe(details => {
        console.log('Received wordDetails update in search:', details); // Log updates
       // this.result = details;
       this.res = details;
      });
  }


}
