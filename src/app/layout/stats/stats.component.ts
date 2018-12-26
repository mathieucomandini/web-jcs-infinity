import { Component, OnInit, Injectable } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'datatables.net-bs4';
import * as moment from 'moment';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss'],
    animations: [routerTransition()]
})
export class StatsComponent implements OnInit {

    saison = localStorage.getItem('saison');
    dataIsload = false;
    route = 1;
 
    constructor(public router: Router, private dataService: DataService) {}

    ngOnInit() {
        
    }

    selectionChange($event){  
        localStorage.setItem('saison',this.saison);
    }

    chargerData(){

        this.dataIsload = true;
    }

    direction(numero){
        this.route = numero;
    }

    dataLoad(res: boolean){
        this.dataIsload = res;
    }

}





