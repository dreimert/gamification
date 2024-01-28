import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TpKafkaComponent } from "./tp-kafka/tp-kafka.component";
import { TpScrappingComponent } from "./tp-scrapping/tp-scrapping.component";
import { CommonModule } from "@angular/common";
import { Session, TeacherSession } from "../models/session.model";
import { SessionService } from "../services/session.service";

@Component({
    selector: "app-tp-page",
    standalone: true,
    imports: [TpKafkaComponent, TpScrappingComponent, CommonModule],
    templateUrl: "./tp-page.component.html",
    styleUrl: "./tp-page.component.css",
})
export class TpPageComponent implements OnInit {
    tpId!: string;
    session!: Session | undefined;
    token!: string;
    historyStudentLevel!: string;

    constructor(
        private route: ActivatedRoute,
        private sessionService: SessionService,
    ) {}
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.tpId = params["id"];
        });
        const receivedData = this.route.snapshot.queryParams;
        this.token = receivedData["token"];
        this.historyStudentLevel = receivedData["level"];
        this.fetchSessionInfo(this.tpId);
    }

    fetchSessionInfo(id: string) {
        this.sessionService.getAvailableSessions().subscribe((sessions: Session[] | TeacherSession[]) => {
            this.session = sessions.find((e) => {
                return e.id === id;
            }) as Session;
        });
    }
}
