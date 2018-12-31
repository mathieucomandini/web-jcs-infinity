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
    @Output() dataLoad = new EventEmitter<boolean>();
   
    constructor(public router: Router, private dataService: DataService) {}

    ngOnInit() {
        this.dataLoad.emit(false);
        this.chargerTableaux();
    }

    ngOnChanges(){
        this.dataLoad.emit(false);
        this.chargerTableaux();
    }

    chargerTableaux(){
        this.dataLoad.emit(true);

        this.dataService.listepresence(this.saison).then(data => {
          console.log(data);
        });
    }
         
}



