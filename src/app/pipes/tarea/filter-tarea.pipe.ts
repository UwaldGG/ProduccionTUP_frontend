import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTarea',
  standalone: true
})

export class FiltroTareaPipe implements PipeTransform {

  transform(tareas: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return tareas;
    }
    searchTerm = searchTerm.toLowerCase();
    return tareas.filter(tarea =>
      tarea.Descripcion.toLowerCase().includes(searchTerm)
    );
  }

}

