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
  peutTirer = true;
  loadData = false;

  listeRarete = {
    1: 'Normal',
    2: 'Rare',
    3: 'Épique',
    4: 'Légendaire'
  }

  ngOnInit() {   
    this.getMoney();
  }

  getRandomNumber()
  {
    let random = Math.floor(Math.random() * 1000);

    return random;
  }

  async getPaquet()
  {
    if(this.peutTirer && !this.loadData)
    {
      this.loadData = true;

      this.visionListe = false;

      await this.contenuPaquet();

      await this.dataService.minusMoney(50, localStorage.getItem("id")).then(data => {
        this.getMoney();
      });

      await this.sleep(2000);

      for(let i = 0; i < 5; i++)
      {
        this.addCardDeck(this.cartesList[i]);
      }

      this.visionListe = true;

      this.loadData = false;
    } 
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

  getMoney()
  {
    this.dataService.getMesStatsParis(localStorage.getItem("id")).then(data => {      
      this.credit = data[0].argent_actuel;

      if(this.credit < 50)
      {
        this.peutTirer = false;
      }

    });
  }

  addCardDeck(carte)
  {
    var current = this;

    var ligue = this.ligue;
    if(carte.nature_carte > 2)
    {
      ligue = "all";
    }

    if(carte.nature_carte != 4 && carte.nature_carte != 3)
    {
      this.dataService.deckCarteUnique(localStorage.getItem("id"), carte.id_carte, ligue, this.saison).then(data => {

        if(data.trouve == true)
        {
          let remboursement = 10;
          if(carte.rarete_carte == 3){
            remboursement = 25;
          }
          else if(carte.rarete_carte == 4)
          {
            remboursement = 50;
          }

          current.dataService.plusMoney(remboursement, localStorage.getItem("id")).then(data => {
            current.getMoney();
          });
        }
        else
        {
          current.dataService.addCardPlayer(localStorage.getItem("id"), carte.id_carte, ligue, current.saison);
        }
  
      });
    }
    else
    {
      this.dataService.addCardPlayer(localStorage.getItem("id"), carte.id_carte, ligue, this.saison);
    }
  }

  //changement ligue
  selectionChange($event){

  }

  randomIntFromInterval(min, max) 
  {  
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
