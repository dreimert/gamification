import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamPopupComponent } from './param-popup.component';

describe('ParamPopupComponent', () => {
  let component: ParamPopupComponent;
  let fixture: ComponentFixture<ParamPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
