/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BettinghousesService } from './bettinghouses.service';

describe('Service: Bettinghouses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BettinghousesService]
    });
  });

  it('should ...', inject([BettinghousesService], (service: BettinghousesService) => {
    expect(service).toBeTruthy();
  }));
});
