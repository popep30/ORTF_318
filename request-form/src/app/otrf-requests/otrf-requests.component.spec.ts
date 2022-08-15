import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrfRequestsComponent } from './otrf-requests.component';

describe('OtrfRequestsComponent', () => {
  let component: OtrfRequestsComponent;
  let fixture: ComponentFixture<OtrfRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtrfRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrfRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
