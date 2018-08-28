import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()

export class RedacGuard {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        var autorisation = false;
        if(localStorage.getItem('redac') == '1' || localStorage.getItem('editeur') == '1' || localStorage.getItem('admin') == '1'){
            autorisation = true;
        }

       if(!autorisation){
            this.router.navigate(['/']);
        } 

        return autorisation;
    }

}