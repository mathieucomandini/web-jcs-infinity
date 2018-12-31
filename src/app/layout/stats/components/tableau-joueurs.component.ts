import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'datatables.net-bs4';

@Component({
    selector: 'app-tableau-joueurs',
    templateUrl: './tableau-joueurs.component.html',
    styleUrls: ['./tableau-joueurs.component.scss'],
    animations: [routerTransition()],
})
export class TableauJoueursComponent implements OnInit {

    @Input() saison;
    listejoueur = [];
    tableaujoueurs = null;
    @Output() dataLoad = new EventEmitter<boolean>();
    onPageJoueur = false;
    onPageTeam = false;
    
    currentPlayer = '';
    dataJoueur = [];
    gamesJoueur = [];
    totalFarm;

    onPick = false;

    constructor(public router: Router, private dataService: DataService) {}

    ngOnInit() {
        this.dataLoad.emit(false);
        this.chargerTableau();
    }

    ngOnChanges(){
        this.dataLoad.emit(false);
        this.tableaujoueurs.clear();
        this.chargerTableau();
    }

    chargerTableau(){

        var current = this;

        this.dataService.listejoueurstats(this.saison).then(data => {
            this.listejoueur = data;

            if(this.tableaujoueurs == null){
            
            $(document).ready(function(){
                current.tableaujoueurs = $('#tablejoueurs').DataTable( {
                  data: current.listejoueur,
                  columns: [
                      { title: "Pseudo","data": "pseudo"},
                      { title: "KDA", "data": "kda"},
                      { title: "DPM", "data": "dpm"},
                      { title: "GPM", "data": "gpm"},
                      { title: "VPM", "data": "vpm"},
                      { title: "D/G", "data": "dg"},
                      { title: "Nombre de games", "data": "nbgame"},
                  ],
                  language: {
                    'url': './assets/dataTables_fr_FR.json',
                    'emptyTable' : "Pas de donnée"
                   },
                   order : [1, 'desc'],      
                   processing : true,
              } );  

              $('#tablejoueurs tbody').on('click', 'tr', function () {
                var data = current.tableaujoueurs.row( this ).data();
                current.pageJoueur(data.pseudo,data);
            } );

            });
        }
        else
        {      
            this.tableaujoueurs.clear();
            this.tableaujoueurs.rows.add(this.listejoueur);
            this.tableaujoueurs.draw();
        }
            this.dataLoad.emit(true);
        });
    }

    pageJoueur(pseudo,data){
        this.currentPlayer = pseudo;
        this.dataJoueur = data;
        this.chargerGameJoueur(pseudo);
        this.onPageJoueur = true;
    }

    chargerGameJoueur(pseudo){
        var current = this;
        this.dataService.listematchjoueur(pseudo, this.saison).then(data => {     
            
            this.totalFarm = 0;
            this.gamesJoueur = [];

           data.forEach(item => {
               var mn = item.mat_duree/60;
               var kda = item.kills+item.assists;
               if(item.deaths > 0){
                   kda = kda/item.deaths;
                   kda = kda.toFixed(2);
               }
               var dpm = (item.degats/mn).toFixed(0);
               var gpm = (item.golds/mn).toFixed(0);
               var vpm = (item.visions/mn).toFixed(2);
               var fpm = (item.farm/mn).toFixed(2);
               var dg = (item.degats/item.golds).toFixed(2);

               var mnD = mn.toFixed(2);
               current.totalFarm += item.farm;

               var json = ({"item" : item, "kda" : kda, "mn" : mnD, "dpm" : dpm, "gpm" : gpm, "vpm" : vpm, "fpm" : fpm, "dg" : dg});

               current.gamesJoueur.push(json);
           });
        });
    }

    retourMain(){
        this.onPageJoueur = false;
        this.onPageTeam = false;
        this.tableaujoueurs = null;
        this.dataLoad.emit(false);
        this.chargerTableau();
    }

    navigation(id){
        this.onPick = true;
    }
}



