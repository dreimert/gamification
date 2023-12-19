import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSessionNoteComponent } from './list-session-note.component';
import { Observable, of } from "rxjs";
import { Session, SessionStatus, TeacherSession } from '../../../models/session.model';
import { SessionService } from '../../../services/session.service';

let sessionServiceStub: Partial<SessionService>;

describe('ListSessionNoteComponent', () => {
    sessionServiceStub = {
        getAllSessions(): Observable<Session[] | TeacherSession[]> {
            return of<Session[]>([
                {
                    id: "1",
                    name: "test",
                    teachers: ["1"],
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
                    TP: "1",
                    status: SessionStatus.SCHEDULED,
                },
            ]);
        },
    }; 
  let component: ListSessionNoteComponent;
  let fixture: ComponentFixture<ListSessionNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSessionNoteComponent],
      providers:[
        { provide: SessionService, useValue: sessionServiceStub },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSessionNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
