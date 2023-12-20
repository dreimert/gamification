import { Component, Input } from '@angular/core';
import { SidebarButton } from './sidebarButton';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-button',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-button.component.html',
})
export class SidebarButtonComponent {
  @Input() sidebarButton!: SidebarButton;
}
