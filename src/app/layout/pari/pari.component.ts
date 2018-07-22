import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-pari',
    templateUrl: './pari.component.html',
    styleUrls: ['./pari.component.scss'],
    animations: [routerTransition()]
})
export class PariComponent implements OnInit {
  
    connexion = false;
    pariChoisi = false;

    credit = 200;
    creditEnJeu = 0;
    gainsPotTot = 0;
    mise = 0;
    gains = 0;
    choixOption = 0;

    constructor() {

    }

    ngOnInit() {
        if(localStorage.getItem("login")){
            this.connexion = true;
        }
    }

    onParier(){     
        this.pariChoisi = true;
    }

    retourPari(){
        this.pariChoisi = false;
    }

    parier(){

        if(this.mise > 0 && this.mise <= this.credit)
        {
            this.credit = this.credit - this.mise;
            this.creditEnJeu = this.creditEnJeu + this.mise;
            this.mise = 0;
            this.pariChoisi = false;
            this.gainsPotTot = this.gainsPotTot + this.gains;
            this.gains = 0;
        }
    }

    calculGains($event){
        if(this.choixOption != 0){
        if(this.mise != null && this.mise > 0 && this.mise <= this.credit){
            this.gains = ((this.mise * this.choixOption) - this.mise);
            this.gains = this.gains.toFixed(2);
        }
        else
        {
            this.gains = 0;
        }
        }
    }

    selectionChange($event){
        this.calculGains(null);
    }

  
}
