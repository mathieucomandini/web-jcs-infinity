import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MespariComponent } from './mespari.component';

const routes: Routes = [
    {
        path: '', component: MespariComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MespariRoutingModule {
}
