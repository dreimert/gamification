import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSessionOngoingComponent } from './edit-session-ongoing.component';

describe('EditSessionOngoingComponent', () => {
  let component: EditSessionOngoingComponent;
  let fixture: ComponentFixture<EditSessionOngoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSessionOngoingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSessionOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
