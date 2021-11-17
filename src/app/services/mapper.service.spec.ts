import { TestBed } from '@angular/core/testing';
import { SeriesOptionsType } from 'highcharts';
import { Activity } from '../models/activity.model';
import { Participation } from '../models/participation.model';

import { MapperService } from './mapper.service';

describe('MapperService', () => {
    let service: MapperService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MapperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should map participation', () => {
        let array: Participation = {
            owner: [1, 2, 3, 4],
            all: [5, 6, 7, 8]
        };
        let mappedArray: SeriesOptionsType[] = [{
            name: "owner",
            type: "line",
            data: array.owner
        }, {

            name: "all",
            type: "line",
            data: array.all
        }];
        expect(service.formatParticipationArray(array)).toEqual(mappedArray);
    });


    it('should map activity', () => {
        let array: Activity[] = [{
            total: 10,
            week: 10
        },
        { total: 5, week: 9 }];

        let mappedArray :number[][]= [[10000,10],[9000,5]];
        expect(service.formatCommitActivityArray(array)).toEqual(mappedArray);
    });
});
