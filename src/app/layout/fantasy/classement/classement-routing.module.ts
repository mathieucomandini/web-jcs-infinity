import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassementComponent } from './classement.component';

const routes: Routes = [
    {
        path: '', component: ClassementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassementRoutingModule {
}
