import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gestion-article',
    templateUrl: './gestion-article.component.html',
    styleUrls: ['./gestion-article.component.scss'],
    animations: [routerTransition()]
})
export class GestionArticleComponent implements OnInit {
  
    htmlContent = '';
    titreArticle = '';
    adminArticle = false;
    modification = false;

    articleEnModif = null;

    listeArticle = [];

    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
        if(localStorage.getItem('admin') == '1'){
            this.adminArticle = true;
        }

        this.getListeArticle();
    }

    ajoutArticle(){

        var current = this;

        if(this.htmlContent != '' && this.titreArticle != ''){
            var actif = 0;

            if(localStorage.getItem('admin') == '1' ||localStorage.getItem('editeur') == '1'){
                actif = 1;
            }

            var auteur = localStorage.getItem('login');
            var titre = this.titreArticle;
            var contenu = this.htmlContent;

            this.dataService.ajoutArticle(titre,contenu,auteur,actif).then( data => {
                this.titreArticle = '';
                this.htmlContent = '';
                this.getListeArticle();
                alert("article ajouté"); 
            });
        }
        else
        {
            alert("Vous devez remplir tous les champs !");
        }
    }

    getListeArticle(){
        this.dataService.getAllArticle().then(data => {
            this.listeArticle = data;
        });
    }

    voirArticle(item){
        this.titreArticle = item.art_titre;
        this.htmlContent = item.art_contenu;
        this.articleEnModif = item;
        this.modification = true;   
    }

    deleteArticle(id){
        if(confirm("Supprimer l'article ?")){
            this.dataService.deleteArticle(id).then(data => {
                this.getListeArticle();
            });
        }
    }

    activerArticle(id){
        this.dataService.activerArticle(id).then(data => {
            this.getListeArticle();
        });
    }

    clearArticle(){
        if(confirm("Effacer le contenu de l'éditeur ?")){
            this.titreArticle = '';
            this.htmlContent = '';
            this.modification = false;
        }
    }

    modifierArticle(){
        if(confirm("Modifier l'article ?")){
            this.dataService.modifierArticle(this.articleEnModif.art_id,this.titreArticle,this.htmlContent).then(data => {
                this.articleEnModif = null;
                this.modification = false;
                this.titreArticle = '';
                this.htmlContent = '';
                this.getListeArticle();
            });
        }
    }

}
