import { Component, OnInit } from '@angular/core';
// import { DataHandlerService } from '../data-handler.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'

import { AlertController } from '@ionic/angular';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  //http variables
  dataUrl = "http://localhost:3000/profiles";
  locationsUrl = "assets/locations.json";
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  // })};

  //profile list
  selectedProfile: string;
  profilesList: string [];
  profilesListJson: any;
  profilesListSize: int;
  profileId: int = 0;

  //locations list
  locationsList: string [];
  locationsListSize: int;
  locationId: int = 0;
  selectedLocation: string;

  constructor(private http: HttpClient, private alertController: AlertController, public globalVariables: GlobalVariablesService) {

  }

  comfortSearch(){
    //download profile allergies, likes and dislikes
    var likes = this.selectedProfile.likes;
    var dislikes = this.selectedProfile.dislikes;
    var allergies = this.selectedProfile.allergies;

    //1)create a list from locationsList, that only contains acceptable locations
    var resultListDislikes: string = [];
    var resultListLikes: string = [];
    var resultListAllergies: string = [];
    var resultListFinal: string = [];
    var i: int;
    var j: int;
    var k: int;

    // console.log(dislikes.length, dislikes);

    for(i=0; i<this.locationsListSize ; i++)
    {
      //get locations that aren't in likes
      for(j=0; j<likes.length; j++)
      {
        if(this.locationsList[i].type == likes[j])
        {
            resultListLikes.push(this.locationsList[i]);
        }
      }
    }
    //filter and create final list
      resultListFinal = this.locationsList.filter(function(element){
        return resultListLikes.indexOf(element) != -1;
      });

    //2)randomize an id number from the new location list
    this.selectedLocation = resultListFinal[Math.floor(Math.random() * Math.floor(resultListFinal.length))];

    //3)send info of selected location to search result page
    this.presentAlert();

  }

  adventureSearch(){
    //download profile allergies, likes and dislikes
    var likes = this.selectedProfile.likes;
    var dislikes = this.selectedProfile.dislikes;
    var allergies = this.selectedProfile.allergies;

    //1)create a list from locationsList, that only contains acceptable locations
    var resultListDislikes: string = [];
    var resultListLikes: string = [];
    var resultListAllergies: string = [];
    var resultListFinal: string = [];
    var i: int;
    var j: int;
    var k: int;

    // console.log(dislikes.length, dislikes);

    for(i=0; i<this.locationsListSize ; i++)
    {
      //get locations that aren't in dislikes
      for(j=0; j<dislikes.length; j++)
      {
        if(this.locationsList[i].type == dislikes[j])
        {
          resultListDislikes.push(this.locationsList[i]);
        }
      }

      //get locations that aren't in likes
      for(j=0; j<likes.length; j++)
      {
        if(this.locationsList[i].type == likes[j])
        {
            resultListLikes.push(this.locationsList[i]);
        }
      }
    }

    //filter and create final list
      resultListFinal = this.locationsList.filter(function(element){
        return resultListDislikes.indexOf(element) === -1;
      });
      resultListFinal = resultListFinal.filter(function(element){
        return resultListLikes.indexOf(element) === -1;
      });

    //2)randomize an id number from the new location list
    this.selectedLocation = resultListFinal[Math.floor(Math.random() * Math.floor(resultListFinal.length))];

    // console.log(resultListFinal);
    //3)send info of selected location to search result page
    this.presentAlert();

  }

  ngOnInit() {
    //deep copy profiles.json into string array
    let obsp: Observable<any> = this.http.get(this.dataUrl);
    obsp.subscribe(pdata => {
      this.setProfileData(pdata as string[]);
    });

    //deep copy locations.json into string array
    let obsl: Observable<any> = this.http.get(this.locationsUrl);
    obsl.subscribe(ldata => {
      this.setLocationData(ldata.locations as string []);
    });

  }

  setProfileData(newData: string [])
  {
    this.profilesList = newData;

    //set selected profile id
        // this.profileId = this.globalVariables.getProfileID();

    //set selectedProfile
    this.selectedProfile = this.profilesList[this.profileId];

    //set profilesListSize
    this.profilesListSize = this.profilesList.length;
  }

  setLocationData(newData: string [])
  {
    this.locationsList = newData;

    //set locationsListSize -- this code would produce undefined; hardcoded
    // this.locationsListSize = this.locationsList.length;
    this.locationsListSize = 10;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'EAT!',
      subHeader: '',
      message: 'You should eat at ' + this.selectedLocation.name,
      buttons: ['OK']
    });

    await alert.present();
  }



}
