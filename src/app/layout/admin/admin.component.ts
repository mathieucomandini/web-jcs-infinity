import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    animations: [routerTransition()]
})
export class AdminComponent implements OnInit {
  

    listeParisNonResolu = [];

    question = '';
    cote1 = 0;
    cote2 = 0;
    choix1 = '';
    choix2 = '';

    date: any;
    heure: any;

    itemPari: any;
    
    choixOption = '';

    choixEquipe = '';
    pseudoJoueur = '';
    saison = '3';

    selectionPari = false;

    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
       
        this.majListe();
    }

    ajoutPari(){
        if(this.question != '' && this.cote1 != 0 && this.cote2 != 0 && this.choix1 != '' && this.choix2 != '' && this.date != null && this.heure != null){

            //à gerer
            var datetime = this.date.year+':'+this.date.month+':'+this.date.day+' '+this.heure.hour+':'+this.heure.minute+':'+this.heure.second;
            this.dataService.ajoutPari(this.question, this.cote1, this.cote2, this.choix1, this.choix2, datetime).then(data => {

                this.question = '';
                this.cote1 = 0;
                this.cote2 = 0;
                this.choix1 = '';
                this.choix2 = '';

                this.majListe();
            });
        }
        else{
            alert("Il faut remplir tous les champs");
        }
    }

    resoudre(item){
        this.itemPari = item;
        this.selectionPari = true;
    }

    validerResolution(){
        if(this.choixOption != ''){
            this.dataService.resoudrePari(this.itemPari.par_id, this.choixOption).then(data => {
                this.majListe();
                this.selectionPari = false;
                this.itemPari = null;
                this.choixOption = '';
            })
        }
        else
        {
            alert("Choisir une issue");
        }
    }

    retour(){
        this.selectionPari = false;
        this.itemPari = null;
        this.choixOption = '';
    }

    supprimer(item){
        this.dataService.supprimerPari(item.par_id).then(data => {
            this.majListe();
        }, error => {
            console.log("error");
        });
    }

    majListe(){
        this.dataService.getParisNonResolu().then(data => {
            this.listeParisNonResolu = data;
        });
    }

    ajoutJoueur(){
        //console.log(this.pseudoJoueur);
        //console.log(this.choixEquipe);
        //console.log(this.saison);

        if(this.pseudoJoueur != '' && this.choixEquipe != ''){
        this.dataService.ajoutJoueur(this.pseudoJoueur,this.choixEquipe,this.saison).then(data => {
            //let's go
            if(data.sucess == 'oui'){
                this.pseudoJoueur = '';
                this.choixEquipe = '';
            }
            else
            {
                alert('Erreur ajout en base');
            }
        });
        }
        else{
            alert('Pas de paramètre');
        }
    }  
}
