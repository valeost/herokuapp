import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApibaseService } from './apibase.service';

describe('ApibaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ApibaseService = TestBed.get(ApibaseService);
    expect(service).toBeTruthy();
  });
});
