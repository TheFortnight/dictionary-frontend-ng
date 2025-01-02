import {
  Component,
  inject
} from '@angular/core';
import {
  SearchService
} from '../../data/services/search.service';
import { HistoryItem } from '../../data/interfaces/history_item.interface';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-searchhistory',
  imports: [],
  templateUrl: './searchhistory.component.html',
  styleUrl: './searchhistory.component.scss',
  standalone: true,
})
export class SearchhistoryComponent {

  searchService = inject(SearchService);
  headerComponent = inject(HeaderComponent);

  history: HistoryItem [] = [];
  historyToShow: HistoryItem [] = [];

  refreshHistory() {
    const storedWordsJson = localStorage.getItem('searchHistory');
    const storedWordsObj = JSON.parse(storedWordsJson!);
    this.historyToShow = storedWordsObj.history;
    
  }

  ngOnInit(): void {
    //console.log('Subscribing to search history...');
    this.searchService.getSearchHistory.subscribe((wordObj) => {
      console.log('new word to History:', wordObj); // Log updates

      if (wordObj && this.history.findIndex(historyItem => historyItem.word === wordObj.word) === -1) this.history.push(wordObj);
      localStorage.setItem('searchHistory', JSON.stringify({
        history: this.history
      }));
      this.refreshHistory()



    });

  }

  openWordFromHistory(word_id: number) {
    this.headerComponent.showWordInfo(word_id);
  }



}
