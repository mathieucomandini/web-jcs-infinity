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

    codeUser = '084328C53A9DE563B83B23B6F500521FF442AF7CFE60F104574C2C8CCE22CF2A';
    codeAdmin = '35235D5998616ECD5B68F8CCAB8CF42418F1BA9CA9C9927EA27F43965E3E27F1';

    constructor(
        public authHttp: AuthHttp,
        private _global: AppGlobals
    ) {
        this._apiURL = this._global.apiURL;
    }

    connexion(login: string, passe: string, datelogin: Date) {
        const json = {"login": login, "passe": passe, "datelogin": datelogin};
        return this.authHttp.post(this._apiURL + 'user/connexion', json)
            .map(res => res.json())
            .map(data => {
                return data;
            }).catch (this.handleError).toPromise();
    }

    inscription(login: string, passe: string, datelogin: Date) {
        const json = {"login": login, "passe": passe, "datelogin": datelogin};
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

       //verifier le mot de passe par id
    verifierPasse(id: string, passe: string){
        const json = {'id': id, 'passe': passe};
        return this.authHttp.post(this._apiURL + 'user/verifierpasse', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
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

    //ajout d'un joueur pour les stats
    ajoutJoueur(pseudo: string, structure: string, saison: string){
        const json = { "key": this.codeAdmin, "pseudo" : pseudo, "structure" : structure, "saison" : saison };
        return this.authHttp.post(this._apiURL + 'jcs/ajoutjoueur', json)
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
        const json = {"key": this.codeAdmin,"question":question,"cote1":cote1,"issue1":choix1,"cote2":cote2,"issue2":choix2,"date":date};
        return this.authHttp.post(this._apiURL + 'pari/ajoutpari', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    resoudrePari(id, solution){
        const json = {"key": this.codeAdmin,"id" : id, "solution" : solution };
        return this.authHttp.post(this._apiURL + 'pari/resoudrepari', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    supprimerPari(id){
        const json = {"key": this.codeAdmin,"id" : id};
        return this.authHttp.post(this._apiURL + 'pari/supprimerpari', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getListeParieurs(){
        return this.authHttp.post(this._apiURL + 'pari/listeparieur', null)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    renflouerUser(id){
        const json = {"id" : id};
        return this.authHttp.post(this._apiURL + 'pari/renflouer', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    /**
     * STATS
     */
    listejoueurstats(saison){
        const json = {"saison" : saison};
        return this.authHttp.post(this._apiURL + 'stats/listejoueur', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    listematchjoueur(pseudo, saison){
        const json = {"pseudo" : pseudo, "saison" : saison};
        return this.authHttp.post(this._apiURL + 'stats/listematchjoueur', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    listepresence(saison){
        const json = {"saison" : saison};
        return this.authHttp.post(this._apiURL + 'stats/listepresence', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    /**
     * ARTICLE
     */
    ajoutArticle(titre,contenu,auteur,actif){
        const json = {"key": this.codeAdmin,"titre" : titre, "contenu" : contenu, "auteur": auteur, "actif": actif};
        return this.authHttp.post(this._apiURL + 'article/ajoutarticle', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getArticleActif(){
        return this.authHttp.post(this._apiURL + 'article/getarticleactif', null)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getAllArticle(){
        return this.authHttp.post(this._apiURL + 'article/getallarticle', null)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    deleteArticle(id){
        const json = {"key": this.codeAdmin,"id" : id};
        return this.authHttp.post(this._apiURL + 'article/deletearticle', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    activerArticle(id){
        const json = {"key": this.codeAdmin,"id" : id};
        return this.authHttp.post(this._apiURL + 'article/activerarticle', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    modifierArticle(id, titre, contenu){
        const json = {"key": this.codeAdmin,"id" : id, "titre" : titre, "contenu" : contenu};
        return this.authHttp.post(this._apiURL + 'article/modifierarticle', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getAllCom(id){
        const json = {"id" : id};
        return this.authHttp.post(this._apiURL + 'article/getallcom', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    ajoutCom(id,contenu,auteur){
        const json = {"id" : id, "contenu" : contenu, "auteur": auteur};
        return this.authHttp.post(this._apiURL + 'article/ajoutcommentaire', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    deleteCom(id){
        const json = {"key": this.codeAdmin,"id" : id};
        return this.authHttp.post(this._apiURL + 'article/deletecommentaire', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    /**
     * 
     * JCS Fantasy 
     * 
     */ 

    allCards(saison, ligue){
        const json = {"saison": saison,"ligue" : ligue};
        return this.authHttp.post(this._apiURL + 'fantasy/allcards', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    allCardsType(saison, ligue, type){
        const json = {"saison": saison,"ligue" : ligue, "type" : type};
        return this.authHttp.post(this._apiURL + 'fantasy/allcardstype', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    allCardsBase(saison, ligue, type){
        const json = {"saison": saison,"ligue" : ligue, "type" : type};
        return this.authHttp.post(this._apiURL + 'fantasy/allcardsbase', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    allCardsRare(saison, ligue, type){
        const json = {"saison": saison,"ligue" : ligue, "type" : type};
        return this.authHttp.post(this._apiURL + 'fantasy/allcardsrare', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    tirageJoueur(saison, ligue, rarete){
        const json = {"saison": saison,"ligue" : ligue, "rarete" : rarete};
        return this.authHttp.post(this._apiURL + 'fantasy/tiragejoueur', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    tirageItem(saison, ligue){
        const json = {"saison": saison,"ligue" : ligue};
        return this.authHttp.post(this._apiURL + 'fantasy/tirageitem', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    addCard(saison, ligue, nom_carte, rarete_carte, effet_carte, poste, nature_carte, prix, team){
        const json = {"saison": saison,"ligue" : ligue,"nom_carte" : nom_carte,"rarete_carte" : rarete_carte,"effet_carte" : effet_carte,"poste" : poste,"nature_carte" : nature_carte,"prix" : prix, "team" : team};
        return this.authHttp.post(this._apiURL + 'fantasy/addcard', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    deleteCard(saison, ligue, nom_carte){
        const json = {"saison": saison,"ligue" : ligue,"nom_carte" : nom_carte};
        return this.authHttp.post(this._apiURL + 'fantasy/deletecard', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    modifyCard(id, effet_carte, prix, score){
        const json = {"id": id,"effet_carte" : effet_carte,"prix" : prix,"score" : score};
        return this.authHttp.post(this._apiURL + 'fantasy/modifycard', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    cardsForaname(nom_carte, saison, ligue){
        const json = {"nom_carte": nom_carte,"saison" : saison,"ligue" : ligue};
        return this.authHttp.post(this._apiURL + 'fantasy/cardsforaname', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    addRoster(saison, ligue, id_compte, id_carte, id_session, item_1_id, item_2_id, item_3_id, score){
        const json = {"saison": saison,"ligue" : ligue,"id_compte" : id_compte,"id_carte" : id_carte, "id_session" : id_session,"item_1_id" : item_1_id,"item_2_id" : item_2_id,"item_3_id" : item_3_id,"score" : score};
        return this.authHttp.post(this._apiURL + 'fantasy/addroster', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    rosterJoueur(id_session, saison, ligue, compte){
        const json = {"id_session": id_session,"saison" : saison,"ligue" : ligue,"id_compte" : compte};
        return this.authHttp.post(this._apiURL + 'fantasy/rosterjoueur', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    allRosterJoueur(saison, ligue, id_compte){
        const json = {"saison" : saison,"ligue" : ligue,"id_compte" : id_compte};
        return this.authHttp.post(this._apiURL + 'fantasy/allrosterjoueur', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    deleteCardRoster(id_roster){
        const json = {"id_roster": id_roster};
        return this.authHttp.post(this._apiURL + 'fantasy/deletecardroster', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    deleteAllCardRoster(id_carte, id_compte, id_session){
        const json = {"id_carte": id_carte, "id_compte": id_compte, "id_session": id_session};
        return this.authHttp.post(this._apiURL + 'fantasy/deleteallcardroster', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    updateRosterItem(id_roster, item_1, item_2, item_3){
        const json = {"id_roster": id_roster, "item_1": item_1, "item_2": item_2, "item_3": item_3};
        return this.authHttp.post(this._apiURL + 'fantasy/updateroster', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    addSession(semaine, saison, ligue, date_fin){
        const json = {"semaine": semaine,"saison" : saison,"ligue" : ligue, "date_fin" : date_fin};
        return this.authHttp.post(this._apiURL + 'fantasy/addsession', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getSession(saison, ligue){
        const json = {"saison" : saison,"ligue" : ligue};
        return this.authHttp.post(this._apiURL + 'fantasy/getsession', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    addScore(id_compte, id_session, score_valeur){
        const json = {"id_compte": id_compte,"id_session" : id_session,"score_valeur" : score_valeur};
        return this.authHttp.post(this._apiURL + 'fantasy/addscore', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    updateScore(id, score_valeur){
        const json = {"id": id,"score_valeur" : score_valeur};
        return this.authHttp.post(this._apiURL + 'fantasy/updatescore', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getScore(id_compte, id_session){
        const json = {"id_compte": id_compte,"id_session" : id_session};
        return this.authHttp.post(this._apiURL + 'fantasy/getscore', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    getAllScore(id_compte){
        const json = {"id_compte": id_compte};
        return this.authHttp.post(this._apiURL + 'fantasy/getallscore', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    addCardPlayer(id_compte, id_carte, ligue, saison){
        const json = {"id_compte": id_compte,"id_carte" : id_carte,"ligue" : ligue,"saison" : saison};
        return this.authHttp.post(this._apiURL + 'fantasy/addcardplayer', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    deckCarteUnique(id_compte, id_carte, ligue, saison){
        const json = {"id_compte": id_compte,"id_carte" : id_carte,"ligue" : ligue,"saison" : saison};
        return this.authHttp.post(this._apiURL + 'fantasy/deckcarteunique', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    deckJoueur(id_compte, ligue, saison, type){
        const json = {"id_compte": id_compte,"ligue" : ligue,"saison" : saison, "type" : type};
        return this.authHttp.post(this._apiURL + 'fantasy/deckjoueur', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    minusMoney(argent, id){
        const json = {"argent": argent,"id" : id};
        return this.authHttp.post(this._apiURL + 'fantasy/minusmoney', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }

    plusMoney(argent, id){
        const json = {"argent": argent,"id" : id};
        return this.authHttp.post(this._apiURL + 'fantasy/plusmoney', json)
        .map(res => res.json())
        .map(data => {
            return data;
        }).catch (this.handleError).toPromise();
    }


    /*
    * JCS
    */

    getParam(param){
        const json = {"param": param};
        return this.authHttp.post(this._apiURL + 'jcs/getparam', json)
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