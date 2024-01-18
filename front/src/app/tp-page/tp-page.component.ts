import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { TpKafkaComponent } from "./tp-kafka/tp-kafka.component";
import { CommonModule } from "@angular/common";
@Component({
    selector: "app-tp-page",
    standalone: true,
    imports: [TpKafkaComponent, CommonModule],
    templateUrl: "./tp-page.component.html",
    styleUrl: "./tp-page.component.css",
})
export class TpPageComponent implements OnInit {
    tpId!: Observable<string>;
    tp = tp;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.tpId = this.route.paramMap.pipe(switchMap((params: ParamMap) => params.get("id")!));
        this.fetchSessionInfo(this.tpId);
    }
    fetchSessionInfo(id: Observable<string>) {
        console.log(id);
    }
}
const tp = {
    type: "kafka",
};
