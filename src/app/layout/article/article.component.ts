import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    animations: [routerTransition()]
})
export class ArticleComponent implements OnInit {
  
    listeArticle = [];

    constructor(public router: Router, private dataService: DataService) {

    }

    ngOnInit() {
        this.dataService.getArticleActif().then(data => {
            this.listeArticle = data;
        });
    }

}
