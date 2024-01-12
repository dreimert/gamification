import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSessionProgrammedComponent } from './edit-session-programmed.component';

describe('EditSessionProgrammedComponent', () => {
  let component: EditSessionProgrammedComponent;
  let fixture: ComponentFixture<EditSessionProgrammedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSessionProgrammedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSessionProgrammedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
