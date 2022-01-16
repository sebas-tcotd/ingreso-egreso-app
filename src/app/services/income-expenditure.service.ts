import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenditureService {
  constructor(private firestore: AngularFirestore, private auth: AuthService) {}

  createIncomeAndExpenditure(incomeExpenditure: IngresoEgreso) {
    const uid = this.auth.user?.uid;

    delete incomeExpenditure.uid;

    return this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...incomeExpenditure });
  }

  initIncomeExpenditureListener(uid: string) {
    return this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((docItem) => ({
            uid: docItem.payload.doc.id,
            ...(docItem.payload.doc.data() as IngresoEgreso),
          }))
        )
      );
  }

  deleteRecord(itemUid: string) {
    const userUid = this.auth.user?.uid;

    return this.firestore
      .doc(`${userUid}/ingresos-egresos/items/${itemUid}`)
      .delete();
  }
}
