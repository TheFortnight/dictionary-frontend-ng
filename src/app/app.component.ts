import {
  Component,
  inject,
  NgModule
} from '@angular/core';
import {
  AppcontainerComponent
} from "./container/appcontainer/appcontainer.component";
import {
  RouterOutlet
} from '@angular/router';
import {
  HeaderComponent
} from "./header/header.component";
import {
  DictionariesService
} from './data/services/dictionaries.service';
//import { CommonModule } from '@angular/common';
import { Dictionary } from './data/interfaces/dictionary.interface';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppcontainerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /*title = 'dictionary';
  dictionariesService = inject(DictionariesService)
  dictionaries: Dictionary[] = []

  constructor() {
    this.dictionariesService.getDictionaries()
      .subscribe(val => {
        this.dictionaries = val;
      })
  }*/
}
