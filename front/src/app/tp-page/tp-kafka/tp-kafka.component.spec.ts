import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpKafkaComponent } from './tp-kafka.component';

describe('TpKafkaComponent', () => {
  let component: TpKafkaComponent;
  let fixture: ComponentFixture<TpKafkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpKafkaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpKafkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
