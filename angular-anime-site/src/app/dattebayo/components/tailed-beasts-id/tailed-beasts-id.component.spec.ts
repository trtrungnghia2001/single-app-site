import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailedBeastsIdComponent } from './tailed-beasts-id.component';

describe('TailedBeastsIdComponent', () => {
  let component: TailedBeastsIdComponent;
  let fixture: ComponentFixture<TailedBeastsIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailedBeastsIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailedBeastsIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
