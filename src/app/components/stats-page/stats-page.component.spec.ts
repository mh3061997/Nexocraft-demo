import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { GithubRestClientService } from 'src/app/services/github-rest-client.service';
import { MapperService } from 'src/app/services/mapper.service';
import { ReposPageComponent } from '../repos-page/repos-page.component';
import { SearchPageComponent } from '../search-page/search-page.component';

import { StatsPageComponent } from './stats-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';

describe('StatsPageComponent', () => {
  let component: StatsPageComponent;
  let fixture: ComponentFixture<StatsPageComponent>;

  let githubClientSpy = jasmine.createSpyObj("GithubRestClientService", [
    'getUserRepositories',
    'getRepoTopFiveContributors',
    'getRepoParticipation',
    'getRepoCommitActivity']);

  let mapperSpy = new MapperService();
  let router: Router;
  let location: Location;
  let activatedRoute = jasmine.createSpyObj("ActivatedRouter", ['queryParams']);

  beforeEach(async () => {




    await TestBed.configureTestingModule({
      declarations: [StatsPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{ path: 'search', component: SearchPageComponent },
        { path: 'repos', component: ReposPageComponent }]
      )],
      providers: [{ provie: GithubRestClientService, useValue: githubClientSpy },
      { provide: MapperService, useValue: mapperSpy },
      ]

    })
      .compileComponents();

    githubClientSpy = TestBed.inject(GithubRestClientService);
    mapperSpy = TestBed.inject(MapperService);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to search page if no username param', () => {
    //spy on query params to execute redirection behaviour
    activatedRoute.queryParams = of({ username: "", repo: "2332" });

    //reinit component to make it see new queryparams
    component = TestBed.createComponent(StatsPageComponent).componentInstance;
    fixture.detectChanges();

    fixture.whenStable().then(() => { expect(router.navigate).toHaveBeenCalledWith(['search']); })
  });

  it('should redirect to search page if no repo param', () => {

    //spy on query params to execute redirection behaviour
    activatedRoute.queryParams = of({ username: "mh3061997", repo: "" });

    //reinit component to make it see new queryparams
    component = TestBed.createComponent(StatsPageComponent).componentInstance;
    fixture.detectChanges();

    fixture.whenStable().then(() => { expect(router.navigate).toHaveBeenCalledWith(['search']); })
  });

  it('should go back to previous page', () => {
    component.goBack();
    fixture.whenStable().then(
      () => {
        expect(component.goBack()).toHaveBeenCalled();
      }
    );
  });

  it('should map user repos and create options', () => {
    let participation = {
      "all": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        7,
        6,
        7,
        8,
        8,
        0,
        0
      ],
      "owner": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        7,
        6,
        7,
        8,
        8,
        0,
        0
      ]
    };
    //spy on getRepoParticipation with stubbed participation array
    spyOn(githubClientSpy, "getRepoParticipation").and.returnValue(of(participation));

    //spy on query params to pass if condition
    activatedRoute.queryParams = of({ username: "spring", repo: "spring" });

    //reinit component to make it see new queryparams
    component = TestBed.createComponent(StatsPageComponent).componentInstance;
    fixture.detectChanges();


    expect(component.participationData).toEqual(mapperSpy.formatParticipationArray(participation));
    expect(githubClientSpy.getRepoParticipation).toHaveBeenCalled();
    expect(component.participationChartOptions).toBeTruthy();
  });
  it('should map commit activity and create options', () => {
    let activity = [
      {
        "total": 0,
        "week": 1606003200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1606608000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1607212800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1607817600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1608422400,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1609027200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1609632000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1610236800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1610841600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1611446400,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1612051200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1612656000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1613260800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1613865600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1614470400,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1615075200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1615680000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1616284800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1616889600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1617494400,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1618099200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1618704000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1619308800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1619913600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1620518400,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 3,
        "week": 1621123200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          3
        ]
      },
      {
        "total": 0,
        "week": 1621728000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1622332800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1622937600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1623542400,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1624147200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1624752000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1625356800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1625961600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1626566400,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1627171200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1627776000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1628380800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1628985600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1629590400,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1630195200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1630800000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1631404800,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1632009600,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 3,
        "week": 1632614400,
        "days": [
          0,
          0,
          1,
          0,
          0,
          1,
          1
        ]
      },
      {
        "total": 9,
        "week": 1633219200,
        "days": [
          1,
          3,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        "total": 7,
        "week": 1633824000,
        "days": [
          1,
          1,
          1,
          1,
          1,
          0,
          2
        ]
      },
      {
        "total": 7,
        "week": 1634428800,
        "days": [
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      },
      {
        "total": 10,
        "week": 1635033600,
        "days": [
          2,
          1,
          0,
          4,
          1,
          1,
          1
        ]
      },
      {
        "total": 1,
        "week": 1635638400,
        "days": [
          1,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1636243200,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "total": 0,
        "week": 1636848000,
        "days": [
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      }
    ];

    //spy on getRepoCommitActivity with stubbed activity array
    spyOn(githubClientSpy, "getRepoCommitActivity").and.returnValue(of(activity));

    //spy on query params to pass if condition
    activatedRoute.queryParams = of({ username: "spring", repo: "spring" });

    //reinit component to make it see new queryparams
    component = TestBed.createComponent(StatsPageComponent).componentInstance;
    fixture.detectChanges();


    expect(component.commitActivityData).toEqual(mapperSpy.formatCommitActivityArray(activity));
    expect(githubClientSpy.getRepoCommitActivity).toHaveBeenCalled();
    expect(component.commitActivityChartOptions).toBeTruthy();
  });

  it('should assign contributors', () => {
  
    let contributors = [
      {
        "total": 204,
        "weeks": [
          {
            "w": 1400371200,
            "a": 5,
            "d": 3,
            "c": 3
          },
          {
            "w": 1400976000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1401580800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1402185600,
            "a": 1,
            "d": 1,
            "c": 1
          },
          {
            "w": 1402790400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1403395200,
            "a": 1,
            "d": 0,
            "c": 1
          },
          {
            "w": 1404000000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1404604800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1405209600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1405814400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1406419200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1407024000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1407628800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1408233600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1408838400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1409443200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1410048000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1410652800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1411257600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1411862400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1412467200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1413072000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1413676800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1414281600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1414886400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1415491200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1416096000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1416700800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1417305600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1417910400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1418515200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1419120000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1419724800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1420329600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1420934400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1421539200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1422144000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1422748800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1423353600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1423958400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1424563200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1425168000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1425772800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1426377600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1426982400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1427587200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1428192000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1428796800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1429401600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1430006400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1430611200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1431216000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1431820800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1432425600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1433030400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1433635200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1434240000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1434844800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1435449600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1436054400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1436659200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1437264000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1437868800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1438473600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1439078400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1439683200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1440288000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1440892800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1441497600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1442102400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1442707200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1443312000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1443916800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1444521600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1445126400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1445731200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1446336000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1446940800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1447545600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1448150400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1448755200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1449360000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1449964800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1450569600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1451174400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1451779200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1452384000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1452988800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1453593600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1454198400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1454803200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1455408000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1456012800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1456617600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1457222400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1457827200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1458432000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1459036800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1459641600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1460246400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1460851200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1461456000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1462060800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1462665600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1463270400,
            "a": 4,
            "d": 0,
            "c": 1
          },
          {
            "w": 1463875200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1464480000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1465084800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1465689600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1466294400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1466899200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1467504000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1468108800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1468713600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1469318400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1469923200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1470528000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1471132800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1471737600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1472342400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1472947200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1473552000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1474156800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1474761600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1475366400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1475971200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1476576000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1477180800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1477785600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1478390400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1478995200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1479600000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1480204800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1480809600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1481414400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1482019200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1482624000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1483228800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1483833600,
            "a": 102,
            "d": 0,
            "c": 1
          },
          {
            "w": 1484438400,
            "a": 665,
            "d": 102,
            "c": 4
          },
          {
            "w": 1485043200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1485648000,
            "a": 365,
            "d": 1,
            "c": 1
          },
          {
            "w": 1486252800,
            "a": 516,
            "d": 1,
            "c": 2
          },
          {
            "w": 1486857600,
            "a": 787,
            "d": 0,
            "c": 2
          },
          {
            "w": 1487462400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1488067200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1488672000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1489276800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1489881600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1490486400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1491091200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1491696000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1492300800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1492905600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1493510400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1494115200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1494720000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1495324800,
            "a": 164,
            "d": 10,
            "c": 1
          },
          {
            "w": 1495929600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1496534400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1497139200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1497744000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1498348800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1498953600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1499558400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1500163200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1500768000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1501372800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1501977600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1502582400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1503187200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1503792000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1504396800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1505001600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1505606400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1506211200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1506816000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1507420800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1508025600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1508630400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1509235200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1509840000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1510444800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1511049600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1511654400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1512259200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1512864000,
            "a": 723,
            "d": 12,
            "c": 2
          },
          {
            "w": 1513468800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1514073600,
            "a": 1635,
            "d": 3,
            "c": 1
          },
          {
            "w": 1514678400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1515283200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1515888000,
            "a": 244,
            "d": 0,
            "c": 2
          },
          {
            "w": 1516492800,
            "a": 8349,
            "d": 12022,
            "c": 5
          },
          {
            "w": 1517097600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1517702400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1518307200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1518912000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1519516800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1520121600,
            "a": 125,
            "d": 1,
            "c": 1
          },
          {
            "w": 1520726400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1521331200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1521936000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1522540800,
            "a": 145,
            "d": 1,
            "c": 1
          },
          {
            "w": 1523145600,
            "a": 2,
            "d": 2,
            "c": 1
          },
          {
            "w": 1523750400,
            "a": 181,
            "d": 13,
            "c": 4
          },
          {
            "w": 1524355200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1524960000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1525564800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1526169600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1526774400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1527379200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1527984000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1528588800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1529193600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1529798400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1530403200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1531008000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1531612800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1532217600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1532822400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1533427200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1534032000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1534636800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1535241600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1535846400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1536451200,
            "a": 116,
            "d": 0,
            "c": 1
          },
          {
            "w": 1537056000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1537660800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1538265600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1538870400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1539475200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1540080000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1540684800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1541289600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1541894400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1542499200,
            "a": 37,
            "d": 21,
            "c": 1
          },
          {
            "w": 1543104000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1543708800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1544313600,
            "a": 428,
            "d": 1,
            "c": 2
          },
          {
            "w": 1544918400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1545523200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1546128000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1546732800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1547337600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1547942400,
            "a": 296,
            "d": 0,
            "c": 1
          },
          {
            "w": 1548547200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1549152000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1549756800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1550361600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1550966400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1551571200,
            "a": 1,
            "d": 0,
            "c": 1
          },
          {
            "w": 1552176000,
            "a": 73,
            "d": 2,
            "c": 2
          },
          {
            "w": 1552780800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1553385600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1553990400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1554595200,
            "a": 137,
            "d": 39,
            "c": 2
          },
          {
            "w": 1555200000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1555804800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1556409600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1557014400,
            "a": 116,
            "d": 1,
            "c": 2
          },
          {
            "w": 1557619200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1558224000,
            "a": 221,
            "d": 0,
            "c": 1
          },
          {
            "w": 1558828800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1559433600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1560038400,
            "a": 278,
            "d": 0,
            "c": 1
          },
          {
            "w": 1560643200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1561248000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1561852800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1562457600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1563062400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1563667200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1564272000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1564876800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1565481600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1566086400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1566691200,
            "a": 212,
            "d": 0,
            "c": 1
          },
          {
            "w": 1567296000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1567900800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1568505600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1569110400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1569715200,
            "a": 769,
            "d": 4,
            "c": 6
          },
          {
            "w": 1570320000,
            "a": 916,
            "d": 6,
            "c": 9
          },
          {
            "w": 1570924800,
            "a": 927,
            "d": 68,
            "c": 9
          },
          {
            "w": 1571529600,
            "a": 1070,
            "d": 48,
            "c": 11
          },
          {
            "w": 1572134400,
            "a": 741,
            "d": 5,
            "c": 7
          },
          {
            "w": 1572739200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1573344000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1573948800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1574553600,
            "a": 356,
            "d": 0,
            "c": 1
          },
          {
            "w": 1575158400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1575763200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1576368000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1576972800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1577577600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1578182400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1578787200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1579392000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1579996800,
            "a": 2,
            "d": 12,
            "c": 1
          },
          {
            "w": 1580601600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1581206400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1581811200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1582416000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1583020800,
            "a": 182,
            "d": 0,
            "c": 1
          },
          {
            "w": 1583625600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1584230400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1584835200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1585440000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1586044800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1586649600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1587254400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1587859200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1588464000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1589068800,
            "a": 1061,
            "d": 55,
            "c": 15
          },
          {
            "w": 1589673600,
            "a": 350,
            "d": 4,
            "c": 5
          },
          {
            "w": 1590278400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1590883200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1591488000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1592092800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1592697600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1593302400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1593907200,
            "a": 71,
            "d": 2,
            "c": 2
          },
          {
            "w": 1594512000,
            "a": 475,
            "d": 1,
            "c": 2
          },
          {
            "w": 1595116800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1595721600,
            "a": 1,
            "d": 1,
            "c": 1
          },
          {
            "w": 1596326400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1596931200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1597536000,
            "a": 79,
            "d": 0,
            "c": 1
          },
          {
            "w": 1598140800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1598745600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1599350400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1599955200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1600560000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1601164800,
            "a": 563,
            "d": 33,
            "c": 6
          },
          {
            "w": 1601769600,
            "a": 860,
            "d": 8,
            "c": 9
          },
          {
            "w": 1602374400,
            "a": 841,
            "d": 5,
            "c": 10
          },
          {
            "w": 1602979200,
            "a": 994,
            "d": 20,
            "c": 12
          },
          {
            "w": 1603584000,
            "a": 1132,
            "d": 3,
            "c": 7
          },
          {
            "w": 1604188800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1604793600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1605398400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1606003200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1606608000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1607212800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1607817600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1608422400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1609027200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1609632000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1610236800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1610841600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1611446400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1612051200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1612656000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1613260800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1613865600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1614470400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1615075200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1615680000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1616284800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1616889600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1617494400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1618099200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1618704000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1619308800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1619913600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1620518400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1621123200,
            "a": 93,
            "d": 7,
            "c": 3
          },
          {
            "w": 1621728000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1622332800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1622937600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1623542400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1624147200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1624752000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1625356800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1625961600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1626566400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1627171200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1627776000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1628380800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1628985600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1629590400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1630195200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1630800000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1631404800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1632009600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1632614400,
            "a": 256,
            "d": 2,
            "c": 3
          },
          {
            "w": 1633219200,
            "a": 804,
            "d": 5,
            "c": 9
          },
          {
            "w": 1633824000,
            "a": 1074,
            "d": 3,
            "c": 7
          },
          {
            "w": 1634428800,
            "a": 962,
            "d": 3,
            "c": 7
          },
          {
            "w": 1635033600,
            "a": 1242,
            "d": 354,
            "c": 10
          },
          {
            "w": 1635638400,
            "a": 182,
            "d": 0,
            "c": 1
          },
          {
            "w": 1636243200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1636848000,
            "a": 0,
            "d": 0,
            "c": 0
          }
        ],
        "author": {
          "login": "lynnandtonic",
          "id": 871315,
          "node_id": "MDQ6VXNlcjg3MTMxNQ==",
          "avatar_url": "https://avatars.githubusercontent.com/u/871315?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/lynnandtonic",
          "html_url": "https://github.com/lynnandtonic",
          "followers_url": "https://api.github.com/users/lynnandtonic/followers",
          "following_url": "https://api.github.com/users/lynnandtonic/following{/other_user}",
          "gists_url": "https://api.github.com/users/lynnandtonic/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/lynnandtonic/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/lynnandtonic/subscriptions",
          "organizations_url": "https://api.github.com/users/lynnandtonic/orgs",
          "repos_url": "https://api.github.com/users/lynnandtonic/repos",
          "events_url": "https://api.github.com/users/lynnandtonic/events{/privacy}",
          "received_events_url": "https://api.github.com/users/lynnandtonic/received_events",
          "type": "User",
          "site_admin": false
        }
      },
      {
        "total": 1,
        "weeks": [
          {
            "w": 1400371200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1400976000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1401580800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1402185600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1402790400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1403395200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1404000000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1404604800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1405209600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1405814400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1406419200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1407024000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1407628800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1408233600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1408838400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1409443200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1410048000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1410652800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1411257600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1411862400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1412467200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1413072000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1413676800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1414281600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1414886400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1415491200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1416096000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1416700800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1417305600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1417910400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1418515200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1419120000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1419724800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1420329600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1420934400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1421539200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1422144000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1422748800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1423353600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1423958400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1424563200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1425168000,
            "a": 1,
            "d": 25,
            "c": 1
          },
          {
            "w": 1425772800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1426377600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1426982400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1427587200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1428192000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1428796800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1429401600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1430006400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1430611200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1431216000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1431820800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1432425600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1433030400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1433635200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1434240000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1434844800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1435449600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1436054400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1436659200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1437264000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1437868800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1438473600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1439078400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1439683200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1440288000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1440892800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1441497600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1442102400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1442707200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1443312000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1443916800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1444521600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1445126400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1445731200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1446336000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1446940800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1447545600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1448150400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1448755200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1449360000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1449964800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1450569600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1451174400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1451779200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1452384000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1452988800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1453593600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1454198400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1454803200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1455408000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1456012800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1456617600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1457222400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1457827200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1458432000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1459036800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1459641600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1460246400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1460851200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1461456000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1462060800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1462665600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1463270400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1463875200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1464480000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1465084800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1465689600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1466294400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1466899200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1467504000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1468108800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1468713600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1469318400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1469923200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1470528000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1471132800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1471737600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1472342400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1472947200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1473552000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1474156800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1474761600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1475366400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1475971200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1476576000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1477180800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1477785600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1478390400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1478995200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1479600000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1480204800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1480809600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1481414400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1482019200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1482624000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1483228800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1483833600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1484438400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1485043200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1485648000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1486252800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1486857600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1487462400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1488067200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1488672000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1489276800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1489881600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1490486400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1491091200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1491696000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1492300800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1492905600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1493510400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1494115200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1494720000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1495324800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1495929600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1496534400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1497139200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1497744000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1498348800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1498953600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1499558400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1500163200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1500768000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1501372800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1501977600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1502582400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1503187200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1503792000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1504396800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1505001600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1505606400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1506211200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1506816000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1507420800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1508025600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1508630400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1509235200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1509840000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1510444800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1511049600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1511654400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1512259200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1512864000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1513468800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1514073600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1514678400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1515283200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1515888000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1516492800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1517097600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1517702400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1518307200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1518912000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1519516800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1520121600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1520726400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1521331200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1521936000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1522540800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1523145600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1523750400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1524355200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1524960000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1525564800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1526169600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1526774400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1527379200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1527984000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1528588800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1529193600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1529798400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1530403200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1531008000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1531612800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1532217600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1532822400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1533427200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1534032000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1534636800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1535241600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1535846400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1536451200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1537056000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1537660800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1538265600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1538870400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1539475200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1540080000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1540684800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1541289600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1541894400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1542499200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1543104000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1543708800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1544313600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1544918400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1545523200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1546128000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1546732800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1547337600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1547942400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1548547200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1549152000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1549756800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1550361600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1550966400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1551571200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1552176000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1552780800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1553385600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1553990400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1554595200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1555200000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1555804800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1556409600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1557014400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1557619200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1558224000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1558828800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1559433600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1560038400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1560643200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1561248000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1561852800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1562457600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1563062400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1563667200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1564272000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1564876800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1565481600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1566086400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1566691200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1567296000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1567900800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1568505600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1569110400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1569715200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1570320000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1570924800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1571529600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1572134400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1572739200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1573344000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1573948800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1574553600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1575158400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1575763200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1576368000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1576972800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1577577600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1578182400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1578787200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1579392000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1579996800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1580601600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1581206400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1581811200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1582416000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1583020800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1583625600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1584230400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1584835200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1585440000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1586044800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1586649600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1587254400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1587859200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1588464000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1589068800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1589673600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1590278400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1590883200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1591488000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1592092800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1592697600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1593302400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1593907200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1594512000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1595116800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1595721600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1596326400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1596931200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1597536000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1598140800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1598745600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1599350400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1599955200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1600560000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1601164800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1601769600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1602374400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1602979200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1603584000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1604188800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1604793600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1605398400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1606003200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1606608000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1607212800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1607817600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1608422400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1609027200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1609632000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1610236800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1610841600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1611446400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1612051200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1612656000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1613260800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1613865600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1614470400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1615075200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1615680000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1616284800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1616889600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1617494400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1618099200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1618704000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1619308800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1619913600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1620518400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1621123200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1621728000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1622332800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1622937600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1623542400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1624147200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1624752000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1625356800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1625961600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1626566400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1627171200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1627776000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1628380800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1628985600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1629590400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1630195200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1630800000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1631404800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1632009600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1632614400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1633219200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1633824000,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1634428800,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1635033600,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1635638400,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1636243200,
            "a": 0,
            "d": 0,
            "c": 0
          },
          {
            "w": 1636848000,
            "a": 0,
            "d": 0,
            "c": 0
          }
        ],
        "author": {
          "login": "talgautb",
          "id": 1547797,
          "node_id": "MDQ6VXNlcjE1NDc3OTc=",
          "avatar_url": "https://avatars.githubusercontent.com/u/1547797?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/talgautb",
          "html_url": "https://github.com/talgautb",
          "followers_url": "https://api.github.com/users/talgautb/followers",
          "following_url": "https://api.github.com/users/talgautb/following{/other_user}",
          "gists_url": "https://api.github.com/users/talgautb/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/talgautb/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/talgautb/subscriptions",
          "organizations_url": "https://api.github.com/users/talgautb/orgs",
          "repos_url": "https://api.github.com/users/talgautb/repos",
          "events_url": "https://api.github.com/users/talgautb/events{/privacy}",
          "received_events_url": "https://api.github.com/users/talgautb/received_events",
          "type": "User",
          "site_admin": false
        }
      }
    ];

    //spy on getRepoTopFiveContributors with stubbed contributors array
    spyOn(githubClientSpy, "getRepoTopFiveContributors").and.returnValue(of(contributors));

    //spy on query params to pass if condition
    activatedRoute.queryParams = of({ username: "spring", repo: "spring" });

    //reinit component to make it see new queryparams
    component = TestBed.createComponent(StatsPageComponent).componentInstance;
    fixture.detectChanges();


    expect(component.contributorsData).toEqual(contributors);
    expect(githubClientSpy.getRepoTopFiveContributors).toHaveBeenCalled();
  });
});
