import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartesRoutingModule } from './cartes-routing.module';
import { CartesComponent } from './cartes.component';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule, Http, RequestOptions  } from '@angular/http';

// HTTP
import { AuthHttp, AuthConfig, provideAuth} from 'angular2-jwt';

import { DataService } from './../../../_services/data.service';

import { AppGlobals } from '../../../app.globals';

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
        CartesRoutingModule,  
        FormsModule,
        HttpModule, 
        HttpClientModule
    ],
    declarations: [
        CartesComponent
    ],
    providers: [DataService, AuthHttp,AppGlobals,
        {
            provide: AuthHttp,
            useFactory: authHttpFactory,
            deps: [Http]
        }]
})
export class CartesModule {}
