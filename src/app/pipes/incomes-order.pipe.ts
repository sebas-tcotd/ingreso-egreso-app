import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'incomesOrder',
})
export class IncomesOrderPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((a, b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
