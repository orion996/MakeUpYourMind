import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  public selectedProfileID: int;

  constructor() { }

  selectProfileID(id: int)
  {
    this.selectedProfileID = id;
  }

  getProfileID()
  {
    return this.selectedProfileID;
  }
}
