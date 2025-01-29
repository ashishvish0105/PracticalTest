import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalMainSectionComponent } from './practical-main-section.component';

describe('PracticalMainSectionComponent', () => {
  let component: PracticalMainSectionComponent;
  let fixture: ComponentFixture<PracticalMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticalMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticalMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
