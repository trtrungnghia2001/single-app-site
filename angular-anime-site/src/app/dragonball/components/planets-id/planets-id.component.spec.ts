import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsIdComponent } from './planets-id.component';

describe('PlanetsIdComponent', () => {
  let component: PlanetsIdComponent;
  let fixture: ComponentFixture<PlanetsIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetsIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
