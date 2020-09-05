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

    dateFantasy: any;
    heureFantasy: any;

    itemPari: any;
    
    choixOption = '';

    choixEquipe = '';
    choixRole = '';

    choixLigue = '';
    choixLigueSession = '';
    semaineSession = '';

    choixRarete = '';
    pseudoJoueur = '';
    saison = '9';

    choixNature = '';
    nomItem = '';
    effetItem = '';

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

    ajoutJoueur()
    {
        //console.log(this.pseudoJoueur);
        //console.log(this.choixEquipe);
        //console.log(this.saison);

        let tempoJoueur = this.pseudoJoueur;
   
        if(this.pseudoJoueur != '' && this.choixEquipe != ''){
        this.dataService.ajoutJoueur(this.pseudoJoueur,this.choixEquipe,this.saison).then(data => {
            //let's go
            if(data.sucess == 'oui'){
                this.pseudoJoueur = '';
                this.choixEquipe = '';  
            }
            else
            {
                alert('Erreur ajout en base joueur');
            }
        });
        }
        else{
            alert('Pas de paramètre');
        }

        //Ajout des cartes pour un joueur 
        for(let i = 1; i < 5; i++)
        {
            this.dataService.addCard(this.saison, this.choixLigue, tempoJoueur, i, '',this.choixRole, 1, i-1, this.choixEquipe).then(data =>
            {
                if(!(data.success))
                {
                    i = 5;
                    alert('Erreur ajout en base cartes');
                }

            });
        }

    }

    ajoutCarteItem()
    {
      
        var prix = parseInt(this.choixRarete) - 1;

        this.dataService.addCard(this.saison, 'all', this.nomItem, this.choixRarete, this.effetItem, null,this.choixNature, prix, 0).then(data =>
        {     
            if(!(data.success))
            {    
                alert('Erreur ajout en base item');
                console.log(data);
            }
        });
        

        this.nomItem = '';
        this.effetItem = '';
        
        alert("Ajout de l'item");

        console.log('fin');
    }

    ajoutSession()
    {
        var datetime = this.dateFantasy.year+':'+this.dateFantasy.month+':'+this.dateFantasy.day+' '+this.heureFantasy.hour+':'+this.heureFantasy.minute+':'+this.heureFantasy.second;

        this.dataService.addSession(this.semaineSession, this.saison, this.choixLigueSession, datetime).then(data => {
            
            if(!(data.success))
            {    
                alert("Erreur ajout en base de la session");
                console.log(data);
            }
            else
            {
                alert("Session ajouté");
            }

        });
    }
}
