import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrtfDirection, OrtfFileType, OrtfRequest } from './ortf.model';

@Injectable({
  providedIn: 'root'
})
export class OrtfService {

  mockData: OrtfRequest[] = [
    {
      clientName: "Acme Corp",
      ortfDirection: OrtfDirection.Incoming,
      implementationDate: new Date().toISOString().slice(0, 10),
      file: {
        filename: "File_1.dat",
        data: "",
        type: OrtfFileType.Production
      },
      status: "Complete"
    },

    {
      clientName: "ABC Health Plan",
      ortfDirection: OrtfDirection.Incoming,
      implementationDate: new Date().toISOString().slice(0, 10),
      file: {
        filename: "SampleFile.dat",
        data: "",
        type: OrtfFileType.Lag
      },
      status: "In Step 3"
    }
  ]

  constructor(
    private http: HttpClient
  ) { }

  retrieveExistingRequests(): Observable<OrtfRequest[]> {
    return of(this.mockData);
  }

  getUploadUrl(model: any, isParsedFile: boolean): Observable<any> {
    return this.http.post<any>(`https://q7w3dg24tk.execute-api.us-east-1.amazonaws.com/dev/upload`, {fileName:model, isParsedFile});
  }

  getClients(): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/`);
  }

  upload(url:string,file:File): Observable<any>{
    return this.http.put<any>(url,file);
  }

  /*saveToDB(): Observable<any>{
    // call API route to persist to DB
  }  */
}
