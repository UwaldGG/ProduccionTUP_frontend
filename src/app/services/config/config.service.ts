import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  //soporte para habilitar y deshabilitar años
  anios: number[] = [2024, 2025];
  constructor() {}
}
