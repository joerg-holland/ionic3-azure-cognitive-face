import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AzureCognitiveFaceService } from '../../providers/azure-cognitive-face/azure-cognitive-face.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public title = 'Age Recognition';
  public imageUrl: string;
  public persons: string;
  public setURLStatus: boolean = false;
  public getPersonAgeGenderStatus: boolean = false;

  public faces: any;

  constructor(
    private _azureCognitiveFaceService: AzureCognitiveFaceService,
    public navCtrl: NavController
  ) {
    this.imageUrl = '';
  }

  public getPersonAgeGender(imageUrl:string): any {
    this._azureCognitiveFaceService.getPersonAge(imageUrl).subscribe(
      (data: any) =>{
        console.log(data);
        this.faces = data.faces;
        this.getPersonAgeGenderStatus = true;
        this.persons = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public setImage() {
    if(this.imageUrl !== ''){
      this.setURLStatus = true;
    }
  }

  public resetImage() {
    this.faces = null;
    this.persons = '';
    this.setURLStatus = false;
    this.getPersonAgeGenderStatus = false;
  }
}
