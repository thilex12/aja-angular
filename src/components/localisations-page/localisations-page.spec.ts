import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalisationsPage } from './localisations-page';

describe('LocalisationsPage', () => {
  let component: LocalisationsPage;
  let fixture: ComponentFixture<LocalisationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalisationsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalisationsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
