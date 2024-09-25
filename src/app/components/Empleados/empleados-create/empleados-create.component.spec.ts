import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosCreateComponent } from './empleados-create.component';

describe('EmpleadosCreateComponent', () => {
  let component: EmpleadosCreateComponent;
  let fixture: ComponentFixture<EmpleadosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
