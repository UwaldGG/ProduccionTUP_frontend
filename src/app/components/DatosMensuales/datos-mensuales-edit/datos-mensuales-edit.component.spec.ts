import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMensualesEditComponent } from './datos-mensuales-edit.component';

describe('DatosMensualesEditComponent', () => {
  let component: DatosMensualesEditComponent;
  let fixture: ComponentFixture<DatosMensualesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMensualesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosMensualesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
