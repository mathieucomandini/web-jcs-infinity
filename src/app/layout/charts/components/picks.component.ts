import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-pick',
    templateUrl: './picks.component.html',
    styleUrls: ['./picks.component.scss'],
    animations: [routerTransition()]
})
export class PicksComponent implements OnInit {
  
   
    constructor(public router: Router, private dataService: DataService, private route: ActivatedRoute) {

    }

    ngOnInit() {
   
    }
}
