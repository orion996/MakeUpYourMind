import { Component, OnInit } from '@angular/core';

//for http client
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

//for  page changes
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  //profile variables
  userName: string;
  likes: any;
  dislikes: any;
  allergies: any;

  //http variables
  dataUrl = "http://localhost:3000/profiles";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })};

  //profile list
  profilesList: any;
  profilesListSize: int;

  constructor(public http: HttpClient, public alertController: AlertController) {
      this.http.get(this.dataUrl).subscribe(data =>{
        //do stuff with data
        this.profilesListSize = data.length;
      });
  }

  ngOnInit() {
  }

  addProfile(){
    //create JSON object from data variables
    let profileData = {
      "userName": this.userName,
      "id": this.profilesListSize+1,
      "likes": this.likes,
      "dislikes": this.dislikes,
      "allergies": this.allergies
    };
    // console.log(profileData);
    this.http.post(this.dataUrl, JSON.stringify(profileData), this.httpOptions)
    .subscribe((response) => {});

    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: '',
      message: 'Profile has been Saved!',
      buttons: ['OK']
    });

    await alert.present();
  }

}
