import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LacalisationDialog } from './localisation-dialog';

describe('LacalisationDialog', () => {
  let component: LacalisationDialog;
  let fixture: ComponentFixture<LacalisationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LacalisationDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LacalisationDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
