import { Component,Input } from '@angular/core';
import {HeaderComponent} from '../../header/header.component'
import {Header} from '../../header/header'
import { Teacher } from '../teacher';

@Component({
  selector: 'app-modify-access',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './modify-access.component.html',
  styleUrl: './modify-access.component.css'
})
export class ModifyAccessComponent {
  section : Header={
    name:'Admin/modifier_accès_encadrant',
  }
  @Input() teacher!: Teacher;
}
