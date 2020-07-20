import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {

    readonly apiURL: string = 'http://localhost:82/';
    //readonly apiURL: string = 'http://webservice.jcs-infinity.fr:82/';
    //readonly apiURL: string = 'https://webservice.jcs-infinity.fr:82/';
}
