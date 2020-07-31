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
  saison = 9;

  premierTirage = false;
  
  cartesList = [];
  deckList = [];
  urlServer = '../../../../../assets/images/images_joueur/';

  listeRarete = {
    1: 'Normal',
    2: 'Rare',
    3: 'Épique',
    4: 'Légendaire'
  }

  constructor(public router: Router, private dataService: DataService) { }

  ngOnInit() {
    
    this.dataService.allCardsType(this.saison, this.ligue, this.listeGenre).then(data => {
      this.cartesList = data;
    });

    this.dataService.deckJoueur(localStorage.getItem("id"), this.ligue, this.saison, this.listeGenre).then(data => {
      this.deckList = data;

      if(this.deckList.length == 0)
      {
        this.premierTirage = true;
      }

    });

  }

  selectionChange($event){  
    localStorage.setItem('ligue',this.ligue);

    switch (this.listeType)
    {
      case "1" :
        this.dataService.allCardsType(this.saison, this.ligue, this.listeGenre).then(data => {
          this.cartesList = data;  
        });
        break;
    case "2" :
        this.dataService.allCardsBase(this.saison, this.ligue, this.listeGenre).then(data => {
          this.cartesList = data;
        });
        break;
    case "3" :
        this.dataService.deckJoueur(localStorage.getItem("id"), this.ligue, this.saison, this.listeGenre).then(data => {
          this.cartesList = data;
        });
        break;
    default:
      console.log("erreur");

    }

  }

  selectionListe($event){

    switch (this.listeType)
    {
      case "1" :
          console.log(this.listeGenre)
          this.dataService.allCardsType(this.saison, this.ligue, this.listeGenre).then(data => {
            this.cartesList = data;
          });
          break;
      case "2" :
          this.dataService.allCardsBase(this.saison, this.ligue, this.listeGenre).then(data => {
            this.cartesList = data;
          });
          break;
      case "3" :
          this.dataService.deckJoueur(localStorage.getItem("id"), this.ligue, this.saison, this.listeGenre).then(data => {
            this.cartesList = data;
          });
          break;
      default:
        console.log("erreur");
    }
  }

  selectionGenre($event){

    switch (this.listeType)
    {
      case "1" :
        this.dataService.allCardsType(this.saison, this.ligue, this.listeGenre).then(data => {
          this.cartesList = data;  
        });
        break;
    case "2" :
        this.dataService.allCardsBase(this.saison, this.ligue, this.listeGenre).then(data => {
          this.cartesList = data;
        });
        break;
    case "3" :
        this.dataService.deckJoueur(localStorage.getItem("id"), this.ligue, this.saison, this.listeGenre).then(data => {
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

  premiereCartes()
  {
    var listeJoueurs = [];

    this.dataService.allCardsRare(this.saison, this.ligue, 1).then(data => {
      listeJoueurs = data;

    });

    location.replace("/paquet");

  }

}
