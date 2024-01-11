import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { LoadingService } from "./services/loading.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterModule, SideBarComponent, RouterOutlet],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
    // Hacky way to prevent the navbar from showing for a split second when loading a page that doesn't require authentication
    protected loading: boolean = false;
    private subscription!: Subscription;

    constructor(
        private loadingService: LoadingService,
        public router: Router,
    ) {}

    ngOnInit() {
        this.subscription = this.loadingService.loading$.subscribe((loading) => (this.loading = loading));
    }

    protected readonly location = location;
}
