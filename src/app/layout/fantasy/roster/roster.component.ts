import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel, SelectMultipleControlValueAccessor } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  constructor(public router: Router, private dataService: DataService) { }

  saison = 9;
  ligue = "JCS";

  rosterValide = false;

  session = 0;
  vueDetail = false;
  selectedItem: any;
  roster = [];

  listeItem = [];

  urlServer = '../../../../../assets/images/images_joueur/';

  listeRarete = {
    1: 'Normal',
    2: 'Rare',
    3: 'Épique',
    4: 'Légendaire'
  }

  ngOnInit() {

    this.roster = [];
    this.rosterValide = false;

    var current = this;

    this.viderCacheRoster();

    this.dataService.getSession(this.saison, this.ligue).then(data => {
      if(data.session_etat == "En cours")
      {
        this.session = data.id_session;
      
        this.dataService.rosterJoueur(this.session, this.saison, this.ligue, localStorage.getItem("id")).then(data => {
          current.roster = data;

          current.roster.forEach(element => {
            if(current.ligue == "JCS")
            {
              localStorage.setItem(element.poste, element.poste);
            }
            else
            {
              localStorage.setItem(element.poste+"A", element.poste);
            }
          });

        });
  
        this.dataService.getScore(localStorage.getItem("id"), this.session).then(data => {
          
          if(data.success)
          {
            current.rosterValide = true;
          }
          else
          {
            current.rosterValide = false;
          }
        });
      }
    });

    this.vueDetail = false;
  }

  validerRoster()
  {
    if(this.roster.length > 5)
    {

      if(this.roster.length < 7)
      {
        if(this.ligue == "JCS")
        {
          if(localStorage.getItem("EVENT") == "none")
          {
            this.dataService.addScore(localStorage.getItem("id"), this.session, 0);
             this.rosterValide = true;
          }
          else
          {
            alert("Le roster n'est pas complet");
          } 
        }
        else
        {
          if(localStorage.getItem("EVENTA") == "none")
          {
            this.dataService.addScore(localStorage.getItem("id"), this.session, 0);
            this.rosterValide = true;
          }
          else
          {
            alert("Le roster n'est pas complet");
          } 
        }
      }
      else
      {
        this.dataService.addScore(localStorage.getItem("id"), this.session, 0);
        this.rosterValide = true;
      }  
    }
    else
    {
      alert("Le roster n'est pas complet");
    } 
  }

  clearRoster()
  {
    this.roster.forEach(element => {
      if(this.ligue == "JCS")
      {
        localStorage.setItem(element.poste, "none");
      }
      else
      {
        localStorage.setItem(element.poste+"A", "none");
      }
    });

    this.dataService.deleteAllCardRoster("", localStorage.getItem("id"), this.session);
    
    this.roster = [];
  }

  supprimerUnJoueur(item)
  {
    if(this.ligue == "JCS")
    {
      localStorage.setItem(item.poste, "none");
    }
    else
    {
      localStorage.setItem(item.poste+"A", "none");
    }

    const index = this.roster.indexOf(item);
    if (index > -1) {
      this.roster.splice(index, 1);
    }

    this.dataService.deleteCardRoster(item.id_roster).then(data => {
      this.dataService.rosterJoueur(this.session, this.saison, this.ligue, localStorage.getItem("id")).then(data => {
        this.roster = data;   
      });
    });

  }

  gotoDetails(item)
  {
    this.dataService.deckJoueur(localStorage.getItem("id"), this.ligue, this.saison, 3).then(data => {
      this.listeItem = data;

      this.vueDetail = true;
      this.selectedItem = item;
    });

  }

  goBack()
  {
    this.dataService.rosterJoueur(this.session, this.saison, this.ligue, localStorage.getItem("id")).then(data => {
      this.roster = data;   
      this.vueDetail = false;
    });
  }

  addItem()
  {
    var ajoutPossible = true;

    if(this.selectedItem.item_1_id != 0)
    {
      if(this.selectedItem.item_1_id == this.selectedItem.item_2_id || this.selectedItem.item_1_id == this.selectedItem.item_3_id)
      {
        ajoutPossible = false;
      }
    }

    if(this.selectedItem.item_2_id != 0)
    {
      if(this.selectedItem.item_2_id == this.selectedItem.item_1_id || this.selectedItem.item_2_id == this.selectedItem.item_3_id)
      {
        ajoutPossible = false;
      }
    }

    if(this.selectedItem.item_3_id != 0)
    {
      if(this.selectedItem.item_3_id == this.selectedItem.item_1_id || this.selectedItem.item_3_id == this.selectedItem.item_2_id)
      {
        ajoutPossible = false;
      }
    }

    var mi1 = false;
    var mi2 = false;
    var mi3 = false;

    var nb1p = 0;
    var nb2p = 0;
    var nb3p = 0;

    if(this.selectedItem.item_1_id != 0)
    {
      mi1 = true;
      nb1p = this.listeItem.reduce(function (n, item) { return n + (item.id_carte == this.selectedItem.item_1_id);}, 0);
    }

    if(this.selectedItem.item_2_id != 0)
    {
      mi2 = true;
      nb2p = this.listeItem.reduce(function (n, item) { return n + (item.id_carte == this.selectedItem.item_2_id);}, 0);
    }

    if(this.selectedItem.item_3_id != 0)
    {
      mi3 = true;
      nb3p = this.listeItem.reduce(function (n, item) { return n + (item.id_carte == this.selectedItem.item_3_id);}, 0);
    }

    this.roster.forEach(element => {  
      
      if(element.id_roster != this.selectedItem.id_roster)
      {
        if(mi1)
        {
          if(element.item_1_id == this.selectedItem.item_1_id || element.item_2_id == this.selectedItem.item_1_id || element.item_3_id == this.selectedItem.item_1_id)
          {
            nb1p = nb1p - 1;
          }
        }

        if(mi2)
        {
          if(element.item_1_id == this.selectedItem.item_2_id || element.item_2_id == this.selectedItem.item_2_id || element.item_3_id == this.selectedItem.item_2_id)
          {
            nb2p = nb2p - 1;
          }
        }

        if(mi3)
        {
          if(element.item_1_id == this.selectedItem.item_3_id || element.item_2_id == this.selectedItem.item_3_id || element.item_3_id == this.selectedItem.item_3_id)
          {
            nb3p = nb3p - 1;
          }
        }
      }

    });

    if(mi1)
    {
      if(nb1p < 1)
      {
        ajoutPossible = false;
      }
    }

    if(mi2)
    {
      if(nb2p < 1)
      {
        ajoutPossible = false;
      }
    }

    if(mi3)
    {
      if(nb3p < 1)
      {
        ajoutPossible = false;
      }
    }

    if(ajoutPossible)
    {
      if(this.selectedItem.item_3_id != 0 || this.selectedItem.item_2_id != 0 || this.selectedItem.item_1_id != 0)
      {
        this.dataService.updateRosterItem(this.selectedItem.id_roster, this.selectedItem.item_1_id, this.selectedItem.item_2_id, this.selectedItem.item_3_id).then(data => {    
          alert("Items mis à jour");
        });
      }
    }
    else
    {
      alert("Un item ne peut être mis qu'une fois sur un joueur sauf si la carte est possédé en plusieurs exemplaires");
    }
  }

   //changement ligue
  selectionChange($event){
    this.ngOnInit();
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
