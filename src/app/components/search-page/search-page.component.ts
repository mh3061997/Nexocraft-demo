import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubRestClientService } from 'src/app/services/github-rest-client.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateReposPage(username: string) {

    this.router.navigate(['repos'], { queryParams: { username: username } });

  }
}
