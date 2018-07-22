import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PariRoutingModule } from './pari-routing.module';
import { PariComponent } from './pari.component';

import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        PariRoutingModule,
        StatModule,
        FormsModule
    ],
    declarations: [
        PariComponent
    ]
})
export class PariModule {}
