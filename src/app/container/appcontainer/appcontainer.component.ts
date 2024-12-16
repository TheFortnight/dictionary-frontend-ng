import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { BodyComponent } from "../../body/body.component";


@Component({
  selector: 'app-appcontainer',
  imports: [HeaderComponent, BodyComponent],
  templateUrl: './appcontainer.component.html',
  styleUrl: './appcontainer.component.scss',
  standalone: true,
})
export class AppcontainerComponent {

}
