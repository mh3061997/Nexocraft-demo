import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Repository } from './models/repository.model';
import { GithubRestClientService } from './services/github-rest-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nexocraft';

  constructor() {  }

  
}
