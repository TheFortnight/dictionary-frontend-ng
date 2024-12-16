import { Component } from '@angular/core';
import { CardsComponent } from "./cards/cards.component";

@Component({
  selector: 'app-body',
  imports: [CardsComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss',
  standalone: true,
})
export class BodyComponent {

}
