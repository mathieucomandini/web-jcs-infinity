import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pari',
    templateUrl: './pari.component.html',
    styleUrls: ['./pari.component.scss'],
    animations: [routerTransition()]
})
export class PariComponent implements OnInit {
  
    connexion = false;
    pariChoisi = false;

    credit = 0;
    creditEnJeu = 0;
    gainsPotTot = 0;
    mise = 0;
    gains = 0;
    choixOption = 0;

    parisEnCours = [];
    mesParisEnCours = [];
    objetPari;
    cote = 0;

    intitule = '';
    issue1 = '';
    issue2 = '';
    cote1 = 0;
    cote2 = 0;

    choix = '';

    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
        if(localStorage.getItem("login")){
            this.connexion = true;
        }

        this.gestionValeurListe();
    }

    onParier(pari){     
        this.intitule = pari.par_question;
        this.issue1 = pari.par_issue_1;
        this.issue2 = pari.par_issue_2;
        this.cote1 = pari.par_cote_evo_1;
        this.cote2 = pari.par_cote_evo_2;

        console.log(pari.par_date);

        this.objetPari = pari;
        this.pariChoisi = true;
    }

    retourPari(){
        this.pariChoisi = false;
        this.mise = 0;
        this.gains = 0;
        this.choix = '';
        this.objetPari = null;
        this.cote = 0;
    }

    parier(){

        //refaire une vérification de date !!!!!

        if(this.mise > 0 && this.mise <= this.credit && this.choix != '')
        {
            this.credit = this.credit - this.mise;

            //de trop imo
            this.creditEnJeu = this.creditEnJeu + this.mise;
            this.gainsPotTot = this.gainsPotTot + this.gains;

            var date = new Date();
            
            this.dataService.parier(localStorage.getItem("id"),this.objetPari.par_id,this.choix,this.cote,this.mise).then(data => {
                this.gains = 0;
                this.mise = 0;
                this.gestionValeurListe();
                this.pariChoisi = false;
            });

        }
        else
        {
            alert("Ta mise c'est n'importe quoi");
        }
    }

    calculGains($event){

        this.cote = 0;

        if(this.choixOption != 0){

        if(this.choixOption == 1){
            this.cote = this.cote1;
            this.choix = this.issue1;
        }    
        else{
            this.cote = this.cote2;
            this.choix = this.issue2;
        }

        if(this.mise != null && this.mise > 0 && this.mise <= this.credit){
            this.gains = ((this.mise * this.cote) - this.mise);
            this.gains = parseFloat(this.gains.toFixed(2));
        }
        else
        {
            this.gains = 0;
        }
        }
    }

    selectionChange($event){
        this.calculGains(null);
    }


    chargerDonnee(callback){

        var current = this;

        this.dataService.getMesStatsParis(localStorage.getItem("id")).then(data => {   
            localStorage.setItem('statparis', JSON.stringify(data));
            this.credit = data[0].argent_actuel;

            current.dataService.getParisEnCours().then(data => {
                current.parisEnCours = data;

                current.dataService.getMesParisEnCours(localStorage.getItem("id")).then(data => {
                    current.mesParisEnCours = data;

                    callback();
                });

            });

        });      
    }

    gestionValeurListe(){

        var current = this;

        this.chargerDonnee(function(){
            var miseenjeux = 0
            var gainstotpot = 0;
    
            current.mesParisEnCours.forEach(function(monpari){
                
                miseenjeux += monpari.mise_pari;
        
                gainstotpot += ((monpari.mise_pari * monpari.cote_pari) - monpari.mise_pari);
                gainstotpot = parseFloat(gainstotpot.toFixed(2));
    
                current.parisEnCours.forEach(function(paricours,i){
                    if(monpari.id_pari_origine == paricours.par_id){
                        current.parisEnCours.splice(i,1);
                    }
                });
            });
    
            current.creditEnJeu = miseenjeux;
            current.gainsPotTot = gainstotpot;
        });
    }

}
