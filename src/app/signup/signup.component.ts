import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { DataService } from '../_services/data.service';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    login = '';
    mdp = '';
    cmdp = '';

    erreurSaisie = false;
    memeLogin = false;

    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {}

    onSignup(){
        //localStorage.setItem('isLoggedin', 'true');
        const current = this;

        var datelogin = new Date();

        if(this.login != '' && this.mdp != '' && this.cmdp != ''){
            
            if(this.mdp == this.cmdp){

                this.dataService.checkLogin(this.login).then(data => {
                    if(data.login){
                        this.dataService.inscription(current.login, current.mdp, datelogin).then(data => {
                            if(data != null)
                            {
                                localStorage.setItem('login', current.login);
                                localStorage.setItem('id', data[0].uti_id);
                                localStorage.setItem('admin', data[0].uti_admin);
                                localStorage.setItem('saison','2');
                                localStorage.setItem('redac', data[0].uti_redacteur);
                                localStorage.setItem('editeur', data[0].uti_editeur);
                                localStorage.setItem('datelogin', datelogin.toDateString());
                                location.replace('/dashboard');
                            }
                        });
                    }
                    else
                    {
                        current.memeLogin = true;
                        setTimeout(() => current.memeLogin = false, 2000); 
                    }
                }, error => {
                    alert("Problème de connexion au serveur, essayer de recharger la page.")
                });
            }
            else
            {
                current.erreurSaisie = true;
                setTimeout(() => current.erreurSaisie = false, 2000); 
            }
        }
        else
        {
            current.erreurSaisie = true;
            setTimeout(() => current.erreurSaisie = false, 2000); 
        }
    }

    onKeyup(event) {
        if (event.key === 'Enter') {
            this.onSignup();
        }
    }
}
