import { Component, OnInit, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../_services/data.service';
import { AppGlobals } from '../../app.globals';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { FormControl, FormGroup, Validators, EmailValidator, ValidatorFn, AbstractControl } from '@angular/forms';
declare var $: any;
import 'datatables.net';
// import * as $ from 'jquery'; window['$'] = $; window['jQuery'] = $;


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  animations: [routerTransition()]
})

export class ProfilComponent implements OnInit, AfterViewInit {

  login = '';
  oldmdp = '';
  newmdp = '';
  cnewmdp = '';
  newlog = '';

  badPasse = false;
  incorrectPasse = false;
  erreurSaisie = false;
  successModifPasse = false;

  isLoginPris = false;
  successModifLogin = false;
  
  modifierLogin = false;
  modifierPasse = false;

  _apiURL: string;

  constructor(
      private dataService: DataService,
      private _global: AppGlobals,
  ) {
      this._apiURL = this._global.apiURL;
      const current = this;
  }

  ngOnInit() {
    this.login = localStorage.getItem('login');
  }

  ngAfterViewInit() {
    const current = this;
  }

  booleanLog(){
    if(this.modifierLogin)
      this.modifierLogin = false;
    else  
      this.modifierLogin = true;
  }

  booleanPasse(){
    if(this.modifierPasse)
    this.modifierPasse = false;
  else  
    this.modifierPasse = true;
  }

  modifierLeLogin(){

    var current = this;
    
      this.dataService.checkLogin(this.newlog).then(data => {

        if(data.login)
        {
          current.dataService.changerLogin(current.newlog, localStorage.getItem('id')).then(data => {
            if(data.success){
              current.login = current.newlog;
              localStorage.setItem('login', current.login);
              current.modifierLogin = false;
              current.successModifLogin = true;
              setTimeout(() => current.successModifLogin = false, 2000);
            }
            else
            {
              console.log(data);
            }
          });
        }
        else
        {
          current.isLoginPris = true;
          setTimeout(() => current.isLoginPris = false, 2000);
        }

      },
      error => {
        console.log("Erreur");
      });
  }

  modifierLeMdp(){
    var current = this;
    this.dataService.verifierPasse(localStorage.getItem('id'),this.oldmdp).then(function(data){
      if(data.passe){
        if(current.newmdp == current.cnewmdp){
          current.dataService.modify(localStorage.getItem('id'),current.newmdp).subscribe(data => {
            current.oldmdp = '';
            current.newmdp = '';
            current.cnewmdp = '';
            current.successModifPasse = true
            setTimeout(() => current.successModifPasse = false, 2000);
            setTimeout(() => current.modifierPasse = false, 2000);
          });
        }
        else
        {
          current.erreurSaisie = true
          setTimeout(() => current.erreurSaisie = false, 2000);
        }
      }
      else
      {
        current.badPasse = true
        setTimeout(() => current.badPasse = false, 2000);
      }
    });
  }
}
