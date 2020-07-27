import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  constructor(public router: Router, private dataService: DataService) { }

  ngOnInit() {
  }

}
