import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReposPageComponent } from './components/repos-page/repos-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { StatsPageComponent } from './components/stats-page/stats-page.component';

const routes: Routes = [
  {
    path: "repos", component: ReposPageComponent,
  }, {
    path: "stats", component: StatsPageComponent
  }, {
    path: "search", component: SearchPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
