import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { AccueilComponent } from "./mainpage/accueil/accueil.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterModule, SideBarComponent, RouterOutlet, AccueilComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    title = "front";
    constructor(public router: Router) {}
}
