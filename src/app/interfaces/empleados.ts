export interface Empleado {
    ID_Persona_responsable: number;
    Nombre: string;
    Apellido: string;
    Distrito?: { NombreDistrito: string }; // Esto asumiendo que Distrito puede ser undefined
  }