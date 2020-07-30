import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaquetComponent } from './paquet.component';

const routes: Routes = [
    {
        path: '', component: PaquetComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaquetRoutingModule {
}
