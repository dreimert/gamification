import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultDialogComponent } from './consult-dialog.component';

describe('ConsultDialogComponent', () => {
  let component: ConsultDialogComponent;
  let fixture: ComponentFixture<ConsultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
