export class SharedEndPoints {
    public END_POINTS: { [key: string]: string };
  
    constructor(private apiUrl: string) {
      this.END_POINTS = {
        distritos: `${this.apiUrl}/api/v1/Distritos`,
        tareas: `${this.apiUrl}/api/v1/Tareas`,
        persona_responsable: `${this.apiUrl}/api/v1/PersonaResposnable`,
        datos_mensuales: `${this.apiUrl}/api/v1/DatosMensuales`,
        asignaciones: `${this.apiUrl}/api/v1/Asignaciones`,
        
        
        
  
        // Agrega aquí otros endpoints
      };
    }
  }
  
