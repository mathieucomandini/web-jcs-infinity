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

    connexion(login: string, passe: string) {
        const json = {"login": login, "passe": passe};
        return this.authHttp.post(this._apiURL + 'user/connexion', json)
            .map(res => res.json())
            .map(data => {
                return data;
            }).catch (this.handleError).toPromise();
    }

    inscription(login: string, passe: string) {
        const json = {"login": login, "passe": passe};
        return this.authHttp.post(this._apiURL + 'user/inscription', json)
            .map(res => res.json())
            .map(data => {
                return data;
            }).catch (this.handleError).toPromise();
    }

    modify(id: string, passe: string){
        const json = {
            "id" : id,
            "passe" : passe
        }
        return this.authHttp.post(this._apiURL + 'user/modify', json);
    }

       //check si le login est deja dans la base
    checkLogin(login: string){
        const json = { "login" : login };
        return this.authHttp.post(this._apiURL + 'user/dedans', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }    

    //changer le login
    changerLogin(login: string, id: string){
        const json = { "login" : login, "id" : id };
        return this.authHttp.post(this._apiURL + 'user/changerlogin', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }


    /**
     * PARIS
     */
    getMesStatsParis(id: string){
        const json = {"id" : id };
        return this.authHttp.post(this._apiURL + 'pari/statparis', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }


    getParisEnCours(){
        return this.authHttp.post(this._apiURL + 'pari/parisencours', null)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getParisNonResolu(){
        return this.authHttp.post(this._apiURL + 'pari/parisnonresolu', null)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }


    getMesParis(id: string){
        const json = {"id" : id };
        return this.authHttp.post(this._apiURL + 'pari/mesparis', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getMesParisEnCours(id: string){
        const json = {"id" : id };
        return this.authHttp.post(this._apiURL + 'pari/mesparisencours', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    parier(iduser, idpari, issue, cote, mise){
        const json = {"iduser":iduser,"idpari":idpari,"issue":issue,"cote":cote,"mise":mise};
        return this.authHttp.post(this._apiURL + 'pari/parier', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    ajoutPari(question, cote1, cote2, choix1, choix2, date){
        const json = {"question":question,"cote1":cote1,"issue1":choix1,"cote2":cote2,"issue2":choix2,"date":date};
        return this.authHttp.post(this._apiURL + 'pari/ajoutpari', json)
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