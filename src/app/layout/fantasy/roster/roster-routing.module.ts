import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RosterComponent } from './roster.component';

const routes: Routes = [
    {
        path: '', component: RosterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RosterRoutingModule {
}
