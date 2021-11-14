import { Injectable } from '@angular/core';
import { SeriesBarOptions, SeriesOptionsType } from 'highcharts';
import { Activity } from '../models/activity.model';
import { Participation } from '../models/participation.model';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

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

  // formatCommitActivityArrayData(activityArr: Activity[]){

   
  //   return activityArr.map(activity=>{
  //     return activity.total;
  //   });
  // }
  // formatCommitActivityArrayCategories(activityArr: Activity[]){

   
  //   return activityArr.map(activity=>{
  //     return activity.week;
  //   });
  // }
}
