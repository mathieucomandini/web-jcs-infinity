import { Injectable } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { AppGlobals } from '../app.globals';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var $: any;

@Injectable()
export class DataService {

    private _apiURL: string;

    constructor(
        public authHttp: AuthHttp,
        private _global: AppGlobals
    ) {
        this._apiURL = this._global.apiURL;
    }

    connexion(mail: string, passe: string, mutuelle: string) {
        const json = {'mail': mail, 'passe': passe, 'mutuelle': mutuelle};
        return this.authHttp.post(this._apiURL + 'user/connexion', json)
            .map(res => res.json())
            .map(data => {
                return data;
            }).catch (this.handleError).toPromise();
    }

    handleError(error) {
        // console.log(error.json());
       //  $('#mySmallModalLabel').modal('toggle');
       return Observable.throw(error.json().error || 'Erreur d\'accès au service. Veuillez rééssayer.');
    }

}