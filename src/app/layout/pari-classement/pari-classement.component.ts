import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pari-classement',
    templateUrl: './pari-classement.component.html',
    styleUrls: ['./pari-classement.component.scss'],
    animations: [routerTransition()]
})
export class PariClassementComponent implements OnInit {
  
    parieur = [];
  
    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
        this.getListe();
    }

  
    getListe(){
        this.dataService.getListeParieurs().then(data => {
            this.parieur = data;
        });
    }

    
}
