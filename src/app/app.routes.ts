import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';

import { DistritosListComponent } from './components/distritos/distritos-list/distritos-list.component';
import { DistritosCreateComponent } from './components/distritos/distritos-create/distritos-create.component';
import { DistritosEditComponent } from './components/distritos/distritos-edit/distritos-edit.component';
import { EmpleadosCreateComponent } from './components/Empleados/empleados-create/empleados-create.component';
import { EmpleadosEditComponent } from './components/Empleados/empleados-edit/empleados-edit.component';
import { EmpleadosListComponent } from './components/Empleados/empleados-list/empleados-list.component';
import { TareasListComponent } from './components/tareas/tareas-list/tareas-list.component';
import { TareasCreateComponent } from './components/tareas/tareas-create/tareas-create.component';
import { TareasEditComponent } from './components/tareas/tareas-edit/tareas-edit.component';
import { IdentificarComponent } from './components/roles/empleado/identificar/identificar/identificar.component';
import { DataComponent } from './components/roles/empleado/data/data/data.component';
import { PanelComponent } from './components/roles/admin/panel/panel/panel.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/roles/admin/loginAdmin/login-admin/login-admin.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  //Inicio
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},

  //Login de empleados y tablas
  { path: 'login-empleado', component: IdentificarComponent },
  { path: 'data/:id', component: DataComponent },

  //Login de admin y panel
  { path: 'login-admin', component: LoginAdminComponent },
  { path: 'admin-panel', component: PanelComponent, canActivate: [AuthGuard] },

  //distritos
  { path: 'admin-panel/distritos/list', component: DistritosListComponent, canActivate:[AuthGuard] },
  { path: 'admin-panel/distritos/create', component: DistritosCreateComponent, canActivate:[AuthGuard] },
  { path: 'admin-panel/distritos/edit/:id', component: DistritosEditComponent, canActivate:[AuthGuard] },

  //empleados
  { path: 'admin-panel/empleados/list', component: EmpleadosListComponent, canActivate:[AuthGuard] },
  { path: 'admin-panel/empleados/create', component: EmpleadosCreateComponent, canActivate:[AuthGuard] },
  { path: 'admin-panel/empleados/edit/:id', component: EmpleadosEditComponent, canActivate:[AuthGuard] },

  //tareas
  { path: 'admin-panel/tareas/list', component: TareasListComponent, canActivate:[AuthGuard] },
  { path: 'admin-panel/tareas/create', component: TareasCreateComponent, canActivate:[AuthGuard] },
  { path: 'admin-panel/tareas/edit/:id', component: TareasEditComponent, canActivate:[AuthGuard] },

  //graficas


];

export { routes };

@NgModule({
  imports: [RouterModule.forRoot(routes), MaterialModule],
  exports: [RouterModule],
})

export class AppRoutingModule { }
