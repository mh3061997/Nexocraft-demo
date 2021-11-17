import { Component, OnInit } from '@angular/core';
import { Options, SeriesOptionsType } from "highcharts";
import * as Highcharts from 'highcharts';
import { Activity } from 'src/app/models/activity.model';
import { GithubRestClientService } from 'src/app/services/github-rest-client.service';
import { MapperService } from 'src/app/services/mapper.service';

import HC_exporting from "highcharts/modules/exporting";
import HC_exporting_DATA from "highcharts/modules/export-data";
import { Contributor } from 'src/app/models/contributor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

HC_exporting(Highcharts);
HC_exporting_DATA(Highcharts);

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  participationData: SeriesOptionsType[] = [];
  commitActivityData: number[][] = [];
  contributorsData: Contributor[] | undefined;
  participationChartOptions: Highcharts.Options | undefined;
  commitActivityChartOptions: Highcharts.Options | undefined;
  username: string = "";
  repo: string = "";

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private location: Location,
    private githubClient: GithubRestClientService, private mapper: MapperService) {

    //If repo or username missing redirect to search page
    this.currentRoute.queryParams.subscribe(params => {
      this.username = params.username;
        this.repo = params.repo;
      if (!this.username || !this.repo) {
        this.router.navigate(['search']);
      }
    });

    this.githubClient.getRepoParticipation(this.username, this.repo).subscribe(response => {
      //Map array to highchart's format
      this.participationData = this.mapper.formatParticipationArray(response);
      //initialize chart options
      this.initParticipationChartOptions();
    });

    this.githubClient.getRepoCommitActivity(this.username, this.repo).subscribe(response => {
      //Data already in correct format no need to map
      this.commitActivityData = this.mapper.formatCommitActivityArray(response);
      //initialize chart options
      this.initCommitActivityChartOptions();
    });

    this.githubClient.getRepoTopFiveContributors(this.username, this.repo).subscribe(response => {
      this.contributorsData = response;
    })


  }


  private initParticipationChartOptions() {
    this.participationChartOptions = {
      series: this.participationData,


      title: {
        text: 'Participation Line Graph'
      },

      yAxis: {
        title: {
          text: 'Number of Commits'
        }
      },

      xAxis: {
        title: {
          text: 'Week'
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

    };
  }
  private initCommitActivityChartOptions() {
    this.commitActivityChartOptions = {
      series: [{
        name: "commits",
        type: 'bar',
        data: this.commitActivityData
      }],

      chart: {
        type: "column", zoomType: 'x'
      },
      title: {
        text: 'Commit Activity'
      },
      yAxis: {
        title: {
          text: 'Number of Commits'
        }
      },
      xAxis: {
        title: {
          text: 'Week'
        },
        type: "datetime",
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

    };
  }
  goBack() {
    this.location.back();
  }
  ngOnInit(): void {
  }

}
