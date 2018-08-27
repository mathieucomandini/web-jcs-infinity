import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gestion-article',
    templateUrl: './gestion-article.component.html',
    styleUrls: ['./gestion-article.component.scss'],
    animations: [routerTransition()]
})
export class GestionArticleComponent implements OnInit {
  
    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
    
        
    }

}
