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

  sessionEnCours = false;
  sessionEnCoursAcad = false;
  idSession = 0;
  idSessionAcad = 0;
  
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

   this.viderCacheRoster(); 
    
   this.dataService.getSession(this.saison, this.ligue).then(data => {
      if(data.session_etat == "En cours")
      {
        if(this.ligue == "JCS")
        {
          this.sessionEnCours = true;
          this.idSession = data.id_session;
        }
        else
        {
          this.sessionEnCoursAcad = true;
          this.idSessionAcad = data.id_session;
        }

        var ligueT = this.ligue;

        this.dataService.rosterJoueur(this.idSession, this.saison, this.ligue, localStorage.getItem("id")).then(data => {
          data.forEach(element => {
            if(ligueT == "JCS")
            {
              localStorage.setItem(element.poste, element.poste);
            }
            else
            {
              localStorage.setItem(element.poste+"A", element.poste);
            }
          });
  
        });
      }
    });

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

    this.visionListe = true;  

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

  selectionGenre($event){

    this.visionListe = true;  

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

  addToRoster()
  {
    if(this.ligue == "JCS" && this.sessionEnCours)
    {
      console.log(this.selectedItem.poste);
      console.log(localStorage.getItem(this.selectedItem.poste));

      if(localStorage.getItem(this.selectedItem.poste) != "none")
      {
        alert("Il y a déjà une carte pour ce poste dans le roster");
      } 
      else
      {
        //fonction d'ajout d'un joueur dans le roster
        this.dataService.addRoster(this.saison, this.ligue, localStorage.getItem("id"), this.selectedItem.id_carte, this.idSession, 0, 0, 0, 0).then(data => {
          
          if(data.success)
          {
            alert("Ajout du joueur dans le roster");
          }
          else
          {
            alert("Erreur dans l'ajout au roster");
          }

        });

        localStorage.setItem(this.selectedItem.poste, this.selectedItem.poste);
      }
    }
    else if(this.ligue == "Acad" && this.sessionEnCoursAcad)
    {
      if(localStorage.getItem(this.selectedItem.poste+"A") != "none")
      {
        alert("Il y a déjà une carte pour ce poste dans le roster");
      } 
      else
      {
        //fonction d'ajout d'un joueur dans le roster
        this.dataService.addRoster(this.saison, this.ligue, localStorage.getItem("id"), this.selectedItem.id_carte, this.idSessionAcad, 0, 0, 0, 0).then(data => {
          
          if(data.success)
          {
            alert("Ajout du joueur dans le roster");
          }
          else
          {
            alert("Erreur dans l'ajout au roster");
          }

        });

        localStorage.setItem(this.selectedItem.poste+"A", this.selectedItem.poste+"A");
      }
    }
    else
    {
      alert("Pas de session en cours");
    }
  }

  viderCacheRoster()
  {
    localStorage.setItem("MID", "none");
    localStorage.setItem("TOP", "none");
    localStorage.setItem("JUNG", "none");
    localStorage.setItem("SUPP", "none");
    localStorage.setItem("ADC", "none");
    localStorage.setItem("TEAM", "none");
    localStorage.setItem("EVENT", "none");

    localStorage.setItem("MIDA", "none");
    localStorage.setItem("TOPA", "none");
    localStorage.setItem("JUNGA", "none");
    localStorage.setItem("SUPPA", "none");
    localStorage.setItem("ADCA", "none");
    localStorage.setItem("TEAMA", "none");
    localStorage.setItem("EVENTA", "none");
  }
}
