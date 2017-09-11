import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
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
