import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule, Http, RequestOptions  } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTP
import { AuthHttp, AuthConfig, provideAuth} from 'angular2-jwt';
/*Services*/
import { DataService } from './../_services/data.service';
/* PROVIDER */
import { AppGlobals } from './../app.globals';

export function authHttpFactory(http) {
    return new AuthHttp(new AuthConfig({
      headerPrefix: 'bearer',
      noJwtError: true,
      globalHeaders: [{'Accept': 'application/json'}],
      // tokenGetter: (() => StorageService.getToken()),
    }), http);
  }

@NgModule({
    imports: [CommonModule, LoginRoutingModule, FormsModule, HttpModule, HttpClientModule],
    declarations: [LoginComponent],
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
export class LoginModule {}
