import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DattebayoComponent } from './dattebayo.component';

describe('DattebayoComponent', () => {
  let component: DattebayoComponent;
  let fixture: ComponentFixture<DattebayoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DattebayoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DattebayoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
