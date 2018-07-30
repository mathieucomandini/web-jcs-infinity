import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MespariRoutingModule } from './mespari-routing.module';
import { MespariComponent } from './mespari.component';

import { StatModule } from '../../shared';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule, Http, RequestOptions  } from '@angular/http';

// HTTP
import { AuthHttp, AuthConfig, provideAuth} from 'angular2-jwt';

import { DataService } from './../../_services/data.service';

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
        MespariRoutingModule,
        StatModule,
        FormsModule,
        HttpModule, 
        HttpClientModule
    ],
    declarations: [
        MespariComponent
    ],
    providers: [DataService, AuthHttp,AppGlobals,
        {
            provide: AuthHttp,
            useFactory: authHttpFactory,
            deps: [Http]
        }]
})
export class MespariModule {}
