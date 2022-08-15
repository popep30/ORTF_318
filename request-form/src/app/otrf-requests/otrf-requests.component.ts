import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrtfService } from '../shared/services/ortf/ortf.service';

@Component({
  selector: 'app-otrf-requests',
  templateUrl: './otrf-requests.component.html',
  styleUrls: ['./otrf-requests.component.scss']
})
export class OtrfRequestsComponent implements OnInit {
  clientName: string | null;
  ortfRequests: any;

  constructor(private activatedRoute: ActivatedRoute, private ortfService: OrtfService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.clientName = params.get('clientName');
      if (this.clientName) {
        this.ortfService.getOrtfRequestByClientName(this.clientName).subscribe((res) => {
          this.ortfRequests = res;
          console.log(res);
        });
      }
    });
  }

}
