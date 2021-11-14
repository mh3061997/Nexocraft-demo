import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  private root: String = "https://api.github.com/";
  private userRepositoriesPath: string = "users/{user}/repos";
  private participationPath: string = "repos/{user}/{repo}/stats/participation";
  private contributorsPath: string = "repos/{user}/{repo}/stats/contributors";
  private commitActivityPath: string = "repos/{user}/{repo}/stats/commit_activity";

  getUserRepositoriesPath(username: string) {
    return this.root + this.userRepositoriesPath.replace("{user}", username);
  }
  getParticipationPath(username: string,repoName:string) {
    return this.root + this.participationPath.replace("{user}", username).replace("{repo}",repoName);
  }
  getContributorsPath(username: string,repoName:string) {
    return this.root + this.contributorsPath.replace("{user}", username).replace("{repo}",repoName);
  }
  getCommitActivityPath(username: string,repoName:string) {
    return this.root + this.commitActivityPath.replace("{user}", username).replace("{repo}",repoName);
  }
  constructor() { }
}
