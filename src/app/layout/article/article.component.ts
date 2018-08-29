import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    animations: [routerTransition()]
})
export class ArticleComponent implements OnInit {
  
    listeArticle = [];

    articleId;
    onArticle = false;
    currentArticle;

    constructor(public router: Router, private dataService: DataService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.dataService.getArticleActif().then(data => {
            this.listeArticle = data;
            this.articleId = this.route.snapshot.paramMap.get('id');
            if(this.articleId != null){
                this.onArticle = true;
                this.currentArticle = this.listeArticle.find(x => x.art_id == this.articleId);
            }
        });

    }

    retourListeArticle(){
        this.onArticle = false;
    }

    consulter(id){
        this.router.navigate(['/pari/'+id]);
    }

}
