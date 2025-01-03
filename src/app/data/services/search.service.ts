import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Word } from '../interfaces/word.interface';
import { WordInfo } from '../interfaces/wordInfo.interface';
import { BehaviorSubject } from 'rxjs';
import {SearchDtoInterface} from '../interfaces/searchDto.interface';
import { HistoryItem } from '../interfaces/history_item.interface';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() { }

  http = inject(HttpClient)
  baseApiUrl = 'http://127.0.0.1:8051/api/';
  words: Word[] | null = [];
  wordInfo!: WordInfo;


  searchWord(word: string, language_id: number) {
    return this.http.get<SearchDtoInterface>(`${this.baseApiUrl}words?word=${word}&language_id=${language_id}`)
  }

  showSearchResult (event: Event, lang_id: string) {

  }
  getWordInfo (wordId: number) {
    return this.http.get<WordInfo>(`${this.baseApiUrl}word/${wordId}`)
  }

  wordDetails = new BehaviorSubject<WordInfo | null>(null);
  getWordDetails = this.wordDetails.asObservable();

  updateDetails(wordDet: WordInfo) {
    this.wordDetails.next(wordDet)
  }

  searchHistory = new BehaviorSubject<HistoryItem | null>(null);
  getSearchHistory = this.searchHistory.asObservable();

  updateHistory(searchedWord: HistoryItem) {
    this.searchHistory.next(searchedWord);
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

  showWordInfo(word_id: number) {
    console.log('showWordInfo is called');
    this.words = null;
    this.getWordInfo(word_id).subscribe(result => {
      console.log('API Response for Word Info:', result); // Log full response
      this.wordInfo = result;
      this.updateHistory({word: result.word.word, id: result.word.id});

      //console.log('Emitting to BehaviorSubject:', this.wordInfo); // Log emission
      this.wordDetails.next(result); // Emit updated data

    });
  }



}
