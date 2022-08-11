import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { Observable, map, startWith } from "rxjs";
import { OrtfRequest, ORTFClient } from "./shared/services/ortf/ortf.model";
import { OrtfService } from "./shared/services/ortf/ortf.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "ORTF-UI";

  selectedClient: number;

  clients: ORTFClient[];

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

  constructor(private ortfService: OrtfService) { }

  ngOnInit() {
    this.ortfService.getClients().
      subscribe(res => {
        this.clients = res;
        //    return res;
      });
    this.clientForm = new FormGroup({
      clientName: new FormControl("", [Validators.required]),
      ortfDirection: new FormControl("", [Validators.required]),
      implementationDate: new FormControl("", [Validators.required]),
      ortfFileType: new FormControl("", [Validators.required]),
      ortfFile: new FormControl("", [Validators.required]),
      //parsedFile: new FormControl("", [Validators.required]),
    });



    if (this.clientForm != null && this.clientForm.get("clientName") != null) {
      this.filteredOptions = this?.clientForm?.get("clientName")?.valueChanges?.pipe(
        startWith(""),
        map((value: ORTFClient) => this._filter(value.name))
      ) || this.filteredOptions;
    }
  }

  addRequest(event: Event) {
    const { ortfFile, ortfFileType, implementationDate, ...newRecord } = this.clientForm.value;
    newRecord.status = 'Incomplete';
    newRecord.implementationDate = implementationDate.toISOString().slice(0, 10);
    newRecord.file = {
      filename: ortfFile.split("\\").slice(-1)[0],
      data: "",
      type: ortfFileType,
    };
    this.existingRequests = [newRecord, ...this.existingRequests];
    this.existingRequestsCopy = this.existingRequests;

    this.clientForm.reset();

    this.ortfService.getUploadUrl(newRecord.file.filename, false).subscribe(res => {
      console.log(res);
      this.ortfService.upload(res.body.url, this.selectedFile).subscribe(()=> {
//call service to save to DB
      });
    });   
  }


  handleOrtfStatusFilter = (event: MatRadioChange) => {
    this.existingRequests = this.existingRequestsCopy.filter(item => item.status === event.value);
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
