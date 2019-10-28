import { TestBed } from '@angular/core/testing';

import { BuildShellService } from './build-shell.service';

describe('BuildShellService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildShellService = TestBed.get(BuildShellService);
    expect(service).toBeTruthy();
  });
});
