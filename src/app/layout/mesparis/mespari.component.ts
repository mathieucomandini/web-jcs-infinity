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

    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
        if(localStorage.getItem("login")){
            this.connexion = true;
        }

        this.dataService.getMesStatsParis(localStorage.getItem("id")).then(data => {   
            localStorage.setItem('statparis', JSON.stringify(data));
            this.credit = data[0].argent_actuel;
            this.nbrefund = data[0].nbrefund;
        })
     
        this.getParis();
    }

    getParis(){
        var current = this;

        //this.dataService.getMesParis(localStorage.getItem('id')).then(data => {this.mesParis = data;

            $(document).ready(function(){
              current.tablemesParis = $('#tableparis').DataTable( {
                data: current.mesParis,
                columns: [
                    { title: "Intitulé","data": "par_question"},
                    { title: "Choix","Cote": "cote_pari" },
                    { title: "Mise","data": "mise_pari" },
                    { title: "Gain","data": "gain" },
                    { title: "Resultat", "data": "par_solution"}
                ],
                language: {
                  'url': './assets/dataTables_fr_FR.json',
                  'emptyTable' : "Pas de paris pour ce compte"
                 },
            } );      
          });
           
          //});    
    }

    onParier(){     
        this.pariChoisi = true;
    }

    retourPari(){
        this.pariChoisi = false;
    }

    parier(){

        if(this.mise > 0 && this.mise <= this.credit)
        {
            this.credit = this.credit - this.mise;
            this.creditEnJeu = this.creditEnJeu + this.mise;
            this.mise = 0;
            this.pariChoisi = false;
            this.gainsPotTot = this.gainsPotTot + this.gains;
            this.gains = 0;
        }
    }

    calculGains($event){
     
    }

    selectionChange($event){
        this.calculGains(null);
    }

  
}
