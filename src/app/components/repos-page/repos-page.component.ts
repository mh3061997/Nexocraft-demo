import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Repository } from 'src/app/models/repository.model';
import { GithubRestClientService } from 'src/app/services/github-rest-client.service';

@Component({
  selector: 'app-repos-page',
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss']
})
export class ReposPageComponent implements OnInit {

  repos: Repository[] = [];
  username: string | undefined;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private githubRestClient: GithubRestClientService) {

    this.setUsername().subscribe(repos => {
      this.repos = repos;
    });

  }

  ngOnInit(): void {
  }

  goToStats(repo: string) {
    this.router.navigate(['stats'], { queryParams: { username: this.username, repo: repo } });
  }
  setUsername() {
    return this.currentRoute.queryParams
      .pipe(
        switchMap(params => {
          this.username = params.username
          //if no username provided redirect to search page
          if (!this.username) {
            this.router.navigate([".."]);
          }
          return this.getRepos();
        }));
  }

  getRepos() {
    return this.githubRestClient.getUserRepositories(this.username!);
  }
}
