import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { TableauJoueursComponent } from './components/tableau-joueurs.component';
import { EquipesComponent } from './components/equipes.component';
import { PresenceComponent } from './components/presence.component'

import { PageHeaderModule } from '../../shared';

import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule, Http, RequestOptions  } from '@angular/http';

// HTTP
import { AuthHttp, AuthConfig, provideAuth} from 'angular2-jwt';

import { DataService } from '../../_services/data.service';

import { AppGlobals } from '../../app.globals';

export function authHttpFactory(http) {
    return new AuthHttp(new AuthConfig({
      headerPrefix: 'bearer',
      noJwtError: true,
      globalHeaders: [{'Accept': 'application/json'}],
      // tokenGetter: (() => StorageService.getToken()),
    }), http);
}


@NgModule({
    imports: [CommonModule, Ng2Charts, StatsRoutingModule, PageHeaderModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        FormsModule,
        HttpModule, 
        HttpClientModule
    ],
    declarations: [StatsComponent, TableauJoueursComponent, EquipesComponent, PresenceComponent],
    providers: [DataService, AuthHttp,AppGlobals,
        {
            provide: AuthHttp,
            useFactory: authHttpFactory,
            deps: [Http]
        }]
})
export class StatsModule {}
