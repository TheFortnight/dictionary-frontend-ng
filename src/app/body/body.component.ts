import {
  Component,
  inject
} from '@angular/core';
import {
  CardsComponent
} from "./cards/cards.component";
import {
  SearchService
} from '../data/services/search.service';
import {
  WordInfo
} from '../data/interfaces/wordInfo.interface';
import {
  SearchhistoryComponent
} from './searchhistory/searchhistory.component';

@Component({
  selector: 'app-body',
  imports: [CardsComponent, SearchhistoryComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  standalone: true,
})

export class BodyComponent {

  searchService = inject(SearchService)

  constructor() {}

  result: WordInfo | null = null;
  

  ngOnInit(): void {
    console.log('Subscribing to wordDetails...');
    this.searchService.getWordDetails.subscribe(details => {
      console.log('Body Component received wordDetails update:', details); // Log updates

      this.result = details;
    });

  }

  showRes() {
    console.log('RES: ', this.result);
  }

}
