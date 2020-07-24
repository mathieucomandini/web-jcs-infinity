import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartesComponent } from './cartes.component';

const routes: Routes = [
    {
        path: '', component: CartesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartesRoutingModule {
}
