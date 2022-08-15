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
  displayedColumns = ['ClientName', 'implementationDate', 'ORTFRequestStatus', 'ORTFTypeID', 'ORTFDirectionID', 'JIRATicket', 'lastModifiedUser', 'lastModifiedDate']

  constructor(private activatedRoute: ActivatedRoute, private ortfService: OrtfService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.clientName = params.get('clientName');
      if (this.clientName) {
        this.ortfService.getOrtfRequestByClientName(this.clientName).subscribe((res) => {
          res = res.map((r: any) => ({ ...r, implementationDate: r.RequestedDate, ORTFRequestStatus: null, lastModifiedUser: null, lastModifiedDate: r.CreateDateTime }));
          this.ortfRequests = res;
          console.log(res);
        });
      }
    });
  }
}
