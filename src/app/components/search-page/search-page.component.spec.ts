import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
    let router:Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPageComponent ],
      imports:[RouterTestingModule,FormsModule],
    })
    .compileComponents();

    router= TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate correctly',()=>{
    component.navigateReposPage("spring");
    fixture.whenStable().then(() => { expect(router.navigate).toHaveBeenCalledWith(['search']); })

  });
});
