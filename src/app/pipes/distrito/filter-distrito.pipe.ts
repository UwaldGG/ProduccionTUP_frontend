import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDistrito',
  standalone: true
})
export class FilterDistritoPipe implements PipeTransform {
  transform(distritos: any[], searchText: string): any[] {
    if (!distritos) return [];
    if (!searchText) return distritos;
    
    searchText = searchText.toLowerCase();
    
    return distritos.filter(distrito => {
      return distrito.NombreDistrito.toLowerCase().includes(searchText);
    });
  }
}
