import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpScrappingComponent } from './tp-scrapping.component';

describe('TpScrappingComponent', () => {
  let component: TpScrappingComponent;
  let fixture: ComponentFixture<TpScrappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpScrappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpScrappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
