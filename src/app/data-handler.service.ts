import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private profilesUrl: string = "http://localhost:3000/profiles";
  profilesList: string [];

  constructor(private http: HttpClient) { }

  async getProfileData(): Observable<any>
  {
    return await this.http.get(this.profilesUrl);

    // return await newData.subscribe(
    //     data => {
    //     //do stuff with data
    //     // this.profilesList = data as string [];
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log (err.message);
    //   }
    // );
  }

}
