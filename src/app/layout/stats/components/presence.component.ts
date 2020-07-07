import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'datatables.net-bs4';

@Component({
    selector: 'app-presence',
    templateUrl: './presence.component.html',
    styleUrls: ['./presence.component.scss'],
    animations: [routerTransition()]
})
export class PresenceComponent implements OnInit {

    @Input() saison;
    listepresenceL1 = [];
    listepresenceAcad = [];
    tableauL1 = null;
    tableauAcad = null;
    @Output() dataLoad = new EventEmitter<boolean>();
   
    constructor(public router: Router, private dataService: DataService) {}

    ngOnInit() {
        this.dataLoad.emit(false);
        this.chargerTableaux();
    }

    ngOnChanges(){
        this.dataLoad.emit(false);
        this.tableauL1.clear();
        this.tableauAcad.clear();
        this.chargerTableaux();
    }

    chargerTableaux(){

        this.dataService.listepresence(this.saison).then(data => {

            var current = this;

            this.listepresenceL1 = data[0].arrayjcs;
            this.listepresenceAcad = data[0].arrayacad;

            if(this.tableauL1 == null){

                $(document).ready(function(){
                    current.tableauL1 = $('#tableaul1').DataTable( {
                      data: current.listepresenceL1,
                      columns: [
                          { title: "Champion","data": "champion"},
                          { title: "Nombre de picks", "data": "nbpick"},
                          { title: "Nombre de bans", "data": "nbban"},
                          { title: "Présence", "data": {nbpick: "nbpick", nbban: "nbban", nbmatch: "nbmatchl1"}},
                          { title: "Winrate", "data": {nbpick: "nbpick", nbvic: "nbvic"}},
                      ],
                      language: {
                        'url': './assets/dataTables_fr_FR.json',
                        'emptyTable' : "Pas de donnée"
                       },
                       order : [3, 'desc'],   
                       columnDefs: [              
                        {targets:3, render:function(data){  
                          var presence = ((data.nbpick+data.nbban)/data.nbmatchl1)*100;                   
                          return presence.toFixed(0).toString() + '%';
                        }},
                        {targets:4, render:function(data){
                          var winrate = (data.nbvic*100)/data.nbpick;                      
                          return winrate.toFixed(0).toString() + '%';
                        }}
                        ],   
                       processing : true,
                       paging: false
                  } );  
                });
            }
            else
            {      
                this.tableauL1.clear();
                this.tableauL1.rows.add(this.listepresenceL1);
                this.tableauL1.draw();
            }

            if(this.tableauAcad == null){

                $(document).ready(function(){
                    current.tableauAcad = $('#tableauacad').DataTable( {
                      data: current.listepresenceAcad,
                      columns: [
                          { title: "Champion","data": "champion"},
                          { title: "Nombre de picks", "data": "nbpick"},
                          { title: "Nombre de bans", "data": "nbban"},
                          { title: "Présence", "data": {nbpick: "nbpick", nbban: "nbban", nbmatch: "nbmatchacad"}},
                          { title: "Winrate", "data": {nbpick: "nbpick", nbvic: "nbvic"}},
                      ],
                      language: {
                        'url': './assets/dataTables_fr_FR.json',
                        'emptyTable' : "Pas de donnée"
                       },
                       order : [3, 'desc'],   
                       columnDefs: [              
                        {targets:3, render:function(data){  
                          var presence = ((data.nbpick+data.nbban)/data.nbmatchacad)*100;                   
                          return presence.toFixed(0).toString() + '%';
                        }},
                        {targets:4, render:function(data){
                          var winrate = (data.nbvic*100)/data.nbpick;                      
                          return winrate.toFixed(0).toString() + '%';
                        }}
                        ],   
                       processing : true,
                       paging: false
                  } );  
                });
            }
            else
            {      
                this.tableauAcad.clear();
                this.tableauAcad.rows.add(this.listepresenceAcad);
                this.tableauAcad.draw();
            }

            this.dataLoad.emit(true);
        }, error => {
            this.dataLoad.emit(true);
        });
    }
         
}



