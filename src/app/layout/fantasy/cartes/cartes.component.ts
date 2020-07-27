import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartes',
  templateUrl: './cartes.component.html',
  styleUrls: ['./cartes.component.scss']
})
export class CartesComponent implements OnInit {

  ligue = "JCS";
  listeType = 2;
  visionListe = true;
  selectedItem: any;
  
  cartesList = [];
  urlServer = '../../../../../assets/images/images_joueur/';

  listeRarete = {
    1: 'Normal',
    2: 'Rare',
    3: 'Épique',
    4: 'Légendaire'
  }

  constructor(public router: Router, private dataService: DataService) { }

  ngOnInit() {
    
    this.dataService.allCardsPlayer(9, this.ligue).then(data => {
      this.cartesList = data;
    });

  }

  selectionChange($event){  
    localStorage.setItem('ligue',this.ligue);

    this.dataService.allCardsPlayer(9, this.ligue).then(data => {
      this.cartesList = data;
    });

  }

  selectionListe($event){
    if(this.listeType == 1)
    {
      //toutes mes cartes
      this.dataService.allCardsPlayer(9, this.ligue).then(data => {
        this.cartesList = data;
      });
    }
    else
    {
      //mes cartes
      this.dataService.allCardsPlayer(9, this.ligue).then(data => {
        this.cartesList = data;
      });
    }
  }

  gotoDetails(item)
  {
    this.selectedItem = item;
    this.visionListe = false;
  }

  goBack()
  {
    this.visionListe = true;
  }

}
