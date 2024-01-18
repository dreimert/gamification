import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TpKafkaComponent } from "./tp-kafka/tp-kafka.component";
import { CommonModule } from "@angular/common";
import { Session, TeacherSession } from "../models/session.model";
import { SessionService } from "../services/session.service";
@Component({
    selector: "app-tp-page",
    standalone: true,
    imports: [TpKafkaComponent, CommonModule],
    templateUrl: "./tp-page.component.html",
    styleUrl: "./tp-page.component.css",
})
export class TpPageComponent implements OnInit {
    tpId!: string;
    tp = tp;
    session!: Session;
    constructor(
        private route: ActivatedRoute,
        private sessionService: SessionService,
    ) {}
    ngOnInit() {
        this.route.params.subscribe((params) => (this.tpId = params["id"]));
        this.fetchSessionInfo(this.tpId);
    }
    fetchSessionInfo(id: string) {
        this.sessionService.getAvailableSessions().subscribe((sessions: Session[] | TeacherSession[]) => {
            this.session = sessions.find((element) => element.id === this.tpId) as Session;
        });
        this.session.TP = "kafka";
        console.log("id: " + id);
        // console.log(("sid: " + this.session.id) as string);
    }
}
const tp = "kafka";
