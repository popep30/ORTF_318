import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
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
          // This is temp, we need to change save-to-db endpoint, to store the fileName and isParsedFile information as well
          res = res.map((r: any) => ({
            ...r,
            fileName: "PRXSTT_Service Tire Truck Center_TEST_20211228_t.xlsx"
          }));
          combineLatest(res.map((r: any) => this.ortfService.getDownloadUrl(r.fileName, r.isParsedFile))).subscribe((signedUrlByResult: any) => {
            console.log('>>> signedUrls', signedUrlByResult)
            this.ortfRequests = res.map((r: any, index: number) => {
              console.log('>>> index', index, signedUrlByResult[index].body.url)
              return {
              ...r,
              implementationDate: r.RequestedDate,
              ORTFRequestStatus: null,
              lastModifiedUser: null,
              lastModifiedDate: r.CreateDateTime,
              signedUrl: signedUrlByResult[index].body.url
            }});
          })
        });
      }
    });
  }
}
