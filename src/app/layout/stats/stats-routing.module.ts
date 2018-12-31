import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats.component';
import { TableauJoueursComponent } from './components/tableau-joueurs.component';
import { EquipesComponent } from './components/equipes.component';
import { PresenceComponent } from './components/presence.component';

const routes: Routes = [
    {
        path: '',
        component: StatsComponent,
        children: [
            {
                path: '',
                component: TableauJoueursComponent
            },
            {
                path: 'equipes',
                component: EquipesComponent
            },
            {
                path: 'presence',
                component: PresenceComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatsRoutingModule {}
