import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MespariRoutingModule } from './mespari-routing.module';
import { MespariComponent } from './mespari.component';

import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        MespariRoutingModule,
        StatModule,
        FormsModule
    ],
    declarations: [
        MespariComponent
    ]
})
export class MespariModule {}
