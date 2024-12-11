import { Component, inject, Input, AfterViewInit } from '@angular/core';
import { Dictionary } from '../data/interfaces/dictionary.interface';
import { DictionariesService } from '../data/services/dictionaries.service';
import { SearchService } from '../data/services/search.service';



@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends SearchService{
 @Input() dictionary!: Dictionary;
 title = 'dictionary';
  dictionariesService = inject(DictionariesService)
  dictionaries: Dictionary[] = []

  constructor() {

    super();
    this.dictionariesService.getDictionaries()
      .subscribe(val => {
        this.dictionaries = val;
      });
    
    }

}
