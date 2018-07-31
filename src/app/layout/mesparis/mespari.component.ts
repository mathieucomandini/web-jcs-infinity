import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';


import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
    selector: 'app-mespari',
    templateUrl: './mespari.component.html',
    styleUrls: ['./mespari.component.scss'],
    animations: [routerTransition()]
})
export class MespariComponent implements OnInit {
  
    connexion = false;
    pariChoisi = false;

    credit = 0;
    creditEnJeu = 0;
    gainsPotTot = 0;
    mise = 0;
    gains = 0;
    choixOption = 0;
    nbrefund = 0;

    tablemesParis;
    mesParis = [];
    mesParisEnCours = [];

    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
        if(localStorage.getItem("login")){
            this.connexion = true;
        }

        this.gestionValeurListe();
     
        this.getParis();
    }

    getParis(){
        var current = this;

        this.dataService.getMesParis(localStorage.getItem('id')).then(data => {this.mesParis = data;

            console.log(current.mesParis);

            $(document).ready(function(){
              current.tablemesParis = $('#tableparis').DataTable( {
                data: current.mesParis,
                columns: [
                    { title: "Intitulé","data": "par_question"},
                    { title: "Choix","data": "issue_choisi" },
                    { title: "Mise","data": "mise_pari" },
                    { title: "Cote","data": "cote_pari" },
                    { title: "Date","data": "date_pari" },
                    { title: "Resultat", "data": "par_solution"}
                ],
                language: {
                  'url': './assets/dataTables_fr_FR.json',
                  'emptyTable' : "Pas de paris pour ce compte"
                 },
            } );      
          });
           
          });    
    }

    chargerDonnee(callback){

        var current = this;

        this.dataService.getMesStatsParis(localStorage.getItem("id")).then(data => {   
            localStorage.setItem('statparis', JSON.stringify(data));
            this.credit = data[0].argent_actuel;
            this.nbrefund = data[0].nb_refund;

    
                current.dataService.getMesParisEnCours(localStorage.getItem("id")).then(data => {
                    current.mesParisEnCours = data;

                    callback();
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
    
            });
    
            current.creditEnJeu = miseenjeux;
            current.gainsPotTot = gainstotpot;
        });
    }

  
}
