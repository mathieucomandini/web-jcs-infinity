import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { PageHeaderModule } from './../../shared';

import { HttpModule, Http, RequestOptions  } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

// HTTP
import { AuthHttp, AuthConfig, provideAuth} from 'angular2-jwt';
/*Services*/
import { DataService } from '../../_services/data.service';

/* PROVIDER */
import { AppGlobals } from '../../app.globals';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule }   from '@angular/forms';

export function authHttpFactory(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'bearer',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('token')),
  }), http);
}

@NgModule({
  imports: [
    CommonModule,
    ProfilRoutingModule,
    PageHeaderModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule  
  ],
  declarations: [
    ProfilComponent,
  ],
  providers: [
    DataService,
    AuthHttp,
    AppGlobals,
    {
        provide: AuthHttp,
        useFactory: authHttpFactory,
        deps: [Http]
    },
]
})
export class ProfilModule { }
