import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaIdComponent } from './media-id.component';

describe('MediaIdComponent', () => {
  let component: MediaIdComponent;
  let fixture: ComponentFixture<MediaIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
