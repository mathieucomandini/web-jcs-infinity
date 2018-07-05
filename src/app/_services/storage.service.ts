import { Injectable } from '@angular/core';

@Injectable()
export class StorageService { constructor() {
    window.addEventListener("storage", function(event){
        console.log('storage');
    });
 }

static getItem(itemName: string): any {
    return JSON.parse(localStorage.getItem(itemName));
    // return JSON.parse(localStorage.getItem(itemName));
}
static setItem(itemName: string, value) {
    localStorage.setItem(itemName, JSON.stringify(value));
}
static removeItem(itemName: string) {
    localStorage.removeItem(itemName);
}
}