import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpingBonusComponent } from './helping-bonus.component';

describe('HelpingBonusComponent', () => {
  let component: HelpingBonusComponent;
  let fixture: ComponentFixture<HelpingBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpingBonusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpingBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
