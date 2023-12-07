import { Component } from '@angular/core';
import {HeaderComponent} from '../../header/header.component'
import {Header} from '../../header/header'
@Component({
  selector: 'app-session-create',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './session-create.component.html',
  styleUrl: './session-create.component.css'
})
export class SessionCreateComponent {
  section: Header = {
    name:"Session/création"
  }
}
