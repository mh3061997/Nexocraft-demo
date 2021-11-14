import { Component, OnInit } from '@angular/core';
import { Options, SeriesOptionsType } from "highcharts";
import * as Highcharts from 'highcharts';
import { Activity } from 'src/app/models/activity.model';
import { GithubRestClientService } from 'src/app/services/github-rest-client.service';
import { MapperService } from 'src/app/services/mapper.service';

import HC_exporting from "highcharts/modules/exporting";
import HC_exporting_DATA from "highcharts/modules/export-data";
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
  commitActivityData:Activity[] = [];
  commitActivityCategories:Date[]=[];
  participationChartOptions: Highcharts.Options | undefined;
  commitActivityChartOptions: Highcharts.Options | undefined;

  constructor(private githubClient: GithubRestClientService, private mapper: MapperService) {

    this.githubClient.getRepoParticipation("spring", "spring").subscribe(response => {
      this.participationData = this.mapper.formatParticipationArray(response);
      this.initParticipationChartOptions();
    });

    this.githubClient.getRepoCommitActivity("spring", "spring").subscribe(response => {
      this.commitActivityData = response;
      // this.commitActivityCategories=this.mapper.formatCommitActivityArrayCategories(response);
      this.initCommitActivityChartOptions();
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
          text: 'Last 52 Weeks'
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
        name:"commits",
        type:'bar',
        data:this.commitActivityData.map(activity => {
          return [  activity.week*1000,  activity.total ];
        })
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
          text: 'Last 52 Weeks'
        }
        ,
        type:"datetime",
       
       
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

    };
  }

  ngOnInit(): void {
  }

}
