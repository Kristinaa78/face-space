import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { RoomResolver } from './room.resolver';

describe('RoomResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => RoomResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
