import { Component, OnInit } from '@angular/core';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { ChartData } from 'chart.js';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AppStateWithIncome } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  incomes: number = 0;
  expenditures: number = 0;

  totalIncomes: number = 0;
  totalExpenditures: number = 0;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };

  constructor(private store: Store<AppStateWithIncome>) {}

  ngOnInit(): void {
    this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => this.generateStats(items));
  }

  generateStats(items: IngresoEgreso[]) {
    this.totalIncomes = 0;
    this.totalExpenditures = 0;

    for (const item of items) {
      if (item.type === 'ingreso') {
        this.totalIncomes += item.amount;
        this.incomes++;
      } else {
        this.totalExpenditures += item.amount;
        this.expenditures++;
      }
    }

    this.doughnutChartData.datasets = [
      { data: [this.totalIncomes, this.totalExpenditures] },
    ];
  }
}
