import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'datatables.net-bs4';
import * as moment from 'moment';

@Component({
    selector: 'app-equipes',
    templateUrl: './equipes.component.html',
    styleUrls: ['./equipes.component.scss'],
    animations: [routerTransition()]
})
export class EquipesComponent implements OnInit {

    @Input() saison;
    listejoueur = [];
    tableaujoueurs = null;
    dataIsload = false;
    onPageJoueur = false;
    onPageTeam = false;
    
    currentPlayer = '';
    dataJoueur = [];
    gamesJoueur = [];
    totalFarm;

    onPick = false;

    constructor(public router: Router, private dataService: DataService) {}

    ngOnInit() {
        this.chargerTableau();
    }

    selectionChange($event){  
        localStorage.setItem('saison',this.saison);

        if(this.onPageJoueur || this.onPageTeam){
            this.onPageJoueur = false;
            this.onPageTeam = false;
            this.tableaujoueurs = null;
        }
        this.dataIsload = false;
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
                      { title: "KDA", "data": {kills : "kills", assists : "assists", deaths: "deaths"}},
                      { title: "DPM", "data": {damage: "damage", tempsdejeu: "tempsdejeu"}},
                      { title: "GPM", "data": {gold: "gold", tempsdejeu: "tempsdejeu"}},
                      { title: "VPM", "data": {vison: "vision", tempsdejeu: "tempsdejeu"}},
                      { title: "D/G", "data": {damge: "damage", gold: "gold"}},
                      { title: "Nombre de games", "data": "nbgame"},
                  ],
                  language: {
                    'url': './assets/dataTables_fr_FR.json',
                    'emptyTable' : "Pas de donnée"
                   },
                   order : [1, 'desc'],
                   columnDefs: [
                      {targets:1, render:function(data){
                          var kda = data.kills + data.assists;
                          if(data.deaths > 0){
                              kda = kda/data.deaths;
                          }
                          return kda.toFixed(2);
                      }},
                      {targets:2, render:function(data){
                        var dpm = data.damage/(data.tempsdejeu/60);                        
                        return dpm.toFixed(0);
                      }},
                      {targets:3, render:function(data){
                        var gpm = data.gold/(data.tempsdejeu/60);                        
                        return gpm.toFixed(0);
                      }},
                      {targets:4, render:function(data){
                        var vpm = data.vision/(data.tempsdejeu/60);                        
                        return vpm.toFixed(2);
                      }},
                      {targets:5, render:function(data){
                        var dg = data.damage/data.gold;                        
                        return dg.toFixed(2);
                      }} 
                   ],
                   processing : true,
              } );  

              $('#tablejoueurs tbody').on('click', 'tr', function () {
                var data = current.tableaujoueurs.row( this ).data();
                console.log(data);
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

            this.dataIsload = true;
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
        this.dataIsload = false;
        this.chargerTableau();
    }

    navigation(id){
        this.onPick = true;
    }
}



