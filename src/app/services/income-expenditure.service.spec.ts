import { TestBed } from '@angular/core/testing';

import { IncomeExpenditureService } from './income-expenditure.service';

describe('IncomeExpenditureService', () => {
  let service: IncomeExpenditureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeExpenditureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
