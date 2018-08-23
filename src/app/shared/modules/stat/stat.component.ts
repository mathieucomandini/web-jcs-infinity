import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Input() path: string;
    @Input() target: string;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
