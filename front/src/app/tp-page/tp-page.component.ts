import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TpKafkaComponent } from "./tp-kafka/tp-kafka.component";
import { TpScrappingComponent } from "./tp-scrapping/tp-scrapping.component";
import { CommonModule } from "@angular/common";
import { Session, SessionStatus } from "../models/session.model";

@Component({
    selector: "app-tp-page",
    standalone: true,
    imports: [TpKafkaComponent, TpScrappingComponent, CommonModule],
    templateUrl: "./tp-page.component.html",
    styleUrl: "./tp-page.component.css",
})
export class TpPageComponent implements OnInit {
    tpId!: string;
    tp = tp;
    session!: Session;
    token!: string;
    historyStudentLevel!: string;

    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.tpId = params["id"];
            console.log("tp-page");
        });
        const receivedData = this.route.snapshot.queryParams;
        console.log(receivedData);
        this.token = receivedData["token"];
        this.historyStudentLevel = receivedData["level"];

        this.session = {
            id: receivedData["id"],
            name: receivedData["name"],
            TP: receivedData["TP"],
            teachers: [],
            startDate: receivedData["startDate"],
            endDate: receivedData["endDate"],
            indexGrades: new Map<string, number>(),
            status: SessionStatus.INPROGRESS,
            joined: true,
        };
    }
}
const tp = "kafka";
