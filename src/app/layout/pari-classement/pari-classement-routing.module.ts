import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PariClassementComponent } from './pari-classement.component';

const routes: Routes = [
    {
        path: '', component: PariClassementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PariClassementRoutingModule {
}
