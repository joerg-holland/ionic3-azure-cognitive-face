# Tutorial
Ionic-Azure-Cognitive-Face Template

Last Update: 09. September 2017

## How to create this template?

1. Open the folder where the project should be created and run the command below. 
If you are in folder 'c:\projects\' the folder 'c:\projects\ionic-azure-cognitive-face' will be created with all necessary files of the ionic project.
  ```bash
  $ ionic start ionic-azure-cognitive-face blank
  ```
2. Open the folder, which you created the step before and run the command below.
If everything was installed successfully a web browser will be open and show you the Ionic blank page of the project.
  ```bash
  $ ionic serve
  ```
3. Create the folder '/src/environments':
  ```bash
  /src/environments/
  ```
4. Add the file '/src/environments/environment.ts' with your Azure credentials to the folder '/src/environments':
  ```ts
  export const environment = {
    production: false,
    azure: {
      apiKey: "yourApiKey"
    }
  };
  ```
5. Create the folder '/src/providers/':
  ```bash
  /src/providers/
  ```
6. Create the folder '/src/providers/azure-cognitive-face':
  ```bash
  /src/providers/azure-cognitive-face/
  ```
7. Add the file '/src/providers/azure-cognitive-face/azure-cognitive-face.service.ts':
  ```ts
  import { Injectable } from '@angular/core';
  import { Http, Headers, RequestOptions } from '@angular/http';
  import { environment } from '../../environments/environments-dev';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/do';
  
  @Injectable()
  export class AzureCognitiveFaceService {
  
    private _url: string = 'https://westeurope.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Faces';
  
    constructor(
      private _http: Http
    ) {}
  
    public getPersonAge(imageUrl: string){
  
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azure.apiKey
      });
      const options = new RequestOptions({ headers });
  
      return this._http.post(this._url, { url: imageUrl }, options)
        .map(data => data.json())
        .do(result => console.log(result));
    }
  }
  ```
8. Add the service 'azure-cognitive-face' to the app's module /src/app/app.module.ts':
  ```ts
  import { HttpModule } from '@angular/http';
  imports: [ ... HttpModule ... ]
  ```
9. Add the service 'azure-cognitive-face' to the app's module /src/app/app.module.ts':
  ```ts
  import { AzureCognitiveFaceService } from '../providers/azure-cognitive-face/azure-cognitive-face.service';
  providers: [ ... AzureCognitiveFaceService ... ]
  ```
10. Add the following code to the component '/src/pages/home/home.ts'
  ```ts
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
  ```
11. Add the following code to the page '/src/pages/home/home.html'
  ```html
  <ion-header>
    <ion-navbar>
      <ion-title>
        Ionic Azure Cognitive Face
      </ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content padding>
    <h2>{{title}}</h2>
    <ion-item>
      <ion-label>URL of image</ion-label>
      <ion-input floating type="text" [(ngModel)]="imageUrl"></ion-input>
    </ion-item>
    <button ion-button *ngIf="!setURLStatus" (click)="setImage()">Set Image</button>
    <button ion-button *ngIf="getPersonAgeGenderStatus" (click)="resetImage()">Reset Image</button>
    <ion-item *ngIf="setURLStatus">
      <img [src]="imageUrl" height="300"/>
    </ion-item>
    <button ion-button *ngIf="setURLStatus && !getPersonAgeGenderStatus" (click)="getPersonAgeGender(imageUrl)">Get Person Age & Gender</button>
    <!-- Result -->
    <h2 *ngIf="getPersonAgeGenderStatus">Face(s):</h2>
    <ion-list *ngFor="let face of faces">
      <ion-item>
        <h2>{{face.age}}</h2>
        <p>Age</p>
      </ion-item>
      <ion-item>
        <h2>{{face.gender}}</h2>
        <p>Gender</p>
      </ion-item>
    </ion-list>
    <!-- Details -->
    <p *ngIf="persons">{{persons | json}}</p>
  </ion-content>
  ```
12. Build the project:
  ```bash
  $ npm run build
  ```
