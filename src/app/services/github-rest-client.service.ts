import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contributor } from '../models/contributor.model';
import { Participation } from '../models/participation.model';
import { Repository } from '../models/repository.model';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class GithubRestClientService {

  constructor(private pathService: PathService,
    private httpClient: HttpClient) { }

  getUserRepositories(username: string): Observable<Repository[]> {
    let url = this.pathService.getUserRepositoriesPath(username);
    return this.httpClient.get<Repository[]>(url).pipe(
      map((responseArr) => {
        return responseArr.map((response: any) => {
          return new Repository(response.name, response.stargazers_count, response.language);
        });
        ;
      }));
  }
  getRepoContributors(username: string, repo: string): Observable<Contributor[]> {
    let url = this.pathService.getContributorsPath(username, repo);
    return this.httpClient.get<Contributor[]>(url).pipe(
      map((responseArr) => {
        return responseArr.map((response: any) => {
          return new Contributor(response.total, response.author.name);
        });
        ;
      }));
  }

  getRepoParticipation(username: string, repo: string): Observable<Participation[]> {
    let url = this.pathService.getParticipationPath(username, repo);
    return this.httpClient.get<Participation[]>(url);
  }
}
