import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {

    readonly apiURL: string = 'http://localhost:82/';
    readonly apiProdUrl: string = 'http://localhost:82';
}
