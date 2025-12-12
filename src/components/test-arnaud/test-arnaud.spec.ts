import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestArnaud } from './test-arnaud';

describe('TestArnaud', () => {
  let component: TestArnaud;
  let fixture: ComponentFixture<TestArnaud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestArnaud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestArnaud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
