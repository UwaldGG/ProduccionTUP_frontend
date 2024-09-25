import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMensualesCreateComponent } from './datos-mensuales-create.component';

describe('DatosMensualesCreateComponent', () => {
  let component: DatosMensualesCreateComponent;
  let fixture: ComponentFixture<DatosMensualesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMensualesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosMensualesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
