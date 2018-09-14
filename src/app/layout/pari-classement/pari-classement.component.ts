import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'datatables.net-bs4';
import * as moment from 'moment';

@Component({
    selector: 'app-pari-classement',
    templateUrl: './pari-classement.component.html',
    styleUrls: ['./pari-classement.component.scss'],
    animations: [routerTransition()]
})
export class PariClassementComponent implements OnInit {
  
    parieur = [];
    tableClassement;
    recherche = '';
  
    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
        this.getListe();
    }

  
    getListe(){

        var current = this;

        this.dataService.getListeParieurs().then(data => {
            this.parieur = data;

            /**$(document).ready(function(){
                current.tableClassement = $('#tableparieur').DataTable( {
                  data: current.parieur,
                  columns: [
                      { title: "Pseudo","data": "uti_login"},
                      { title: "Nombre de paris","data": "nb_pari" },
                      { title: "Réussis","data": "nb_win" },
                      { title: "Échecs","data": "nb_lose" },
                      { title: "Renflouement","data": "nb_refund"},
                      { title: "JC$", "data": "argent_actuel"},
                      { title: "JC$", "data": "argent_refund"},
                  ],
                  language: {
                    'url': './assets/dataTables_fr_FR.json',
                    'emptyTable' : "Pas de données"
                   },
                   order : []                 
              } );      
            });*/
        });
    }    

    findTable(inp,t){
        var input, filter, table, tr, td, i;
        input = document.getElementById(inp);
        filter = input.value.toUpperCase();
        table = document.getElementById(t);
        tr = table.getElementsByTagName("tr");
    
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

