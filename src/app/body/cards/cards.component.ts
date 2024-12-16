import { Component } from '@angular/core';
import { SearchService } from '../../data/services/search.service';
import { WordInfo } from '../../data/interfaces/wordInfo.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
})
export class CardsComponent {

  constructor(private searchService: SearchService) {}

  result: WordInfo | null = null;
  

  ngOnInit(): void {
    console.log('Subscribing to wordDetails...');
    this.searchService.getWordDetails.subscribe(details => {
        //console.log('Received wordDetails update:', details); // Log updates
       
       this.result = details;
      });
  }

}
