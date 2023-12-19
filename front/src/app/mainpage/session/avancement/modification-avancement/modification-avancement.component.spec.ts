import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationAvancementComponent } from './modification-avancement.component';

describe('ModificationAvancementComponent', () => {
  let component: ModificationAvancementComponent;
  let fixture: ComponentFixture<ModificationAvancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationAvancementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
