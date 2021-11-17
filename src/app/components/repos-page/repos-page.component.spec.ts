import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GithubRestClientService } from 'src/app/services/github-rest-client.service';

import { ReposPageComponent } from './repos-page.component';

describe('ReposPageComponent', () => {
    let component: ReposPageComponent;
    let fixture: ComponentFixture<ReposPageComponent>;
    let router: Router;
    let activatedRoute = jasmine.createSpyObj("ActivatedRouter", ['queryParams']);
    let githubClientSpy = jasmine.createSpyObj("GithubRestClientService", [
        'getUserRepositories']);
        
    beforeEach(async () => {


        await TestBed.configureTestingModule({
            declarations: [ReposPageComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [{ provie: GithubRestClientService, useValue: githubClientSpy },]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReposPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate back to search when no username param', () => {
        //spy on query params to execute redirection behaviour
        activatedRoute.queryParams = of({ username: "" });
        //reinit component to make it see new queryparams
        component = TestBed.createComponent(ReposPageComponent).componentInstance;
        fixture.detectChanges();

        fixture.whenStable().then(() => { expect(router.navigate).toHaveBeenCalledWith(['..']); })
    });

    it('should navigate back to search when button pressed', () => {
        
        //spy on query params to execute redirection behaviour
        activatedRoute.queryParams = of({ username: "spring" });
        //reinit component to make it see new queryparams
        component = TestBed.createComponent(ReposPageComponent).componentInstance;
        fixture.detectChanges();

        
        fixture.debugElement.query(By.css('button')).nativeElement.click();
        fixture.whenStable().then(() => { expect(router.navigate).toHaveBeenCalledWith(['search']); })

    });

    it('should get repos if username is provided', () => {
        //spy on query params to execute redirection behaviour
        activatedRoute.queryParams = of({ username: "spring" });
        //reinit component to make it see new queryparams
        component = TestBed.createComponent(ReposPageComponent).componentInstance;
        fixture.detectChanges();

        fixture.whenStable().then(() => { expect(router.navigate).toHaveBeenCalledWith(['stats']); })
    });
});
 