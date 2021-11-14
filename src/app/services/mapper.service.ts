import { Injectable } from '@angular/core';
import { SeriesOptionsType } from 'highcharts';
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

}
