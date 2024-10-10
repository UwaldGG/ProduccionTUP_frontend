import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service'; // El servicio que estás utilizando

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería permitir el acceso cuando el usuario está autenticado', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(authGuard.canActivate()).toBeTrue();
  });

  it('debería redirigir al login cuando el usuario no está autenticado', () => {
    authService.isAuthenticated.and.returnValue(false);
    authGuard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

