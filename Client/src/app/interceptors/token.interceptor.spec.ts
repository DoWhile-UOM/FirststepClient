import { TestBed } from '@angular/core/testing';

import { tokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      tokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: tokenInterceptor = TestBed.inject(tokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});