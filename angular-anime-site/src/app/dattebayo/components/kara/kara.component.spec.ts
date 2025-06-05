import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaraComponent } from './kara.component';

describe('KaraComponent', () => {
  let component: KaraComponent;
  let fixture: ComponentFixture<KaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KaraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
