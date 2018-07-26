import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()

export class AdminGuard {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    
       var admin = localStorage.getItem('admin');

        var autorisation = false;
        if(admin == '1'){
            autorisation = true;
        }

       if(!autorisation){
            this.router.navigate(['/']);
        } 

        return autorisation;
    }

}