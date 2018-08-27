import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionArticleComponent } from './gestion-article.component';

const routes: Routes = [
    {
        path: '', component: GestionArticleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionArticleRoutingModule {
}
