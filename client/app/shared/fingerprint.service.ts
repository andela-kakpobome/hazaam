import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FingerPrintService {
  private serverAPI: String = 'http://localhost:37760/api/v1';

  constructor (
    private http: Http
  ) {}

  home(): any {
    return this.http.get(`${this.serverAPI}/`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(
          error.json().error || 'Server error'
        )
      );
  }

  create(formData) {
    return this.http.post(`${this.serverAPI}/fingerprints`, formData)
      .toPromise()
      .then(data => data.json())
      .catch(error => error.json());
  }

  getFingerprint() { console.log("Get Fingerprint Data")}
}
