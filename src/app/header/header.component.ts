import { Component, inject, Input, AfterViewInit } from '@angular/core';
import { Dictionary } from '../data/interfaces/dictionary.interface';
import { DictionariesService } from '../data/services/dictionaries.service';
import { SearchService } from '../data/services/search.service';
import { Word } from '../data/interfaces/word.interface';
import { WordInfo } from '../data/interfaces/wordInfo.interface';



@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
 @Input() dictionary!: Dictionary;
 title = 'dictionary';
  dictionariesService = inject(DictionariesService)
  dictionaries: Dictionary[] = []

  constructor(private searchService: SearchService) {
    this.dictionariesService.getDictionaries()
      .subscribe(val => {
        this.dictionaries = val;
      });
    
  }

  words: Word[] | null = [];
  wordInfo!: WordInfo;

  showSearchResult(event: Event, lang_id: string) {
    const target = event.target as HTMLInputElement;
    const word = target.value;
   
    const langIdNum: number = parseInt(lang_id)
    if (word.length >= 3) {
      this.searchService.searchWord(word, langIdNum).subscribe(result => {
        result.forEach(res => {
          console.log('Search Result: ', res.word)
        });
        this.words = result;
        
      })
    } else {
      this.words = null;
    }

   
  }

  showWordInfo(word_id: number){
    console.log('showWordInfo is called');
    this.words = null;
    this.searchService.getWordInfo(word_id).subscribe(result => {
      console.log('API Response for Word Info:', result); // Log full response
      this.wordInfo = result;
      
      //console.log('Emitting to BehaviorSubject:', this.wordInfo); // Log emission
      this.searchService.wordDetails.next(result); // Emit updated data
     
    });
  }

}
