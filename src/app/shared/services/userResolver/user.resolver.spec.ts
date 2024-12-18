import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { UserResolver } from './user.resolver';

describe('userResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => UserResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
