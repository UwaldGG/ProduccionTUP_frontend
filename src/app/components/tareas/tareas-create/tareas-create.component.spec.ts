import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasCreateComponent } from './tareas-create.component';

describe('TareasCreateComponent', () => {
  let component: TareasCreateComponent;
  let fixture: ComponentFixture<TareasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});