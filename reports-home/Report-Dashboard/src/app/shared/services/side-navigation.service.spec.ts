import { TestBed } from '@angular/core/testing';

import { SideNavigationService } from './side-navigation.service';

describe('SideNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SideNavigationService = TestBed.get(SideNavigationService);
    expect(service).toBeTruthy();
  });
});
