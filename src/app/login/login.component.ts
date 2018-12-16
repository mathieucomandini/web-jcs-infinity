import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { DataService } from '../_services/data.service';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    
    login = '';
    mdp = '';
    nonAutorise = false;
    erreurSaisie = false;

    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {}

    onLoggedin() {
        //localStorage.setItem('isLoggedin', 'true');

        const current = this;

        var datelogin = new Date();
    
        if (this.login !== '' && this.mdp !== ''){
            this.dataService.connexion(this.login, this.mdp, datelogin).then(data => {         
                 
                if(data.uti_login != null){

                    localStorage.setItem('login', data.uti_login);
                    localStorage.setItem('id', data.uti_id);
                    localStorage.setItem('admin', data.uti_admin);
                    localStorage.setItem('saison','3');
                    localStorage.setItem('redac', data.uti_redacteur);
                    localStorage.setItem('editeur', data.uti_editeur);
                    localStorage.setItem('datelogin', datelogin.toDateString());

                    current.dataService.getMesStatsParis(localStorage.getItem('id')).then(data => {
                        localStorage.setItem('statparis', JSON.stringify(data));
                        location.replace('/dashboard');
                    });                
                } else {
                    current.nonAutorise = true;
                    setTimeout(() => current.nonAutorise = false, 2000);    
                }      
            }, error => {
                console.log(error);
                current.nonAutorise = true;
                setTimeout(() => current.nonAutorise = false, 2000);               
             });
        }
        else {
            current.erreurSaisie = true;
            setTimeout(() => current.erreurSaisie = false, 2000); 
        }
    }

    onKeyup(event) {
        if (event.key === 'Enter') {
            this.onLoggedin();
        }
    }
}
