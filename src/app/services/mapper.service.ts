import { Injectable } from '@angular/core';
import { SeriesBarOptions, SeriesOptionsType } from 'highcharts';
import { Activity } from '../models/activity.model';
import { Participation } from '../models/participation.model';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  formatCommitActivityArray(arr: Activity[]): number[][] {
    return arr.map(activity => {
      //multiply by 1000 because we need data in milliseconds and github api returns it in seconds
      return [activity.week * 1000, activity.total];
    })
  }

  formatParticipationArray(participation: Participation): SeriesOptionsType[] {

    let seriesOptionsArr: SeriesOptionsType[] = [];
    let series: SeriesOptionsType = {
      name: "owner",
      type: "line",
      data: participation.owner
    }
    seriesOptionsArr.push(series);
    
    series = {
      name: "all",
      type: "line",
      data: participation.all
    }
    seriesOptionsArr.push(series);

    return seriesOptionsArr;
  }
}
