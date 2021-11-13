import { TestBed } from '@angular/core/testing';

import { GithubRestClientService } from './github-rest-client.service';

describe('GithubRestClientService', () => {
  let service: GithubRestClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubRestClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
