import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UserGuard } from '../_guard/userGuard';
import { AdminGuard } from '../_guard/adminGuard';
import { DashboardModule } from './dashboard/dashboard.module';
import { MespariModule } from './mesparis/mespari.module';
import { AdminModule } from './admin/admin.module';
import { ProfilModule } from './profil/profil.module';
import { PariClassementModule } from './pari-classement/pari-classement.module';
import { ArticleModule } from './article/article.module';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'HOME', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: () => DashboardModule },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            /*{ path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },*/
            { path: 'pari', loadChildren: './pari/pari.module#PariModule' },
            { path: 'mesparis', loadChildren: () => MespariModule, canActivate: [UserGuard] },
            { path: 'admin', loadChildren: () => AdminModule, canActivate: [AdminGuard]},
            { path: 'profil', loadChildren: () => ProfilModule, canActivate: [UserGuard]},
            { path: 'pari-classement', loadChildren: () => PariClassementModule},
            { path: 'article', loadChildren: () => ArticleModule}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
