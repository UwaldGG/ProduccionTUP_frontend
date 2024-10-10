import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Asegúrate de exportar routes en app-routing.module.ts
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importa esto si lo necesitas



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Usa las rutas definidas
    //provideClientHydration(),
    provideHttpClient(), 
    provideAnimationsAsync('noop'), 
    provideAnimationsAsync(),
  ]
};