import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IncomeExpenditureService } from '../services/income-expenditure.service';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  incomeExpenditureForm!: FormGroup;
  amountType: string = 'ingreso';
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private incomeExpenditureService: IncomeExpenditureService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.incomeExpenditureForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.loading = ui.isLoading));
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  /**
   * Saves the record including the amount.
   */
  keepRecord(): void {
    if (this.incomeExpenditureForm.invalid) return;

    this.store.dispatch(isLoading());

    const { description, amount } = this.incomeExpenditureForm.value;
    const incomeExpenditure = new IngresoEgreso(
      description,
      amount,
      this.amountType
    );

    this.incomeExpenditureService
      .createIncomeAndExpenditure(incomeExpenditure)
      .then(() => {
        this.incomeExpenditureForm.reset();
        this.store.dispatch(stopLoading());

        Swal.fire('Registro creado', description, 'success');
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
