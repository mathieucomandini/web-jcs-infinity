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
    recherche = '';

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

    findTable(inp,t){
        var input, filter, table, tr, td, i;
        input = document.getElementById(inp);
        filter = input.value.toUpperCase();
        table = document.getElementById(t);
        tr = table.getElementsByTagName("tr");
    
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

}
