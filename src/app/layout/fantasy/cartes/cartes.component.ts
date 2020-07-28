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
  listeType = "1";
  visionListe = true;
  selectedItem: any;
  listeGenre = 1;
  
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
    
    this.dataService.allCardsType(9, this.ligue, this.listeGenre).then(data => {
      this.cartesList = data;
    });

  }

  selectionChange($event){  
    localStorage.setItem('ligue',this.ligue);

    this.dataService.allCardsType(9, this.ligue, this.listeGenre).then(data => {
      this.cartesList = data;
    });

  }

  selectionListe($event){

    switch (this.listeType)
    {
      case "1" :
          console.log(this.listeGenre)
          this.dataService.allCardsType(9, this.ligue, this.listeGenre).then(data => {
            this.cartesList = data;
          });
          break;
      case "2" :
          this.dataService.allCardsBase(9, this.ligue, this.listeGenre).then(data => {
            this.cartesList = data;
          });
          break;
      case "3" :
          this.dataService.deckJoueur(localStorage.getItem("id"), this.ligue, 9, this.listeGenre).then(data => {
            this.cartesList = data;
          });
          break;
      default:
        console.log("erreur");
    }
  }

  selectionGenre($event){

    console.log(this.listeGenre)

    switch (this.listeType)
    {
      case "1" :
        this.dataService.allCardsType(9, this.ligue, this.listeGenre).then(data => {
          this.cartesList = data;
          console.log(data)
        });
        break;
    case "2" :
        this.dataService.allCardsBase(9, this.ligue, this.listeGenre).then(data => {
          this.cartesList = data;
        });
        break;
    case "3" :
        this.dataService.deckJoueur(localStorage.getItem("id"), this.ligue, 9, this.listeGenre).then(data => {
          this.cartesList = data;
        });
        break;
    default:
      console.log("erreur");

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
