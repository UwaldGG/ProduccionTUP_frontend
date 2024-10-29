import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthService } from '../../services/auth.service'; // El servicio que estás utilizando

describe('AuthGuard', () => {
  let adminGuard: AdminGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        adminGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    adminGuard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('debería permitir el acceso cuando el usuario está autenticado', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(adminGuard.canActivate()).toBeTrue();
  });

  it('debería redirigir al login cuando el usuario no está autenticado', () => {
    authService.isAuthenticated.and.returnValue(false);
    adminGuard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login-empleado']);
  });
});

