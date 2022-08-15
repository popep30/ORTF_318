import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { Router } from "@angular/router";
import { Observable, map, startWith } from "rxjs";
import { OrtfRequest, ORTFClient, ORTFRequestStatus } from "../shared/services/ortf/ortf.model";
import { OrtfService } from "../shared/services/ortf/ortf.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  title = "ORTF-UI";

  selectedClient: number;

  clients: ORTFClient[];

  ortDirection: number = 1;
  ortfRequestStatuses: ORTFRequestStatus[]
  clientName: string = "";

  @ViewChild("fileInput") fileInput: ElementRef;
  fileAttr = "Choose File";
  clientForm!: FormGroup;
  selectedFile: File;
  parsedFile: File;
  existingRequests: OrtfRequest[] = [];
  existingRequestsCopy: OrtfRequest[] = [];

  displayedColumns: string[] = [
    "clientName",
    "name",
    "implementationDate",
    "filename",
    "type",
    "status",
    "lastModUser",
    "lastModDate",
    "open",
  ];
  filteredOptions: Observable<any[]>;

  constructor(private ortfService: OrtfService, private router: Router) { }

  ngOnInit() {
    // client list is from mssql, but you are tring to send data to mysql
    // do you think that it is possible?
    // then what do you want me to do now ?
    // lets try to store the newly entered client to 

    this.ortfService.getClients().
      subscribe(res => {
        this.clients = res;
        //    return res;
      });

    this.ortfService.getOrtfRequest().
      subscribe(res => {
        console.log('ortfRequestStatuses==>>', res);
        this.ortfRequestStatuses = [{
          "id": 1,
          "statusTypeId": 2,
          "statusName": "Open"
        },
        {
          "id": 2,
          "statusTypeId": 2,
          "statusName": "In Progress"
        },
        {
          "id": 3,
          "statusTypeId": 2,
          "statusName": "On Hold"
        },
        {
          "id": 4,
          "statusTypeId": 2,
          "statusName": "Cancelled"
        },
        {
          "id": 5,
          "statusTypeId": 2,
          "statusName": "Completed"
        }];
      });

    this.clientForm = new FormGroup({
      clientName: new FormControl("", [Validators.required]),
      ortfDirection: new FormControl("", [Validators.required]),
      implementationDate: new FormControl("", [Validators.required]),
      ortfType: new FormControl("", [Validators.required]),
      ortfFileType: new FormControl("", [Validators.required]),
      ortfFile: new FormControl("", [Validators.required]),
      jiraTicket: new FormControl("", [Validators.required]),

      //parsedFile: new FormControl("", [Validators.required]),
    });



    if (this.clientForm != null && this.clientForm.get("clientName") != null) {
      this.filteredOptions = this?.clientForm?.get("clientName")?.valueChanges?.pipe(
        startWith(""),
        map((value: ORTFClient) => this._filter(value.name))
      ) || this.filteredOptions;
    }
  }

  // there is no api for submitting form value right?
  addRequest(event: Event) {
    const { ortfFile, ortfFileType, implementationDate, ...newRecord } = this.clientForm.value;
    newRecord.status = '1';
    newRecord.lastModDate = new Date().toISOString().split('T')[0];
    newRecord.implementationDate = implementationDate.toISOString().slice(0, 10);
    newRecord.file = {
      filename: ortfFile.split("\\").slice(-1)[0],
      data: "",
      type: ortfFileType,
    };
    console.log('newRecord==>>', newRecord);
    this.existingRequests = [newRecord, ...this.existingRequests];
    this.existingRequestsCopy = this.existingRequests;

    this.clientForm.reset();

    this.ortfService.getUploadUrl(newRecord.file.filename, false).subscribe(res => {
      console.log(res);
      this.ortfService.upload(res.body.url, this.selectedFile).subscribe(() => {
        //call service to save to DB


        const ortfDirectionID = Number(newRecord.ortfDirection);
        const ortfTypeID = Number(newRecord.ortfType);
        const requestedDate = newRecord.implementationDate;
        console.log("saveToDB TS Home", newRecord);
let new_flag = true;
        this.clients.map(client => {if (client.name == newRecord.clientName){
          new_flag = false;
          //break;
        } })
//        const new_flag = (this.clients.filter(row => {console.log("lging here", row, " newRecord", newRecord); return (row.name === newRecord.clientNam)}).length < 1);
console.log("here is the result", new_flag)
        // let me send new zoom link
        this.ortfService.saveToDB(newRecord.clientName, ortfDirectionID, ortfTypeID, requestedDate, newRecord.jiraTicket, new_flag)
          .subscribe(res => {
            console.log("saveToDB", res);
          });
      });
    });
  }

  handleOrtfStatusFilter = (event: MatRadioChange) => {
    this.existingRequests = this.existingRequestsCopy.filter(item => item.status === event.value);
  }

  handleOrtfDirectionFilter = (event: MatRadioChange) => {
    this.existingRequests = this.existingRequestsCopy.filter(item => item.ortfDirection === event.value);
  }

  navigateToOrtfRequests(clientName: string) {
    let urlClientName = encodeURI(clientName);
    this.router.navigate([`/ortfrequests/${urlClientName}`]);
  }

  uploadFileEvt(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (files && files[0]) {
      this.selectedFile = files[0];
      this.fileAttr = "";
      Array.from(files).forEach((file: File) => {
        this.fileAttr += file.name + " - ";
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = "Choose File";
    }
  }

  uploadFileEvt2(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files: FileList | null = target.files;
    if (files && files[0]) {
      this.parsedFile = files[0];
    } else {
      this.fileAttr = "Choose File";
    }
  }

  onChangeRadio(): void {
    console.log("onChangeRadio", this.ortDirection);
  }

  private _filter(value: string): any[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.clients.filter((client) => {
        if (client.name) { client.name.toLowerCase().includes(filterValue) }
      }
      );
    }
    return [];
  }
}
