import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private dataUrl: string = "http://localhost:3000/profiles";
  profiles$: Observable;
  selectedProfile: any;

  constructor(private http: HttpClient) {
    this.profiles$ = this.getData();
    this.profiles$.subscribe((res) =>{
      this.setSelectedProfile(res[0]);
      // this.selectedProfile = res[0];
      console.log(this.selectedProfile);
    });
  }

  getData(): Observable {
      return this.http.get(this.dataUrl);
  }

  setSelectedProfile(value)
  {
    this.selectedProfile = value;
  }

  ngOnInit() {
  }

}
