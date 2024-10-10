import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmpleado',
  standalone: true
})
export class FilterEmpleadoPipe implements PipeTransform {
  transform(empleados: any[], searchText: string): any[] {
    if (!empleados) return [];
    if (!searchText) return empleados;

    searchText = searchText.toLowerCase(); // Convertir el texto de búsqueda a minúsculas

    // Filtrar empleados en base al nombre, apellido o distrito
    return empleados.filter(empleado => {
      return (
        empleado.Nombre.toLowerCase().includes(searchText) ||
        empleado.Apellido.toLowerCase().includes(searchText) ||
        (empleado.distrito?.NombreDistrito && empleado.distrito.NombreDistrito.toLowerCase().includes(searchText))
      );
    });
  }
}
