import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-paquet',
  templateUrl: './paquet.component.html',
  styleUrls: ['./paquet.component.scss']
})
export class PaquetComponent implements OnInit {

  constructor(public router: Router, private dataService: DataService) { }

  //carte journaliere
  //premiere cartes
  //paquet = 5 cartes (3 joueurs/team, 2 items (event + item))
  //items pas de rareté (mais rareté unique)
  //joueurs/teams : 82% rare, 15,5% épique, 2,5% légendaire)
  // tirage de 1 à 1000 pour la rareté + random pour tirer la carte de la liste
  //fonction avec rarete pour type 1 + 2 entre paramètre (joueurs + teams)

  saison = 9;
  ligue = "JCS";
  visionListe = false;
  cartesList = [];
  urlServer = '../../../../../assets/images/images_joueur/';
  credit = 0;

  listeRarete = {
    1: 'Normal',
    2: 'Rare',
    3: 'Épique',
    4: 'Légendaire'
  }

  ngOnInit() {
    console.log(localStorage.getItem("id"));

    this.dataService.getMesStatsParis(localStorage.getItem("id")).then(data => {      
        this.credit = data[0].argent_actuel;
    });
  }

  getRandomNumber()
  {
    let random = Math.floor(Math.random() * 1000);

    return random;
  }

  async getPaquet()
  {
    await this.contenuPaquet();
    this.visionListe = true;
  }

  async contenuPaquet()
  {
    this.cartesList = [];
    let listeTempo = [];

    for(let i = 0; i < 3; i++)
    {
      let rarete = this.getRandomRareteJoueur();

      this.dataService.tirageJoueur(this.saison, this.ligue, rarete).then(data => {
        listeTempo = data;

        this.cartesList[i] = listeTempo[this.randomIntFromInterval(0, listeTempo.length)];

      });
    }

    let itemTempo = [];

    for(let i = 3; i < 5; i++)
    {
      this.dataService.tirageItem(this.saison, 'all').then(data => {
        itemTempo = data;

        this.cartesList[i] = itemTempo[this.randomIntFromInterval(0, itemTempo.length)];

      });
    }

    console.log(this.cartesList);
  }

  getRandomRareteJoueur()
  {
    //2 = rare, 3 = epique, 4 = legendaire

    let random = Math.floor(Math.random() * 1000);

    if(random < 26){
      return 4
    }
    else if(random > 25 && random < 181)
    {
      return 3
    }
    else{
      return 2
    }
  }

  getItemOrEvent()
  {
    
  }

  //changement ligue
  selectionChange($event){

  }

  randomIntFromInterval(min, max) 
  {  
    return Math.floor(Math.random() * (max - min + 1) + min);
  }



}
