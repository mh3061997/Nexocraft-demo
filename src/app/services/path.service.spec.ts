import { TestBed } from '@angular/core/testing';

import { PathService } from './path.service';

describe('PathService', () => {
  let service: PathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathService);
  });

  it('should interpolate commit activity path', () => {
    expect(service.getCommitActivityPath("spring", "spring")).toEqual("https://api.github.com/repos/spring/spring/stats/commit_activity");
  });
  it('should interpolate participation path', () => {
    expect(service.getParticipationPath("spring", "spring")).toEqual("https://api.github.com/repos/spring/spring/stats/participation");
  });
  it('should interpolate user repos path', () => {
    expect(service.getUserRepositoriesPath("spring")).toEqual("https://api.github.com/users/spring/repos");
  });
  it('should interpolate contributors path', () => {
    expect(service.getContributorsPath("spring", "spring")).toEqual("https://api.github.com/repos/spring/spring/stats/contributors");
  });
});
