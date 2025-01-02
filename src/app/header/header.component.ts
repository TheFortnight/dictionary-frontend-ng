import {
  Component,
  inject,
  Input,
  AfterViewInit,
  Injectable
} from '@angular/core';
import {
  Dictionary
} from '../data/interfaces/dictionary.interface';
import {
  DictionariesService
} from '../data/services/dictionaries.service';
import {
  SearchService
} from '../data/services/search.service';
import {
  Word
} from '../data/interfaces/word.interface';
import {
  WordInfo
} from '../data/interfaces/wordInfo.interface';



@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})

@Injectable({
  providedIn: 'root'
})

export class HeaderComponent {
  @Input() dictionary!: Dictionary;
  title = 'dictionary';
  dictionariesService = inject(DictionariesService)
  searchService = inject(SearchService)
  dictionaries: Dictionary[] = []

  constructor() {
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
        result.data.forEach(res => {
          console.log('Search Result: ', res.word)
        });
        this.words = result.data;

      })
    } else {
      this.words = null;
    }

  }

  showSearchResultDict(word: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const lang_id = target.value;

    const langIdNum: number = parseInt(lang_id)
    if (word.length >= 3) {
      this.searchService.searchWord(word, langIdNum).subscribe(result => {
        result.data.forEach(res => {
          console.log('Search Result: ', res.word)
          
        });
        this.words = result.data;

      })
    } else {
      this.words = null;
    }


  }

  showWordInfo(word_id: number) {
    console.log('showWordInfo is called');
    this.words = null;
    this.searchService.getWordInfo(word_id).subscribe(result => {
      console.log('API Response for Word Info:', result); // Log full response
      this.wordInfo = result;
      this.searchService.updateHistory({word: result.word.word, id: result.word.id});

      //console.log('Emitting to BehaviorSubject:', this.wordInfo); // Log emission
      this.searchService.wordDetails.next(result); // Emit updated data

    });
  }

}
