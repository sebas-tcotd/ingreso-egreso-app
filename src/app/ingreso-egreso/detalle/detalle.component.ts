import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IncomeExpenditureService } from 'src/app/services/income-expenditure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  itemsSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IncomeExpenditureService
  ) {}

  ngOnInit(): void {
    this.itemsSubscription = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        console.log(items);
        this.ingresosEgresos = items;
      });
  }
  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  deleteRecord(uid: string) {
    this.ingresoEgresoService
      .deleteRecord(uid)
      .then(() => {
        Swal.fire('Borrado', 'Ítem borrado', 'success');
      })
      .catch((err) => Swal.fire('Error', err, 'error'));
  }
}
