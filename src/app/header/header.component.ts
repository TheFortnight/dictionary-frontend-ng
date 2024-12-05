import { Component, inject, Input, AfterViewInit } from '@angular/core';
import { Dictionary } from '../data/interfaces/dictionary.interface';
import { DictionariesService } from '../data/services/dictionaries.service';



@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
 @Input() dictionary!: Dictionary;
 title = 'dictionary';
  dictionariesService = inject(DictionariesService)
  dictionaries: Dictionary[] = []

  constructor() {

    this.dictionariesService.getDictionaries()
      .subscribe(val => {
        this.dictionaries = val;
      });

    
    }

    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.dictionariesService.addSearchBtnListener()

    
  }
}
