import { Component } from '@angular/core';
import { Repository } from './models/repository.model';
import { GithubRestClientService } from './services/github-rest-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nexocraft';
  arr: Repository[] = [];

  constructor(private githubRestClient: GithubRestClientService) {

    this.githubRestClient.getUserRepositories("mh3061997").subscribe((res) => {
      this.arr = res;
      console.log(this.arr);
      
    })
  }
}
