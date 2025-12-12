import { TestBed } from '@angular/core/testing';

import { WhatTimeApi } from './what-time-api';

describe('WhatTimeApi', () => {
  let service: WhatTimeApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatTimeApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
