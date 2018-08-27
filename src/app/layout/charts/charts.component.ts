import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgModel } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import 'datatables.net-bs4';
import * as moment from 'moment';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {

   
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012'
    ];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail-Order Sales'
    ];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';

    // Radar
    public radarChartLabels: string[] = [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ];
    public radarChartData: any = [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ];
    public radarChartType: string = 'radar';

    // Pie
    public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string = 'pie';

    // PolarArea
    public polarAreaChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales',
        'Telesales',
        'Corporate Sales'
    ];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean = true;

    public polarAreaChartType: string = 'polarArea';

    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        const clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    saison = localStorage.getItem('saison');
    listejoueur = [];
    tableaujoueurs = null;
    dataIsload = false;
    onPageJoueur = false;
    onPageTeam = false;
    
    currentPlayer = '';
    dataJoueur = [];
    gamesJoueur = [];
    totalFarm;

    constructor(public router: Router, private dataService: DataService) {}

    ngOnInit() {
        this.chargerTableau();
    }

    selectionChange($event){  
        localStorage.setItem('saison',this.saison);

        if(this.onPageJoueur || this.onPageTeam){
            this.onPageJoueur = false;
            this.onPageTeam = false;
            this.tableaujoueurs = null;
        }
        this.dataIsload = false;
        this.chargerTableau();
    }

    chargerTableau(){

        var current = this;

        this.dataService.listejoueurstats(this.saison).then(data => {
            this.listejoueur = data;

            if(this.tableaujoueurs == null){
            $(document).ready(function(){
                current.tableaujoueurs = $('#tablejoueurs').DataTable( {
                  data: current.listejoueur,
                  columns: [
                      { title: "Pseudo","data": "pseudo"},
                      { title: "KDA", "data": {kills : "kills", assists : "assists", deaths: "deaths"}},
                      { title: "DPM", "data": {damage: "damage", tempsdejeu: "tempsdejeu"}},
                      { title: "GPM", "data": {gold: "gold", tempsdejeu: "tempsdejeu"}},
                      { title: "VPM", "data": {vison: "vision", tempsdejeu: "tempsdejeu"}},
                      { title: "D/G", "data": {damge: "damage", gold: "gold"}},
                      { title: "Nombre de games", "data": "nbgame"},
                  ],
                  language: {
                    'url': './assets/dataTables_fr_FR.json',
                    'emptyTable' : "Pas de donnée"
                   },
                   order : [1, 'desc'],
                   columnDefs: [
                      {targets:1, render:function(data){
                          var kda = data.kills + data.assists;
                          if(data.deaths > 0){
                              kda = kda/data.deaths;
                          }
                          return kda.toFixed(2);
                      }},
                      {targets:2, render:function(data){
                        var dpm = data.damage/(data.tempsdejeu/60);                        
                        return dpm.toFixed(0);
                      }},
                      {targets:3, render:function(data){
                        var gpm = data.gold/(data.tempsdejeu/60);                        
                        return gpm.toFixed(0);
                      }},
                      {targets:4, render:function(data){
                        var vpm = data.vision/(data.tempsdejeu/60);                        
                        return vpm.toFixed(2);
                      }},
                      {targets:5, render:function(data){
                        var dg = data.damage/data.gold;                        
                        return dg.toFixed(2);
                      }} 
                   ],
                   processing : true,
              } );  

              $('#tablejoueurs tbody').on('click', 'tr', function () {
                var data = current.tableaujoueurs.row( this ).data();
                console.log(data);
                current.pageJoueur(data.pseudo,data);
            } );

            });
        }
        else
        {
            this.tableaujoueurs.clear();
            this.tableaujoueurs.rows.add(this.listejoueur);
            this.tableaujoueurs.draw();
        }

            this.dataIsload = true;
        });
    }

    pageJoueur(pseudo,data){
        this.currentPlayer = pseudo;
        this.dataJoueur = data;
        this.chargerGameJoueur(pseudo);
        this.onPageJoueur = true;
    }

    chargerGameJoueur(pseudo){
        var current = this;
        this.dataService.listematchjoueur(pseudo, this.saison).then(data => {     
            
            this.totalFarm = 0;
            this.gamesJoueur = [];

           data.forEach(item => {
               var mn = item.mat_duree/60;
               var kda = item.kills+item.assists;
               if(item.deaths > 0){
                   kda = kda/item.deaths;
                   kda = kda.toFixed(2);
               }
               var dpm = (item.degats/mn).toFixed(0);
               var gpm = (item.golds/mn).toFixed(0);
               var vpm = (item.visions/mn).toFixed(2);
               var fpm = (item.farm/mn).toFixed(2);
               var dg = (item.degats/item.golds).toFixed(2);

               var mnD = mn.toFixed(2);
               current.totalFarm += item.farm;

               var json = ({"item" : item, "kda" : kda, "mn" : mnD, "dpm" : dpm, "gpm" : gpm, "vpm" : vpm, "fpm" : fpm, "dg" : dg});

               current.gamesJoueur.push(json);
           });
        });
    }

    retourMain(){
        this.onPageJoueur = false;
        this.onPageTeam = false;
        this.tableaujoueurs = null;
        this.dataIsload = false;
        this.chargerTableau();
    }
}

