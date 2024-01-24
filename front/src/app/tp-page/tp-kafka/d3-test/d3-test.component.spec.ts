import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3TestComponent } from './d3-test.component';

describe('D3TestComponent', () => {
  let component: D3TestComponent;
  let fixture: ComponentFixture<D3TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3TestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D3TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
