import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Repository } from 'src/app/models/repository.model';
import { GithubRestClientService } from 'src/app/services/github-rest-client.service';

@Component({
  selector: 'app-repos-page',
  templateUrl: './repos-page.component.html',
  styleUrls: ['./repos-page.component.scss']
})
export class ReposPageComponent implements OnInit {

  repos: Repository[] = [];

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private githubRestClient: GithubRestClientService) {

    let username: string;
    this.currentRoute.queryParams.subscribe(params => {
      username = params.username
      if (!username) {
      this.router.navigate([".."]);
      }
    });

    this.githubRestClient.getUserRepositories(username!).subscribe(repos => {
      this.repos = repos;
    });
  }

  ngOnInit(): void {
    this.repos = history.state.repos;
    console.log("repos are ", this.repos);

  }

}
