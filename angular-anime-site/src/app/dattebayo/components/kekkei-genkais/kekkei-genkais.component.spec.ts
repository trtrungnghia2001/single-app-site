import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KekkeiGenkaisComponent } from './kekkei-genkais.component';

describe('KekkeiGenkaisComponent', () => {
  let component: KekkeiGenkaisComponent;
  let fixture: ComponentFixture<KekkeiGenkaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KekkeiGenkaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KekkeiGenkaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
