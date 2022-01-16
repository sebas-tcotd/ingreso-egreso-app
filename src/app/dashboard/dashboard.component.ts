import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as incomesExpendituresActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IncomeExpenditureService } from '../services/income-expenditure.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  incomesExpendituresSubscription!: Subscription;
  constructor(
    private store: Store<AppState>,
    private incomeExpenditureService: IncomeExpenditureService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('user')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.incomesExpendituresSubscription = this.incomeExpenditureService
          .initIncomeExpenditureListener(user?.uid as string)
          .subscribe((ingresosEgresosFb) => {
            this.store.dispatch(
              incomesExpendituresActions.setItems({ items: ingresosEgresosFb })
            );
          });
      });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.incomesExpendituresSubscription.unsubscribe();
  }
}
