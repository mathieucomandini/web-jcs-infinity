import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { StatModule } from '../../shared';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule, Http, RequestOptions  } from '@angular/http';

// HTTP
import { AuthHttp, AuthConfig, provideAuth} from 'angular2-jwt';

import { DataService } from './../../_services/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        AdminRoutingModule,
        StatModule,
        FormsModule,
        HttpModule, 
        HttpClientModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        AdminComponent
    ],
    providers: [DataService, AuthHttp,AppGlobals,
        {
            provide: AuthHttp,
            useFactory: authHttpFactory,
            deps: [Http]
        }]
})
export class AdminModule {}
