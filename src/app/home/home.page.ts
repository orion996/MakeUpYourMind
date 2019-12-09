import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private dataUrl:string = 'http://localhost:3000/profiles';
  profiles$: Observable<any>;
  selectedProfile: int = 1;

  constructor(private http: HttpClient, public alertController: AlertController, public globalVariables: GlobalVariablesService) {

  }

  ngOnInit() {
  }

  getData(): Observable<any> {
        return this.http.get(this.dataUrl);
  }

  setProfile()
  {
    this.globalVariables.selectProfileID(this.selectedProfile);
  }
}
