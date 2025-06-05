import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailedBeastsComponent } from './tailed-beasts.component';

describe('TailedBeastsComponent', () => {
  let component: TailedBeastsComponent;
  let fixture: ComponentFixture<TailedBeastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailedBeastsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailedBeastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
