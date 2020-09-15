import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent implements OnInit {

  constructor(public router: Router, private dataService: DataService) { }

  saison = 9;
  ligue = "JCS";
  vueRoster = false;
  semaine = 1;

  listeSession = [];
  listeTotale = [];
  listeParSession = [];

  ngOnInit() {
  }

}
