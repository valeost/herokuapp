import { TestBed } from '@angular/core/testing';
import { CityToolbarService } from './city-toolbar.service';



describe('CityToolbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityToolbarService = TestBed.get(CityToolbarService);
    expect(service).toBeTruthy();
  });
});
