import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  private root: String = "https://api.github.com/";
  private userRepositoriesPath: string = "users/{user}/repos";
  private participationPath: string = "repos/{user}/{repo}/stats/participation";
  private contributorsPath: string = "repos/{user}/{repo}/stats/contributors";

  getUserRepositoriesPath(username: string) {
    return this.root + this.userRepositoriesPath.replace("{user}", username);
  }
  getParticipationPath(username: string,repoName:string) {
    return this.root + this.participationPath.replace("{user}", username).replace("{repo}",repoName);
  }
  getContributorsPath(username: string,repoName:string) {
    return this.root + this.contributorsPath.replace("{user}", username).replace("{repo}",repoName);
  }
  constructor() { }
}
