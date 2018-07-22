import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PariComponent } from './pari.component';

const routes: Routes = [
    {
        path: '', component: PariComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PariRoutingModule {
}
