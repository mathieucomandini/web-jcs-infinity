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

        if(this.login != '' && this.mdp != '' && this.cmdp != ''){
            
            if(this.mdp == this.cmdp){

                this.dataService.checkLogin(this.login).then(data => {
                    if(data.login){
                        this.dataService.inscription(current.login, current.mdp).then(data => {
                            if(data != null)
                            {
                                localStorage.setItem('login', current.login);
                                localStorage.setItem('id', data[0].uti_id);
                                localStorage.setItem('admin', data[0].uti_admin);
                                location.replace('/dashboard');
                            }
                        });
                    }
                    else
                    {
                        current.memeLogin = true;
                        setTimeout(() => current.memeLogin = false, 2000); 
                    }
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
